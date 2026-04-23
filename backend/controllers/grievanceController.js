const mongoose = require("mongoose");
const Grievance = require("../models/Grievance");

const validCategories = ["Academic", "Hostel", "Transport", "Other"];
const validStatuses = ["Pending", "Resolved"];

const isInvalidId = (id) => !mongoose.Types.ObjectId.isValid(id);

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const validateGrievanceInput = ({ title, description, category, status }, requireAll = true) => {
  if (requireAll && (!title || !description || !category)) {
    return "Title, description and category are required";
  }

  if (title !== undefined && title.trim().length < 3) {
    return "Title must be at least 3 characters";
  }

  if (description !== undefined && description.trim().length < 10) {
    return "Description must be at least 10 characters";
  }

  if (category !== undefined && !validCategories.includes(category)) {
    return "Invalid grievance category";
  }

  if (status !== undefined && !validStatuses.includes(status)) {
    return "Invalid grievance status";
  }

  return "";
};

const createGrievance = async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const category = req.body.category;
    const status = req.body.status || "Pending";

    const validationError = validateGrievanceInput({ title, description, category, status });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      status,
      studentId: req.student._id
    });

    res.status(201).json({
      message: "Grievance submitted successfully",
      grievance
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating grievance" });
  }
};

const getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ studentId: req.student._id }).sort({ createdAt: -1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching grievances" });
  }
};

const getGrievanceById = async (req, res) => {
  try {
    if (isInvalidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid grievance ID" });
    }

    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.studentId.toString() !== req.student._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(grievance);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching grievance" });
  }
};

const updateGrievance = async (req, res) => {
  try {
    if (isInvalidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid grievance ID" });
    }

    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.studentId.toString() !== req.student._id.toString()) {
      return res.status(403).json({ message: "Only the owner can update this grievance" });
    }

    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const category = req.body.category;
    const status = req.body.status;

    const validationError = validateGrievanceInput({ title, description, category, status }, false);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    grievance.title = title || grievance.title;
    grievance.description = description || grievance.description;
    grievance.category = category || grievance.category;
    grievance.status = status || grievance.status;

    const updatedGrievance = await grievance.save();

    res.status(200).json({
      message: "Grievance updated successfully",
      grievance: updatedGrievance
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating grievance" });
  }
};

const deleteGrievance = async (req, res) => {
  try {
    if (isInvalidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid grievance ID" });
    }

    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.studentId.toString() !== req.student._id.toString()) {
      return res.status(403).json({ message: "Only the owner can delete this grievance" });
    }

    await grievance.deleteOne();

    res.status(200).json({ message: "Grievance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting grievance" });
  }
};

const searchGrievances = async (req, res) => {
  try {
    const title = (req.query.title || "").trim();

    const grievances = await Grievance.find({
      studentId: req.student._id,
      title: { $regex: escapeRegex(title), $options: "i" }
    }).sort({ createdAt: -1 });

    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Server error while searching grievances" });
  }
};

module.exports = {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievances
};
