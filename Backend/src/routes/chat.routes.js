import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const ChatRouter = Router();

// ✅ CORRECT ROUTES
ChatRouter.post("/message", authUser, sendMessage);
ChatRouter.get("/", authUser, getChats);                // 🔥 FIXED
ChatRouter.get("/:chatId", authUser, getMessages);      // 🔥 FIXED
ChatRouter.delete("/delete/:chatId", authUser, deleteChat);

export default ChatRouter;