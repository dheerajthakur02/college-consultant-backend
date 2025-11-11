import express from "express";
import {
  createStream,
  getAllStreams,
  getStreamById,
  updateStream,
  deleteStream,
} from "../controllers/stream.controller.js";

const router = express.Router();

router.post("/", createStream); // Create a stream
router.get("/", getAllStreams); // Get all streams
router.get("/:id", getStreamById); // Get one stream
router.put("/:id", updateStream); // Update a stream
router.delete("/:id", deleteStream); // Delete a stream

export default router;
