import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.js";
import dynamicUpload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/",
  dynamicUpload({
    directory: "application",
    fields: [
      { name: "tenthMarksheet", maxCount: 1 },
      { name: "tenthPassingCertificate", maxCount: 1 },
      { name: "twlefthMarksheet", maxCount: 1 },
      { name: "twlefthPassingCertificate", maxCount: 1 },
      { name: "passportSizePhoto", maxCount: 1 },
      { name: "aadharCard", maxCount: 1 },
    ],
  }),
  createApplication
); // Create new application
router.get("/", getAllApplications); // Get all applications
router.get("/:id", getApplicationById); // Get one application
router.put("/:id", updateApplication); // Update application
router.delete("/:id", deleteApplication); // Delete application

export default router;
