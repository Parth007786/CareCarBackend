const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;

  // make sure all fields are coming
  if (!name || !email || !password || !gender) {
    res.status(400);
    throw new Error("Please Fill all the Details");
  }

  //Check if User already Exist
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //Hash Password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender
  });
  if (!user) {
    res.status(401);
    throw new Error("User not Registered");
  }
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    token: generateToken(user._id)
  });
});

//Login User
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //make sure all fields are coming
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill ALL the Details");
  }

  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//Private COntroller
const privateController = expressAsyncHandler(async (req, res) => {
  res.json({
    msg: "I AM PRO ROUTE"
  });
});
//generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};
module.exports = { registerUser, loginUser, privateController };
