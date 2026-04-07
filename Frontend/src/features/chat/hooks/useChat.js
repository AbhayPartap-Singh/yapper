import { useDispatch } from "react-redux";
import { sendMessage as apiSendMessage, getChats, getMessages, deleteChat as apiDeleteChat } from "../service/chat.api";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    try {
      const data = await apiSendMessage({ message, chatId });
      return data;
    } catch (err) {
      console.error("SendMessage Error:", err);
      return null;
    }
  }

  async function handleGetChats() {
    try {
      const data = await getChats();
      return data;
    } catch (err) {
      console.error("GetChats Error:", err);
      return { chats: [] };
    }
  }

  async function handleGetMessages(chatId) {
    try {
      const data = await getMessages(chatId);
      return data;
    } catch (err) {
      console.error("GetMessages Error:", err);
      return { messages: [] };
    }
  }

  async function handleDeleteChat(chatId) {
    try {
      const data = await apiDeleteChat(chatId);
      return data;
    } catch (err) {
      console.error("DeleteChat Error:", err);
      return null;
    }
  }

  return {
    handleSendMessage,
    handleGetChats,
    handleGetMessages,
    handleDeleteChat,
  };
};