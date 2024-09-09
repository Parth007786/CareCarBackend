const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO CARECar 4.0"
  });
});

// User Routes
app.use("/api/user", require("./routes/userRoutes"));

// Service Routes
app.use("/api/service", require("./routes/carRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black);
});
