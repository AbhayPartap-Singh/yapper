import { useDispatch } from "react-redux";
import { register, login, getMe } from '../service/auth.api'
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch()

  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true))
      await register({ username, email, password })
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "registration failed"))
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true))
      const data = await login({ email, password })
      dispatch(setUser(data.user))
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "login failed"))
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function handlGetMe() {
    try {
      dispatch(setLoading(true))
      const data = await getMe()

      // ✅ FIX: set user
      dispatch(setUser(data.user))

    } catch (error) {
      // ❗ don't spam error if not logged in
      console.log("Not logged in")
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    handleRegister,
    handleLogin,
    handlGetMe
  }
}