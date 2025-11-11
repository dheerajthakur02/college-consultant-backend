import College from "../models/college.model.js";

// 🟢 Create a new college
export const createCollege = async (req, res) => {
  try {
    const {
      name,
      shortName,
      establishedYear,
      stateId,
      districtId,
      approvedThrough,
      address,
      authorisedPersonName,
      authorisedPersonEmail,
      authorisedPersonMobile,
    } = req.body;

    if (!name || !stateId || !districtId) {
      return res
        .status(400)
        .json({ message: "Name, stateId, and districtId are required" });
    }

    const existingCollege = await College.findOne({
      name,
      stateId,
      districtId,
    });
    if (existingCollege) {
      return res
        .status(400)
        .json({ message: "College already exists in this district/state" });
    }

    const newCollege = new College({
      name,
      shortName,
      establishedYear,
      stateId,
      districtId,
      approvedThrough,
      address,
      authorisedPersonName,
      authorisedPersonEmail,
      authorisedPersonMobile,
    });

    await newCollege.save();

    res.status(201).json({
      message: "College created successfully",
      college: newCollege,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating college", error: error.message });
  }
};

// 🟡 Get all colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json({
      message: "All colleges fetched successfully",
      success: true,
      data: colleges,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching colleges", error: error.message });
  }
};

// 🔵 Get a single college by id
export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findOne({ id });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json(college);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching college", error: error.message });
  }
};

// 🟠 Update a college
export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCollege = await College.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({
      message: "College updated successfully",
      college: updatedCollege,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating college", error: error.message });
  }
};

// 🔴 Delete a college
export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCollege = await College.findOneAndDelete({ id });
    if (!deletedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ message: "College deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting college", error: error.message });
  }
};
