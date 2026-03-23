import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../../app/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", data, { withCredentials: true });
      dispatch(setUser(res.data.user));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleGetMe = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true });
      dispatch(setUser(res.data.user));
    } catch (err) {
      console.error(err);
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};