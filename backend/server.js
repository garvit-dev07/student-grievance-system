const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Grievance Management System API is running"
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Student Grievance Management System API is running",
    endpoints: {
      register: "POST /api/register",
      login: "POST /api/login",
      grievances: "GET/POST /api/grievances",
      search: "GET /api/grievances/search?title=your_title"
    }
  });
});

app.use("/api", authRoutes);
app.use("/api/grievances", grievanceRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
