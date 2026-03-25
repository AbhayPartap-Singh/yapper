import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  getMe
} from "../controllers/auth.controller.js";

import { authUser } from "../middlewares/auth.middleware.js"; // ✅ ADD THIS

const router = express.Router();

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);

// USER (🔴 FIXED: added middleware)
router.get("/get-me", authUser, getMe);

export default router;