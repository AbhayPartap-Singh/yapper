import React, { useEffect, useState, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { motion } from "framer-motion";

const themes = {
  dark: {
    bg: "bg-[#0b0b0f] text-white",
    card: "bg-white/10 border border-white/10",
  },
  light: {
    bg: "bg-gray-100 text-gray-900",
    card: "bg-white border border-gray-300",
  },
  neon: {
    bg: "bg-black text-green-400",
    card: "bg-black border border-green-500",
  },
  ocean: {
    bg: "bg-gradient-to-br from-blue-900 to-teal-700 text-white",
    card: "bg-white/10 border border-white/20",
  }
};

const Dashboard = () => {
  const { handleSendMessage, handleGetChats, handleGetMessages, handleDeleteChat } = useChat();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const data = await handleGetChats();
    setChats(data?.chats || []);
  };

  const loadMessages = async (chatId) => {
    const data = await handleGetMessages(chatId);
    setMessages(data?.messages?.map(m => ({ sender: m.role, text: m.content })) || []);
    setActiveChatId(chatId);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeText = async (text) => {
    let current = "";
    for (let char of text) {
      current += char;
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });
      await new Promise(r => setTimeout(r, 10));
    }
  };

  const sendMessageHandler = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim()) return;

    setMessage("");

    setMessages(prev => [...prev, { sender: "user", text: msgToSend }, { sender: "ai", text: "" }]);

    const res = await handleSendMessage({ message: msgToSend, chatId: activeChatId });
    if (!res) return;

    await typeText(res?.aiMessage?.content || "No reply");

    if (!activeChatId && res?.chatId) {
      const newChat = {
        _id: res.chatId,
        title: "New Chat",
        snippet: msgToSend.slice(0, 30),
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(res.chatId);
      setTimeout(() => loadChats(), 500);
    }
  };

  const handleDelete = async (chatId) => {
    await handleDeleteChat(chatId);
    setChats(prev => prev.filter(c => c._id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
    }
  };

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  const handleRegenerate = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === "user");
    if (lastUserMsg) sendMessageHandler(lastUserMsg.text);
  };

  const filteredChats = chats.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const currentTheme = themes[theme];

  return (
    <div className={`${currentTheme.bg} h-screen flex flex-col md:flex-row`}>

      {/* Sidebar */}
      <div className={`w-full md:w-72 p-4 ${currentTheme.card} md:border-r overflow-y-auto`}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Chats</h2>

          {/* Theme Selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="text-sm bg-transparent border px-2 py-1 rounded"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="neon">Neon</option>
            <option value="ocean">Ocean</option>
          </select>
        </div>

        <input
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded outline-none bg-white/10"
        />

        <button
          onClick={() => {
            setActiveChatId(null);
            setMessages([]);
          }}
          className="w-full mb-4 py-2 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-lg"
        >
          + New Chat
        </button>

        <div className="space-y-2">
          {filteredChats.map(chat => (
            <div
              key={chat._id}
              className={`group p-3 rounded-lg cursor-pointer flex justify-between ${currentTheme.card}`}
              onClick={() => loadMessages(chat._id)}
            >
              <div className="flex-1">
                <div className="font-medium truncate">{chat.title}</div>
                <div className="text-xs opacity-60 truncate">{chat.snippet}</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(chat._id);
                }}
                className="ml-2 text-red-400 opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b font-semibold">AI Assistant</div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`relative px-4 py-2 rounded-2xl max-w-[85%] md:max-w-[60%] ${msg.sender === "user" ? "bg-linear-to-r from-pink-500 to-purple-500 text-white" : currentTheme.card}`}>
                {msg.text}

                <div className="absolute -bottom-6 right-2 hidden group-hover:flex gap-2 text-xs">
                  <button onClick={() => handleCopy(msg.text)}>📋</button>
                  {msg.sender === "ai" && <button onClick={handleRegenerate}>🔄</button>}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 md:p-4 flex border-t">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
            className="flex-1 px-3 py-2 rounded-l outline-none bg-white/10"
            placeholder="Ask anything..."
          />
          <button
            onClick={() => sendMessageHandler()}
            className="px-4 md:px-6 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;