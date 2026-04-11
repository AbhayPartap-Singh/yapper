import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        form
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">

  <form
    onSubmit={handleSubmit}
    className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl w-87.5 space-y-5"
  >

    <h2 className="text-2xl font-semibold text-center tracking-wide">
      Create Account
    </h2>

    <input
      type="text"
      name="username"
      placeholder="Username"
      value={form.username}
      onChange={handleChange}
      required
      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      required
      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 font-medium hover:opacity-90 transition"
    >
      {loading ? "Creating..." : "Register"}
    </button>

    {message && (
      <p className="text-center text-sm opacity-70">{message}</p>
    )}

    <p className="text-center text-sm opacity-70">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-indigo-400 font-medium hover:underline"
      >
        Login
      </Link>
    </p>

  </form>
</div>
  );
};

export default Register;