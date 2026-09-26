
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "User Backend API is running",
  });
});

// User Routes
app.use("/api/users", userRoutes);

module.exports = app;
