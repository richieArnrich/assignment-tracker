const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentAuth = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Parse cookies
mongoose
  .connect("mongodb://localhost:27017/assignment-tracker")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Assignment Tracker API");
});

app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);
app.use("/authstudents", studentAuth);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
