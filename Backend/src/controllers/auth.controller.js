import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { sendEmail } from "../services/email.js";

// ---------------- REGISTER ----------------
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

  const user = await userModel.create({
  username,
  email,
  password, // ✅ plain password (schema will hash it)
  isVerified: false
  });

    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const verifyLink = `http://localhost:3000/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email - Yapper 🚀",
      html: `<h3>Hi ${username}, verify your email <a href="${verifyLink}">here</a></h3>`
    });

    res.status(201).json({ message: "User registered. Please verify your email." });
  } catch (err) {
    console.error("REGISTER ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- VERIFY EMAIL ----------------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(400).send("Invalid token");

    user.isVerified = true;
    await user.save();

    // Redirect to homepage after verification
    return res.redirect("http://localhost:5173"); // ✅ your frontend homepage
  } catch (err) {
    console.error("VERIFY EMAIL ERROR 👉", err);
    return res.status(400).send("❌ Invalid or expired token");
  }
};

// ---------------- GET ME ----------------
export const getMe = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    res.status(200).json({
      user: req.user
    });
  } catch (err) {
    console.error("GET ME ERROR 👉", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};