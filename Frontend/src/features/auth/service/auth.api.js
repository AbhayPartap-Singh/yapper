import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export async function register(data) {
  const res = await api.post('/auth/register', data)
  return res.data
}

export async function login(data) {
  const res = await api.post('/auth/login', data)
  return res.data
}

export async function getMe() {
  const res = await api.get('/auth/me') // ✅ CORRECT
  return res.data
}