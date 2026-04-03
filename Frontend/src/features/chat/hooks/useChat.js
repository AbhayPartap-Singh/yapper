import { useDispatch } from "react-redux";
import { sendMessage } from "../service/chat.api";
import { setCurrentChatId, setLoading, setError } from "../chat.slice";
import { initializeSocketConnection } from "../service/chat.socket";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
  try {
    dispatch(setLoading(true));

    const data = await sendMessage({ message, chatId });

    console.log("API RESPONSE:", data); // 🔍 ADD THIS

    dispatch(setCurrentChatId(data.chatId));
    dispatch(setLoading(false));

    return data; // ✅ return FULL response
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(setLoading(false));
  }
}

  return {
    handleSendMessage,
    initializeSocketConnection,
  };
};