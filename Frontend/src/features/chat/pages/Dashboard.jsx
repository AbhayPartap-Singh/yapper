import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const { handleSendMessage, initializeSocketConnection } = useChat();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Welcome. I am your AI assistant. Ask anything." },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeSocketConnection(); // ✅ fixed
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg },
    ]);

    setMessage("");

    // Add loading message
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: "Thinking... 🤖" },
    ]);

    try {
      const res = await handleSendMessage({ message: userMsg });

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove "Thinking..."
        return [
          ...updated,
          { sender: "ai", text: res?.aiMessage?.content || JSON.stringify(res) },
        ];
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#07070a] flex font-[Inter]">
      
      {/* Sidebar */}
      <div className="w-60 border-r border-white/10 bg-white/5 flex flex-col">
        <div className="p-4 text-white font-semibold">✦ AI</div>

        <button className="mx-4 mb-2 py-2 rounded bg-pink-500 text-white">
          + New Chat
        </button>

        <div className="flex-1 px-3 space-y-2">
          <div className="p-2 bg-white/10 rounded text-white">
            Recent Chat
          </div>
        </div>

        <div className="p-3 text-xs text-white/60 border-t border-white/10">
          {user?.name || "User"}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="h-15 flex items-center px-6 border-b border-white/10 text-white">
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
                    ? "bg-pink-500 text-white"
                    : "bg-white/10 text-white"
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
            className="flex-1 bg-white/10 text-white px-4 py-2 rounded-l outline-none"
            placeholder="Ask anything..."
          />
          <button
            onClick={sendMessageHandler}
            className="px-5 bg-pink-500 text-white rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;