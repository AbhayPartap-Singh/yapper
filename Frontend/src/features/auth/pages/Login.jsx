import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handlelogin } = useAuth();
  const user = useSelector((state)=>state.auth.user)
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // ✅ add navigate

  const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await handlelogin({ email, password }); // now returns true/false
  if (success) {
    navigate("/"); // ✅ redirect works
  }
};

if(!loading && user){
  return <Navigate to ="/" replace/>
}
  return (
<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">

  <form
    onSubmit={handleSubmit}
    className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl w-87.5 space-y-5"
  >

    <h2 className="text-2xl font-semibold text-center tracking-wide">
      Welcome Back
    </h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 font-medium hover:opacity-90 transition"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    {error && (
      <p className="text-center text-sm text-red-400">{error}</p>
    )}

    <p className="text-center text-sm opacity-70">
      Don’t have an account?{" "}
      <Link
        to="/register"
        className="text-indigo-400 font-medium hover:underline"
      >
        Register
      </Link>
    </p>

  </form>
</div>
  );
};

export default Login;