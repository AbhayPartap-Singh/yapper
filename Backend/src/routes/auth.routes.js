import express from "express";
import { registerUser, loginUser, verifyEmail, getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);

// Protected route
router.get("/me", authUser, getMe);

export default router;