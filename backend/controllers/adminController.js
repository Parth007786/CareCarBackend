const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Car = require("../models/carModel");
const Note = require("../models/noteModel");

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(404);
    throw new Error("Users Not Found ");
  }

  res.status(200).json(users);
});

const getCars = expressAsyncHandler(async (req, res) => {
  const cars = await Car.find();

  if (!cars) {
    res.status(404);
    throw new Error("Cars Not Found ");
  }

  res.status(200).json(cars);
});

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find();

  if (!notes) {
    res.status(404);
    throw new Error("Cars Not Found ");
  }

  res.status(200).json(notes);
});

const updateCar = expressAsyncHandler(async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!updatedCar) {
    res.status(400);
    throw new Error("Car Not Updated ");
  }

  res.status(200).json(updatedCar);
});

module.exports = { getUsers, getCars, getNotes, updateCar };
