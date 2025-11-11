import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByStream,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", createCourse); // Create
router.get("/", getAllCourses); // Get all
router.get("/:id", getCourseById); // Get one
router.put("/:id", updateCourse); // Update
router.delete("/:id", deleteCourse); // Delete
router.get("/stream/:streamId", getCoursesByStream); // Get by Stream ID

export default router;
