const express = require("express");
const {
  getComplaints,
  raiseComplaint,
  getComplaint,
  closeComplaint
} = require("../controllers/carController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/", protect, getComplaints);
// router.post("/", protect, raiseComplaint);
// router.get("/:id", protect, getComplaint);
// router.put("/:id", protect, closeComplaint);

router.route("/").get(protect, getComplaints).post(protect, raiseComplaint);
router.route("/:id").get(protect, getComplaint).put(protect, closeComplaint);

router.use("/:cid/note", require("./noteRoutes"));

module.exports = router;
