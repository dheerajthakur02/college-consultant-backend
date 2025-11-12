import Application from "../models/application.model.js";
import { sendOnlyEmail } from "../utils/emailService.js";
import College from "../models/college.model.js";
import User from "../models/user.model.js";

export const createApplication = async (req, res) => {
  try {
    const {
      studentId,
      collegeId,
      courseId,
      tenthMarksheet,
      twlefthMarksheet,
      aadharCard,
      remarks,
    } = req.body;

    if (!studentId || !collegeId || !courseId) {
      return res
        .status(400)
        .json({ message: "studentId, collegeId, and courseId are required" });
    }
    const newApplication = new Application({
      studentId,
      collegeId,
      courseId,
      tenthMarksheet,
      twlefthMarksheet,
      aadharCard,
      remarks,
    });

    await newApplication.save();
    const college = await College.findOne({ id: collegeId });
    const student = await User.findOne({ id: studentId });

    try {
      await sendOnlyEmail({
        email: college.authorisedPersonEmail,
        emailSubject: "Student information applied for the admission",
        text: `Student Name :${student.name} with StudentId: ${student.id}, have apllied in your college: ${college.name}  in Course name: MBBS`,
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
