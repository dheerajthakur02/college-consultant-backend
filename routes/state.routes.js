import express from "express";
import {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
} from "../controllers/state.controller.js";

const router = express.Router();

router.post("/", createState); // Create
router.get("/", getAllStates); // Read all
router.get("/:id", getStateById); // Read one
router.put("/:id", updateState); // Update
router.delete("/:id", deleteState); // Delete

export default router;
