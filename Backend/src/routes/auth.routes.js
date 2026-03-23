import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  getMe
} from "../controllers/auth.controller.js";

const router = express.Router();

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ THIS WAS MISSING / IMPORTANT
router.get("/verify-email", verifyEmail);

// USER
router.get("/me", getMe);

export default router;