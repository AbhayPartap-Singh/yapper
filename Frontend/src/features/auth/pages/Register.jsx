import { useState } from "react";
import { useAuth } from "../hook/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleRegister({ username, email, password });
    if (success) {
      alert("Registered successfully!");
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-red-900 to-black text-white overflow-hidden">

  {/* 🔴 Animated Bubbles */}
  <div className="absolute inset-0 overflow-hidden z-0">
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
  </div>

  {/* 🔥 Card */}
  <div className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-lg bg-white/5 border border-red-500/30 shadow-2xl">

    <h2 className="text-3xl font-bold mb-6 text-center text-red-300 tracking-wide">
      Create Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-red-500 focus:outline-none transition duration-300 placeholder-gray-400"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-red-500 focus:outline-none transition duration-300 placeholder-gray-400"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-red-500 focus:outline-none transition duration-300 placeholder-gray-400"
      />

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-linear-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition duration-300 font-semibold shadow-lg"
      >
        Register
      </button>
    </form>

    {/* Switch to Login */}
    <p className="text-center text-gray-400 text-sm mt-6">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-red-500 hover:underline cursor-pointer"
      >
        Login
      </span>
    </p>
  </div>
</div>
  );
};

export default Register;