const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Car = require("../models/carModel");
const Note = require("../models/noteModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  const car = await Car.findById(req.params.cid);

  if (!user || !car) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  const allNotes = await Note.find({ car: req.params.cid });

  if (!allNotes) {
    res.status(404);
    throw new Error("Notes Not Found!");
  }

  res.status(200).json(allNotes);
});

const addNote = expressAsyncHandler(async (req, res) => {
  const { note } = req.body;

  if (!note) {
    res.status(400);
    throw new Error("Please Fill All Details!");
  }

  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  const car = await Car.findById(req.params.cid);

  if (!user || !car) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  //   Create Note

  const newNote = await Note.create({
    user: req.user._id,
    car: req.params.cid,
    note: note
  });

  if (!note) {
    res.status(400);
    throw new Error("Note Not Raised");
  }

  res.status(201).json(newNote);
});

module.exports = { getNotes, addNote };
