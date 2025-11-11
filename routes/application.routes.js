import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", createApplication); // Create new application
router.get("/", getAllApplications); // Get all applications
router.get("/:id", getApplicationById); // Get one application
router.put("/:id", updateApplication); // Update application
router.delete("/:id", deleteApplication); // Delete application

export default router;
