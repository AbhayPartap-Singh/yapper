import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const {
    handleSendMessage,
    initializeSocketConnection,
    getChats,
    getMessages,
    deleteChat, // ✅ NEW
  } = useChat();

  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const messagesEndRef = useRef(null);

  // ✅ INITIAL LOAD
  useEffect(() => {
    initializeSocketConnection();
    loadChats();

    const savedChatId = localStorage.getItem("activeChatId");

    if (savedChatId) {
      loadMessages(savedChatId);
    } else {
      setMessages([{ sender: "ai", text: "Welcome. Ask anything." }]);
    }
  }, []);

  // ✅ LOAD CHATS
  const loadChats = async () => {
    const res = await getChats();
    setChats(res?.chats || []);
  };

  // ✅ LOAD MESSAGES
  const loadMessages = async (chatId) => {
    const res = await getMessages(chatId);

    const formatted =
      res?.messages?.map((m) => ({
        sender: m.role,
        text: m.content,
      })) || [];

    setMessages(formatted);
    setActiveChatId(chatId);

    localStorage.setItem("activeChatId", chatId);
  };

  // ✅ DELETE CHAT
  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);

      // remove from UI
      setChats((prev) => prev.filter((c) => c._id !== chatId));

      // reset if active deleted
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([{ sender: "ai", text: "Chat deleted. Start new one." }]);
        localStorage.removeItem("activeChatId");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ SEND MESSAGE
  const sendMessageHandler = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg },
      { sender: "ai", text: "Thinking... 🤖" },
    ]);

    try {
      const res = await handleSendMessage({
        message: userMsg,
        chatId: activeChatId,
      });

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();

        return [
          ...updated,
          { sender: "ai", text: res?.aiMessage?.content || "No reply" },
        ];
      });

      // ✅ NEW CHAT CREATED
      if (!activeChatId && res?.chatId) {
        setActiveChatId(res.chatId);
        localStorage.setItem("activeChatId", res.chatId);
        loadChats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessageHandler();
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[#07070a] text-white">

      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-4 font-semibold text-lg">💬 Chats</div>

        {/* New Chat */}
        <button
          onClick={() => {
            setActiveChatId(null);
            localStorage.removeItem("activeChatId");

            setMessages([{ sender: "ai", text: "Welcome. Ask anything." }]);
          }}
          className="mx-4 mb-3 py-2 bg-pink-500 rounded hover:bg-pink-600 transition"
        >
          + New Chat
        </button>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {chats.length === 0 ? (
            <p className="text-white/50 text-sm">No chats yet</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`group flex items-center justify-between p-2 rounded cursor-pointer ${
                  activeChatId === chat._id
                    ? "bg-pink-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {/* Chat Title */}
                <div
                  onClick={() => loadMessages(chat._id)}
                  className="flex-1 truncate"
                >
                  {chat.title || "New Chat"}
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening chat
                    handleDeleteChat(chat._id);
                  }}
                  className="ml-2 text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-3 text-xs border-t border-white/10">
          {user?.name || "User"}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="p-4 border-b border-white/10 text-lg">
          AI Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[60%] ${
                  msg.sender === "user"
                    ? "bg-pink-500"
                    : "bg-white/10"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white/10 px-4 py-2 rounded-l outline-none"
            placeholder="Ask anything..."
          />
          <button
            onClick={sendMessageHandler}
            className="px-5 bg-pink-500 rounded-r hover:bg-pink-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;