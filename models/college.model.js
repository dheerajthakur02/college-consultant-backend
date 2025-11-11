import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("College", CollegeSchema, "addcolleges");
