import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
  const Chat = useChat()
  const auth = useSelector((state) => state.auth)
  const user = auth?.user

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Welcome. I am your AI assistant. Ask anything.' }
  ])

  const messagesEndRef = useRef(null)

  useEffect(() => {
    Chat.initializeSocketConnection
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMsg = message
    setMessages((prev) => [...prev, { sender: 'user', text: newMsg }])
    setMessage("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Generating response... ✨' }
      ])
    }, 800)
  }

  return (
   <div className="h-screen w-screen overflow-hidden bg-[#07070a] flex font-[Inter]">

  {/* Sidebar */}
  <div className="w-60 h-full flex flex-col border-r border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-xl">
    <div className="h-[60px] flex items-center px-5 text-white text-lg font-semibold tracking-wide shrink-0">
      ✦ AI
    </div>

    <div className="px-4 py-2 shrink-0">
      <button className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all">
        + New Chat
      </button>
    </div>

    <div className="flex-1 overflow-y-auto px-3 space-y-2 mt-2">
      <div className="p-3 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10">
        Recent Chat
      </div>
      <div className="p-3 rounded-xl text-white/60 hover:bg-white/10 transition border border-transparent hover:border-white/10">
        Old Chat
      </div>
    </div>

    <div className="h-[70px] border-t border-white/10 flex flex-col justify-center px-4 text-xs text-white/60 shrink-0">
      <span className="uppercase tracking-wider text-[10px]">Logged in</span>
      <span className="text-white font-medium truncate mt-0.5">{user?.name || 'User'}</span>
    </div>
  </div>

  {/* Chat Section */}
  <div className="flex-1 h-full flex flex-col min-w-0">

    {/* Header */}
    <div className="h-[60px] flex items-center justify-between px-6 border-b border-white/10 shrink-0 bg-white/[0.02] backdrop-blur-md">
      <h2 className="text-white text-sm font-medium tracking-wide">AI Assistant</h2>
      <span className="text-green-400 text-xs font-medium">● Online</span>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[60%] break-words px-4 py-2.5 rounded-2xl text-sm leading-relaxed border backdrop-blur-md ${
              msg.sender === 'user'
                ? 'bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-white border-transparent shadow-[0_8px_25px_rgba(236,72,153,0.25)]'
                : 'bg-white/10 text-white/90 border-white/10'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <div className="h-[70px] border-t border-white/10 flex items-center px-4 shrink-0 bg-white/[0.02] backdrop-blur-md">
      <div className="flex w-full items-center bg-white/10 rounded-full px-4 py-2 border border-white/10 focus-within:border-pink-500/40 transition">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40"
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white text-sm font-medium shadow-md shadow-pink-500/20 hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>

  </div>
</div>
  )
}

export default Dashboard