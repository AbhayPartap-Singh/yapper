import { useDispatch } from "react-redux";
import { setUser } from "../../../app/auth.slice";
import { useNavigate } from "react-router-dom";
import { register, login, getMe } from "../../../lib/api"; // 👈 use your api

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await register(data);
      navigate("/");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleLogin = async (data) => {
  try {
   const res = await login(data);
   dispatch(setUser(res.user));
    return true;
  } catch (err) {
    console.log("LOGIN ERROR 👉", err.response?.data); // 🔥 ADD THIS
    return false;
  }
};

  const handleGetMe = async () => {
    try {
      const res = await getMe();
      dispatch(setUser(res.user));
    } catch (err) {
      console.error(err);
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};