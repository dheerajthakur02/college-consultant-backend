import express from "express";
import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} from "../controllers/college.controller.js";

const router = express.Router();

router.post("/", createCollege); // Create
router.get("/", getAllColleges); // Get all
router.get("/:id", getCollegeById); // Get one
router.put("/:id", updateCollege); // Update
router.delete("/:id", deleteCollege); // Delete

export default router;
