const Admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentSchema");
const Assignment = require("../models/assignmentSchema");

const JWT_SECRET = "mySecretKey";
// Register Admin (Manually)
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ error: "Admin already exists" });

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

const dashboard = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("assignments")
      .select("-__v");
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerAdmin, adminLogin, dashboard };
