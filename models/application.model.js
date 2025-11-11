import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const applicationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `application-${uuidv4()}`,
      unique: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    collegeId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "reviewing", "accepted", "rejected"],
      default: "applied",
    },
    tenthMarksheet: {
      type: String,
    },
    twlefthMarksheet: {
      type: String,
    },
    aadharCard: {
      type: String,
    },
    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
