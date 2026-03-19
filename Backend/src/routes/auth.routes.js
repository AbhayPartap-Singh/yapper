import express from "express";
import { registerUser, verifyEmail,loginUser,getMe } from "../controllers/auth.controller.js";
import {authUser} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/login",loginUser)
router.get("/get-me",authUser,getMe)


export default router;