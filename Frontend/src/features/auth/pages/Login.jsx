// src/features/auth/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
   if (success) {
  navigate("/dashboard");
}
  };

  return (
     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-red-900 text-white overflow-hidden">


  {/* 🌌 Stars go HERE */}
  <div className="stars"></div>
  <div className="stars2"></div>
  <div className="stars3"></div>
  <div className="stars4"></div>
  <div className="stars5"></div>


  {/* 🔥 Login Card */}
  <div className="absolute w-[400px] h-[400px] bg-red-600/20 blur-3xl rounded-full"></div>
  <div className="relative z-10 animate-fadeIn">
  <form
    onSubmit={handleSubmit}
    className="relative z-10 w-[350px] p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
  >
    <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
      Welcome Back
    </h2>

    {/* Email */}
    <div className="mb-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-red-500 focus:outline-none transition duration-300 placeholder-gray-400"
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-red-500 focus:outline-none transition duration-300 placeholder-gray-400"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition duration-300 font-semibold shadow-lg"
    >
      Login
    </button>

    {/* Divider */}
    <div className="flex items-center my-6">
      <div className="flex-grow h-px bg-gray-700"></div>
      <span className="mx-3 text-gray-400 text-sm">OR</span>
      <div className="flex-grow h-px bg-gray-700"></div>
    </div>

    {/* Register */}
    <p className="text-center text-gray-400 text-sm">
      Don’t have an account?{" "}
      <span
        onClick={() => navigate("/register")}
        className="text-red-500 hover:underline cursor-pointer"
      >
        Register
      </span>
    </p>
  </form> </div>
</div>
  );
};

export default Login;