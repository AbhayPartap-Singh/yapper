import { Router} from "express";
import { sendMessage } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const ChatRouter = Router();

ChatRouter.post("/message",authUser,sendMessage)

export default ChatRouter;