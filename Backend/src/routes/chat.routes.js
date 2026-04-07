import { Router } from "express";
import { sendMessage, getChats, getMessages, deleteChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/message", authUser, sendMessage);
router.get("/", authUser, getChats);
router.get("/:chatId/messages", authUser, getMessages);
router.delete("/delete/:chatId", authUser, deleteChat);

export default router;