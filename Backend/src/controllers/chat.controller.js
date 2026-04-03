import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { generateResponse, generateTitle } from "../services/ai.service.js";

// ✅ Send Message
export async function sendMessage(req, res) {
  try {
    const { message, chatId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let chat;

    // 🆕 Create new chat
    if (!chatId) {
      const title = await generateTitle(message);

      chat = await Chat.create({
        user: req.user.id,
        title,
      });
    } else {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.user.id,
      });

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
    }

    // ✅ Save user message
    const userMsg = await Message.create({
      chat: chat._id,
      content: message,
      role: "user",
    });

    // 🔥 Get previous messages EXCLUDING latest user msg
    const previousMessages = await Message.find({
      chat: chat._id,
      _id: { $ne: userMsg._id },
    }).sort({ createdAt: 1 });

    // 🔥 Limit memory (important for performance)
    const limitedHistory = previousMessages.slice(-10);

    // ✅ Generate AI response
    const aiText = await generateResponse(message, limitedHistory);

    console.log("AI TEXT:", aiText); // 🔍 debug

    if (!aiText) {
      return res.status(500).json({ message: "AI response failed" });
    }

    // ✅ Save AI message
    const aiMessage = await Message.create({
      chat: chat._id,
      content: aiText,
      role: "ai",
    });

    // ✅ Clean response format
    res.status(200).json({
      chatId: chat._id,
      aiMessage: {
        role: "ai",
        content: aiText,
      },
    });

  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get all chats
export async function getChats(req, res) {
  try {
    const chats = await Chat.find({ user: req.user.id });

    res.status(200).json({
      message: "Chats retrieved successfully",
      chats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get messages
export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await Message.find({ chat: chatId });

    res.status(200).json({
      message: "Messages retrieved successfully",
      messages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Delete chat
export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await Message.deleteMany({ chat: chatId });

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}