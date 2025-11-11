import express from "express";
import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
  getCollegesByLocation,
} from "../controllers/college.controller.js";

const router = express.Router();

router.post("/", createCollege); // Create
router.get("/", getAllColleges); // Get all
router.get("/filter", getCollegesByLocation); // Get by state or district
router.get("/:id", getCollegeById); // Get single
router.put("/:id", updateCollege); // Update
router.delete("/:id", deleteCollege); // Delete

export default router;
