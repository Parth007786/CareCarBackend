const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB CONNECTION SUCESS : ${conn.connection.host}`.bgGreen.black);
  } catch (error) {
    console.log(`DB CONNECTION FAILED : ${error.message} `.bgRed.black);
  }
};

module.exports = connectDB;
