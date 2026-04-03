import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ fixed
  withCredentials: true,
});

export const sendMessage = async ({ message, chatId }) => {
  const res = await api.post("/chats/message", { message, chatId });
  return res.data;
};

export const getChats = async () => {
  const res = await api.get("/chats");
  return res.data;
};

export const getMessages = async (chatId) => {
  const res = await api.get(`/chats/${chatId}/messages`);
  return res.data;
};

export const deleteChat = async (chatId) => {
  const res = await api.delete(`/chats/delete/${chatId}`);
  return res.data;
};