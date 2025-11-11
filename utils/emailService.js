import nodemailer from "nodemailer";
import EmailLog from "../models/emailLog.js";
import FailedEmail from "../models/failedEmail.js";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  family: 4,
  pool: false,
});

transporter.verify((err) => {
  if (err) {
    console.error(" SMTP Connection Failed:", err.message);
    console.error("   Please check your email configuration in .env file");
    console.error(
      `   Host: ${process.env.SMTP_HOST}, Port: ${process.env.SMTP_PORT}`
    );
    console.error(`   User: ${process.env.SMTP_USER}`);
    console.error(`   Secure: ${process.env.SMTP_SECURE}`);
    if (process.env.SMTP_PORT === "465" && process.env.SMTP_SECURE !== "true") {
      console.error("     WARNING: Port 465 requires SMTP_SECURE=true");
    }
  } else {
    console.log(" Email service ready");
  }
});

async function renderTemplate(templateName, data) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, "..", "views", templateName);
  return await ejs.renderFile(templatePath, data);
}

async function sendMail(to, subject, text, html, shouldLog = true) {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    text: text || (html ? html.replace(/<[^>]*>/g, "") : ""),
    html,
  };

  let emailLog = null;
  if (shouldLog) {
    emailLog = await EmailLog.create({ to, subject, status: "pending" }).catch(
      () => null
    );
  }

  try {
    console.log(`Sending email to ${to}...`);
    console.log(
      ` Email config - Host: ${process.env.SMTP_HOST}, Port: ${process.env.SMTP_PORT}, User: ${process.env.SMTP_USER}`
    );

    const result = await transporter.sendMail(mailOptions);

    console.log(` Email sent successfully to ${to}`);

    if (shouldLog && emailLog) {
      await EmailLog.findByIdAndUpdate(emailLog._id, {
        status: "sent",
        messageId: result?.messageId || null,
        sentAt: new Date(),
      });
    }
    return { success: true, result };
  } catch (error) {
    console.error(` Email failed to ${to}:`, error.message);

    if (shouldLog && emailLog) {
      await EmailLog.findByIdAndUpdate(emailLog._id, {
        status: "failed",
        error: error.message,
      });
      await FailedEmail.create({
        to,
        subject,
        text,
        html,
        error: error.message,
        logId: emailLog._id,
        status: "pending",
        retryCount: 0,
      }).catch(() => null);
    }
    throw error;
  }
}

export async function sendOnlyEmail({
  email,
  emailTemplate,
  emailData,
  emailSubject,
  shouldLog = true,
}) {
  const result = { success: false, error: null };

  if (email && emailTemplate) {
    try {
      // Render HTML template (tumhara existing template renderer)
      const html = await renderTemplate(emailTemplate, emailData);

      // Send email using your already configured sendMail()
      await sendMail(email, emailSubject, null, html, shouldLog);

      result.success = true;
      if (shouldLog) console.log(`✅ Email sent successfully to ${email}`);
    } catch (err) {
      console.error("❌ Email sending error:", err.message);
      result.error = err.message;
    }
  } else {
    console.log("⚠️ Email skipped - no address or template provided");
  }

  return result;
}
