const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;