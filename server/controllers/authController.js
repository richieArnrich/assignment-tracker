const Student = require("../models/studentSchema");
const Otp = require("../models/otpSchema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "14989acc890d0c",
    pass: "6151e3fcd9feac",
  },
  tls: {
    rejectUnauthorized: false, // should be set to true in production
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Authentication Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails ✅");
  }
});

// 📌 Generate and Send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ error: "Student not found" });

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5-minute expiry

    // Save OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP via Email
    await transporter.sendMail({
      from: "no-reply@assignment-tracker.com",
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Verify OTP and Login
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find OTP
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    // Check if OTP expired
    if (otpRecord.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    // Delete OTP after verification
    await Otp.deleteOne({ email });

    // Generate JWT Token
    const token = jwt.sign({ email }, "secret_key", { expiresIn: "1h" });

    // Send Token as HTTP-only Cookie
    res.cookie("studentToken", token, {
      httpOnly: true,
      secure: true, // Enable in production (HTTPS)
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { sendOtp, verifyOtp };
