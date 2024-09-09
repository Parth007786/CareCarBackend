const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Car = require("../models/carModel");

const getComplaints = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  const complaints = await Car.find({ user: user._id.toString() });

  if (!complaints) {
    res.status(404);
    throw new Error("Complaints Not Found!");
  }

  res.status(200).json(complaints);
});

const getComplaint = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  const complaint = await Car.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint Not Found!");
  }

  res.status(200).json(complaint);
});

const raiseComplaint = expressAsyncHandler(async (req, res) => {
  // All Fields
  const { car, description, registration } = req.body;

  if (!car || !description || !registration) {
    res.status(400);
    throw new Error("Please Fill All Details!");
  }

  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  //   Create Complaint

  const complaint = await Car.create({
    user: user._id,
    car: car,
    registration: registration,
    description: description,
    status: "open"
  });

  if (!complaint) {
    res.status(400);
    throw new Error("Complaint Not Raised");
  }

  res.status(201).json(complaint);
});

const closeComplaint = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  const updatedComplaint = await Car.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedComplaint) {
    res.status(400);
    throw new Error("Complaint Not Updated");
  }

  res.status(201).json(updatedComplaint);
});

module.exports = {
  getComplaints,
  getComplaint,
  raiseComplaint,
  closeComplaint
};
