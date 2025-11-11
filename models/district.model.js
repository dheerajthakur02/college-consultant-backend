import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const DistrictSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `district-${uuidv4()}`,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    stateId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("District", DistrictSchema);
