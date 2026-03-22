
import React, { useState } from 'react'
import { useAuth } from "../hook/useAuth"; // adjust path if needed

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleRegister({ username, email, password })
  }

  return (
    <div>
      
         <div className="min-h-screen flex items-center justify-center  from-gray-950 via-red-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-black/70 border border-red-500/40 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-red-300 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-red-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-red-500/50 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Your username"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-red-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-red-500/50 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-red-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-red-500/50 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-x  from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 transition font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
     
    </div>
  )
}

export default Register