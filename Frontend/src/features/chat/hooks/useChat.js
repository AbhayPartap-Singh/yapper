import { useDispatch } from "react-redux";

import {
  sendMessage as sendMessageAPI,
  getChats as getChatsAPI,
  getMessages as getMessagesAPI,
  deleteChat as deleteChatAPI,
} from "../service/chat.api";

import {
  setCurrentChatId,
  setLoading,
  setError,
} from "../chat.slice";

import { initializeSocketConnection } from "../service/chat.socket";

export const useChat = () => {
  const dispatch = useDispatch();

  // ✅ SEND MESSAGE
  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));

      const data = await sendMessageAPI({ message, chatId });

      console.log("API RESPONSE:", data);

      if (data?.chatId) {
        dispatch(setCurrentChatId(data.chatId));
      }

      dispatch(setLoading(false));
      return data;
    } catch (err) {
      console.error("SEND ERROR:", err);

      dispatch(setError(err?.response?.data?.message || err.message));
      dispatch(setLoading(false));

      return null;
    }
  }

  // ✅ GET CHATS (FIXED)
  async function getChats() {
    try {
      const res = await getChatsAPI();
      console.log("CHATS:", res);
      return res;
    } catch (err) {
      console.error("GET CHATS ERROR:", err);
      return { chats: [] };
    }
  }

  // ✅ GET MESSAGES (FIXED)
  async function getMessages(chatId) {
    try {
      const res = await getMessagesAPI(chatId);
      return res;
    } catch (err) {
      console.error("GET MESSAGES ERROR:", err);
      return { messages: [] };
    }
  }


// ✅ DELETE CHAT
async function deleteChat(chatId) {
  try {
    const res = await deleteChatAPI(chatId);
    return res;
  } catch (err) {
    console.error("DELETE CHAT ERROR:", err);
    return null;
  }
}
  return {
    handleSendMessage,
    getChats,
    getMessages,
    deleteChat,
    initializeSocketConnection,
  };
};