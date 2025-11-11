import mongoose from "mongoose";

const failedEmailSchema = new mongoose.Schema(
  {
    to: String,
    subject: String,
    text: String,
    html: String,
    error: String,
    retryCount: { type: Number, default: 0 },
    lastTriedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "failed", "success"],
      default: "pending",
    },
    logId: { type: mongoose.Schema.Types.ObjectId, ref: "EmailLog" },
  },
  { timestamps: true }
);

export default mongoose.model("FailedEmail", failedEmailSchema);
