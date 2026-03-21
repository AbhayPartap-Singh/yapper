import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: integrate with auth API
    console.log('Login submitted', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-red-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-black/70 border border-red-500/40 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-red-300 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 transition font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
