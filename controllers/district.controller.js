import District from "../models/district.model.js";
import State from "../models/state.model.js";

export const createDistrict = async (req, res) => {
  try {
    const { name, stateId } = req.body;

    if (!name || !stateId) {
      return res.status(400).json({ message: "Name and stateId are required" });
    }

    // Optional: verify if the stateId exists
    // const state = await State.findOne({ id: stateId });
    // if (!state) {
    //   return res.status(404).json({ message: "Invalid stateId" });
    // }

    const existingDistrict = await District.findOne({ name, stateId });
    if (existingDistrict) {
      return res
        .status(400)
        .json({ message: "District already exists for this state" });
    }

    const newDistrict = new District({ name, stateId });
    await newDistrict.save();

    res.status(201).json({
      message: "District created successfully",
      district: newDistrict,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating district", error: error.message });
  }
};

// 🟡 Get all districts
export const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching districts", error: error.message });
  }
};

// 🔵 Get a single district by ID
export const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findOne({ id });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(district);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching district", error: error.message });
  }
};

// 🟠 Update a district
export const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stateId } = req.body;

    const updatedDistrict = await District.findOneAndUpdate(
      { id },
      { name, stateId },
      { new: true }
    );

    if (!updatedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json({
      message: "District updated successfully",
      district: updatedDistrict,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating district", error: error.message });
  }
};

// 🔴 Delete a district
export const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDistrict = await District.findOneAndDelete({ id });
    if (!deletedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json({ message: "District deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting district", error: error.message });
  }
};
