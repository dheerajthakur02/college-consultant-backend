import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const StreamSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `stream-${uuidv4()}`,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stream", StreamSchema);
