import express from "express";
import {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} from "../controllers/district.controller.js";

const router = express.Router();

router.post("/", createDistrict); // Create district
router.get("/", getAllDistricts); // Get all districts
router.get("/:id", getDistrictById); // Get district by ID
router.put("/:id", updateDistrict); // Update district
router.delete("/:id", deleteDistrict); // Delete district

export default router;
