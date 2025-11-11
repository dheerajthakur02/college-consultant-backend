import State from "../models/state.model.js";

export const createState = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "State name is required" });
    }

    const existing = await State.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "State already exists" });
    }

    const newState = new State({ name });
    await newState.save();

    res.status(201).json({
      message: "State created successfully",
      state: newState,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating state", error: error.message });
  }
};

export const getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching states", error: error.message });
  }
};

export const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findOne({ id });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json(state);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching state", error: error.message });
  }
};

export const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedState = await State.findOneAndUpdate(
      { id },
      { name },
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({ message: "State not found" });
    }

    res.status(200).json({
      message: "State updated successfully",
      state: updatedState,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating state", error: error.message });
  }
};

export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await State.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "State not found" });
    }

    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting state", error: error.message });
  }
};
