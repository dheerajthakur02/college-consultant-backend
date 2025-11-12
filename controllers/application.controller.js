import Application from "../models/application.model.js";
import { sendOnlyEmail } from "../utils/emailService.js";
import College from "../models/college.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import { application } from "express";

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export const createApplication = async (req, res) => {
  try {
    const { studentId, collegeId, courseId, remarks } = req.body;

    if (!studentId || !collegeId || !courseId) {
      return res
        .status(400)
        .json({ message: "studentId, collegeId, and courseId are required" });
    }
    const getFileName = (fileURLToPath) => {
      const arr = fileURLToPath.split("/");
      return arr[arr.length - 1];
    };
    const tenthMarksheet = req?.tenthMarksheet[0] || "";
    const tenthMarksheetFileName = getFileName(tenthMarksheet);
    console.log("10 m", tenthMarksheet);
    const tenthPassingCertificate = req?.tenthPassingCertificate[0] || "";
    const tenthPassingFileName = getFileName(tenthPassingCertificate);
    console.log("10 p", tenthPassingCertificate);

    const twlefthMarksheet = req?.twlefthMarksheet[0] || "";
    const twlefthMarksheetFileName = getFileName(twlefthMarksheet);
    console.log("12 m", twlefthMarksheet);
    const twlefthPassingCertificate = req?.twlefthPassingCertificate[0] || "";
    const twlefthPassingCertificateFileName = getFileName(
      twlefthPassingCertificate
    );
    console.log("12 p", twlefthPassingCertificate);

    const passportSizePhoto = req?.passportSizePhoto[0] || "";
    console.log("passport", passportSizePhoto);
    const passportSizePhotoFileName = getFileName(passportSizePhoto);

    const aadharCard = req?.aadharCard[0] || "";
    const aadharCardFileName = getFileName(aadharCard);
    console.log("adharcard", aadharCard);

    const newApplication = new Application({
      studentId,
      collegeId,
      courseId,
      tenthMarksheet,
      tenthPassingCertificate,
      twlefthMarksheet,
      twlefthPassingCertificate,
      passportSizePhoto,
      aadharCard,
      remarks,
    });

    await newApplication.save();
    const college = await College.findOne({ id: collegeId });
    const student = await User.findOne({ id: studentId });
    const course = await Course.findOne({ id: courseId });
    try {
      await sendOnlyEmail({
        email: college.authorisedPersonEmail,
        emailSubject: "Student information applied for the admission",
        emailTemplate: "applied.ejs",
        emailData: {
          applicationId: newApplication.applicationId,
          studentName: student.name,
          courseName: course.name,
          collegeName: college.name,
          dob: formatDate(student.dob),
          email: student.email,
          mobile: student.mobile,
          gender: student.gender,
          fatherName: student.fatherName,
          motherName: student.motherName,
          address: student.address,
          city: student.city,
          state: student.state,
          pincode: student.pincode,
          twelfthPercentage: student.twelfthPercentage,
          tenthPercentage: student.tenthPercentage,
        },
        attachments: [
          {
            filename: tenthMarksheetFileName,
            path: tenthMarksheet,
          },
          {
            filename: tenthPassingFileName,
            path: tenthPassingCertificate,
          },
          {
            filename: tenthMarksheetFileName,
            path: tenthMarksheet,
          },
          {
            filename: twlefthMarksheetFileName,
            path: twlefthMarksheet,
          },
          {
            filename: twlefthPassingCertificateFileName,
            path: twlefthPassingCertificate,
          },
        ],
      });
    } catch (notificationError) {
      console.error("send detais to college failed:", notificationError);
    }

    res.status(201).json({
      message: "Application created successfully",
      application: newApplication,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating application", error: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    return res.status(200).json({
      message: "Application data fetched",
      success: true,
      applications,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findOne({ id });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching application", error: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedApplication = await Application.findOneAndUpdate(
      { id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating application", error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Application.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting application", error: error.message });
  }
};
