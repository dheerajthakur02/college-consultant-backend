import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { name, streamId } = req.body;

    if (!name || !streamId) {
      return res
        .status(400)
        .json({ message: "name and streamId are required" });
    }

    const existingCourse = await Course.findOne({ name, streamId });
    if (existingCourse) {
      return res
        .status(400)
        .json({ message: "Course already exists for this stream" });
    }

    const newCourse = new Course({ name, streamId });
    await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      message: "All courses fetched successfully",
      success: true,
      data: courses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, streamId } = req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      { id },
      { name, streamId },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findOneAndDelete({ id });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting course", error: error.message });
  }
};

export const getCoursesByStream = async (req, res) => {
  try {
    const { streamId } = req.params;
    const courses = await Course.find({ streamId });

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this stream" });
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching courses by stream",
      error: error.message,
    });
  }
};
