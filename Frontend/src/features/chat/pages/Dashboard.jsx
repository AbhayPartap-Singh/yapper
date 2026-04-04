import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const { handleSendMessage, initializeSocketConnection, getChats, getMessages, deleteChat } = useChat();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeSocketConnection();
    loadChats();

    const savedChatId = localStorage.getItem("activeChatId");
    if (savedChatId) loadMessages(savedChatId);
    else setMessages([{ sender: "ai", text: "Welcome. Ask anything." }]);
  }, []);

  const loadChats = async () => {
    const res = await getChats();
    setChats(res?.chats || []);
  };

  const loadMessages = async (chatId) => {
    const res = await getMessages(chatId);
    const formatted = res?.messages?.map((m) => ({ sender: m.role, text: m.content })) || [];
    setMessages(formatted);
    setActiveChatId(chatId);
    localStorage.setItem("activeChatId", chatId);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      setChats((prev) => prev.filter((c) => c._id !== chatId));
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([{ sender: "ai", text: "Chat deleted. Start new one." }]);
        localStorage.removeItem("activeChatId");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage("");

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    try {
      const res = await handleSendMessage({ message: userMsg, chatId: activeChatId });

      // Typing effect for AI response
      const fullText = res?.aiMessage?.content || "No reply";
      let index = 0;

      setMessages((prev) => [...prev, { sender: "ai", text: "" }]); // empty placeholder

      const typingInterval = setInterval(() => {
        index++;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText.slice(0, index);
          return updated;
        });

        if (index === fullText.length) clearInterval(typingInterval);
      }, 20); // typing speed: 20ms per character

      if (!activeChatId && res?.chatId) {
        setActiveChatId(res.chatId);
        localStorage.setItem("activeChatId", res.chatId);
        loadChats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessageHandler();
  };

  return (
    <div className="h-screen w-screen flex bg-linear-to-br from-[#1f2024] to-[#2c2f3a] text-white font-sans">

      {/* Sidebar */}
      <div className="w-72 border-r border-white/20 flex flex-col bg-linear-to-b from-[#2a2b34] to-[#1e1f27]">
        <div className="p-6 font-bold text-2xl tracking-wide text-gradient bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-indigo-400 to-cyan-400">
          💬 Chats
        </div>

        <button
          onClick={() => {
            setActiveChatId(null);
            localStorage.removeItem("activeChatId");
            setMessages([{ sender: "ai", text: "Welcome. Ask anything." }]);
          }}
          className="mx-6 mb-4 py-3 bg-linear-to-r from-purple-500 to-indigo-500 rounded-xl text-white font-medium hover:scale-105 transition-transform"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto px-4 space-y-3">
          {chats.length === 0 ? (
            <p className="text-white/40 text-sm">No chats yet</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                  activeChatId === chat._id
                    ? "bg-linear-to-r from-purple-600 to-indigo-600"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div onClick={() => loadMessages(chat._id)} className="flex-1 truncate font-medium">
                  {chat.title || "New Chat"}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat._id);
                  }}
                  className="ml-3 text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 text-sm border-t border-white/20 text-white/60">
          {user?.name || "User"}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
       <div
  className="p-6 border-b border-white/20 flex items-center justify-center text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white-700 to-cyan-400"
  style={{
    textShadow: "0 0 8px rgba(255, 255, 255, 0.4), 0 0 12px rgba(128, 0, 255, 0.3)",
  }}
>
  Yapper
</div>
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-5 py-3 rounded-2xl max-w-[65%] ${
                  msg.sender === "user"
                    ? "bg-linear-to-r from-cyan-500 to-indigo-500 text-white font-medium text-lg"
                    : "bg-linear-to-r from-indigo-700 via-purple-700 to-cyan-700 text-white font-medium text-lg"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/20 flex space-x-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white/10 px-6 py-4 rounded-3xl outline-none placeholder:text-white/60 text-lg"
            placeholder="Ask anything..."
          />
          <button
            onClick={sendMessageHandler}
            className="px-7 bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl font-semibold hover:scale-105 transition-transform"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;