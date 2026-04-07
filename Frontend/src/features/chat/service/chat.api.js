import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api", withCredentials: true });

export const sendMessage = async ({ message, chatId }) => (await api.post("/chats/message", { message, chatId })).data;
export const getChats = async () => (await api.get("/chats")).data;
export const getMessages = async (chatId) => (await api.get(`/chats/${chatId}/messages`)).data;
export const deleteChat = async (chatId) => (await api.delete(`/chats/delete/${chatId}`)).data;