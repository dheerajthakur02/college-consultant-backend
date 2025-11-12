import Stream from "../models/stream.model.js";

export const createStream = async (req, res) => {
  try {
    const { name, about } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Stream name is required" });
    }

    const existingStream = await Stream.findOne({ name });
    if (existingStream) {
      return res.status(400).json({ message: "Stream already exists" });
    }

    const newStream = new Stream({ name, about });
    await newStream.save();

    res.status(201).json({
      message: "Stream created successfully",
      stream: newStream,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating stream", error: error.message });
  }
};

export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.status(200).json({
      message: "All streams fetched successfully",
      success: true,
      data: streams,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching streams", error: error.message });
  }
};

export const getStreamById = async (req, res) => {
  try {
    const { id } = req.params;
    const stream = await Stream.findOne({ id });

    if (!stream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    res.status(200).json(stream);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching stream", error: error.message });
  }
};

export const updateStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, about } = req.body;

    const updatedStream = await Stream.findOneAndUpdate(
      { id },
      { name, about },
      { new: true }
    );

    if (!updatedStream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    res.status(200).json({
      message: "Stream updated successfully",
      stream: updatedStream,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating stream", error: error.message });
  }
};

export const deleteStream = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStream = await Stream.findOneAndDelete({ id });

    if (!deletedStream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    res.status(200).json({ message: "Stream deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting stream", error: error.message });
  }
};
