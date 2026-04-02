import { Router} from "express";
import { sendMessage,getChats,getMessages,deleteChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const ChatRouter = Router();

ChatRouter.post("/message",authUser,sendMessage)
ChatRouter.get("/chats",authUser,getChats)
ChatRouter.get("/:chatId/messages",authUser,getMessages)
ChatRouter.delete("/delete/:chatId",authUser,deleteChat)
export default ChatRouter;