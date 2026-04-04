import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// ✅ SEND MESSAGE
export const sendMessage = async ({ message, chatId }) => {
  const res = await api.post("/chats/message", { message, chatId });
  return res.data;
};

// ✅ GET ALL CHATS (SIDEBAR)
export const getChats = async () => {
  const res = await api.get("/chats");
  return res.data;
};

// ✅ GET MESSAGES
export const getMessages = async (chatId) => {
  const res = await api.get(`/chats/${chatId}`);
  return res.data;
};

// ✅ DELETE CHAT
export const deleteChat = async (chatId) => {
  const res = await api.delete(`/chats/delete/${chatId}`);
  return res.data;
};