const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminProtect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = "";

    if (
      req.headers.authorization ||
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(400);
        throw new Error("Invalid User");
      }

      if (user.isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(400);
        throw new Error("You Are Not Admin");
      }
    } else {
      res.status(400);
      throw new Error("Invalid Token");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Token : UnAuthoirsed Access");
  }
});

module.exports = adminProtect;
