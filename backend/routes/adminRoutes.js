const express = require("express");
const adminProtect = require("../middleware/adminMiddleware");
const {
  getUsers,
  getCars,
  getNotes,
  updateCar
} = require("../controllers/adminController");
const router = express.Router();

router.get("/users", adminProtect, getUsers);
router.get("/cars", adminProtect, getCars);
router.get("/notes", adminProtect, getNotes);
router.put("/cars/:id", adminProtect, updateCar);

module.exports = router;
