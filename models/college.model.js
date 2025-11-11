import mongoose from "mongoose";
import { type } from "os";
import { v4 as uuidv4 } from "uuid";

const CollegeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `college-${uuidv4()}`,
      unique: true,
    },
    name: { type: String, required: true },
    shortName: { type: String },
    establishedYear: { type: String },
    stateId: {
      type: String,
      required: true,
    },
    districtId: {
      type: String,
      required: true,
    },
    approvedThrough: { type: String },
    address: {
      line1: { type: String },
      line2: { type: String },
      pincode: { type: String },
    },
    authorisedPersonName: {
      type: String,
      required: true,
    },
     authorisedPersonEmail: {
      type: String,
      required: true,
    },
     authorisedPersonMobile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("College", CollegeSchema);
