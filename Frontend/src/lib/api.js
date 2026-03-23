import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me"); // ✅ FIXED
  return res.data;
};