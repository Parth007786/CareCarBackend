const { mongoose } = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    car: {
      type: String,
      enum: [
        "punch",
        "nexon",
        "tiago",
        "cruvv",
        "safari",
        "scorpio",
        "harrier"
      ],
      required: true
    },
    registration: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["open", "closed", "pending"],
      default: "open",
      required: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Car", carSchema);
