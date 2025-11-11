import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const StateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `state-${uuidv4()}`,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("State", StateSchema);
