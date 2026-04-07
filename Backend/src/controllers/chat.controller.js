import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { generateResponse, generateTitle } from "../services/ai.service.js";

// ✅ Send Message
export async function sendMessage(req, res) {
  try {
    const { message, chatId } = req.body;
    if (!message) return res.status(400).json({ message: "Message required" });
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    let chat;

    if (!chatId) {
      const title = await generateTitle(message);
      chat = await Chat.create({ user: req.user.id, title });
    } else {
      chat = await Chat.findOne({ _id: chatId, user: req.user.id });
      if (!chat) return res.status(404).json({ message: "Chat not found" });
    }

    // Save user message
    const userMsg = await Message.create({ chat: chat._id, content: message, role: "user" });

    // Previous messages for AI context
    const prevMessages = await Message.find({ chat: chat._id, _id: { $ne: userMsg._id } }).sort({ createdAt: 1 }).limit(10);

    const aiText = await generateResponse(message, prevMessages);
    if (!aiText) return res.status(500).json({ message: "AI response failed" });

    const aiMsg = await Message.create({ chat: chat._id, content: aiText, role: "ai" });

    res.status(200).json({
      chatId: chat._id,
      aiMessage: { role: "ai", content: aiText },
    });
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get all chats
export async function getChats(req, res) {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({ updatedAt: -1 });
    // Include snippet
    const chatsWithSnippet = await Promise.all(
      chats.map(async (chat) => {
        const lastMsg = await Message.findOne({ chat: chat._id }).sort({ createdAt: -1 });
        return {
          _id: chat._id,
          title: chat.title || "New Chat",
          snippet: lastMsg?.content?.slice(0, 30) || "",
          updatedAt: chat.updatedAt,
        };
      })
    );
    res.status(200).json({ message: "Chats retrieved successfully", chats: chatsWithSnippet });
  } catch (err) {
    console.error("GET CHATS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get messages
export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ _id: chatId, user: req.user.id });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });
    res.status(200).json({ message: "Messages retrieved successfully", messages });
  } catch (err) {
    console.error("GET MESSAGES ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}

// ✅ Delete chat
export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOneAndDelete({ _id: chatId, user: req.user.id });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await Message.deleteMany({ chat: chatId });
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (err) {
    console.error("DELETE CHAT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}