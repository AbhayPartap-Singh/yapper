import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { sendEmail } from "../services/email.js";

// ------------------------------
// REGISTER
// ------------------------------
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

   

    const user = await userModel.create({
      username,
      email,
      password: Password,
      isVerified: false
    });

    const verifyToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const verifyLink = `http://localhost:3000/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email - Yapper 🚀",
      text: `Verify your email: ${verifyLink}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Hi ${username} 👋</h2>
          <p>Welcome to <b>Yapper</b>!</p>
          <p>Please verify your email:</p>
          <a href="${verifyLink}" 
             style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;">
            Verify Email
          </a>
        </div>
      `
    });

    res.status(201).json({
      message: "User registered. Please verify your email."
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------
// VERIFY EMAIL
// ------------------------------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false
      });
    }

    user.isVerified = true;
    await user.save();

    res.send("✅ Email verified successfully!");
  } catch (error) {
    res.status(400).send("❌ Invalid or expired token");
  }
};

// ------------------------------
// LOGIN USER (🔥 FIXED)
// ------------------------------
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email before logging in"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ FIXED COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------
// GET ME
// ------------------------------
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};