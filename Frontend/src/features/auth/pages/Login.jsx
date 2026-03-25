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
  return <Naviagte to ="/" replace/>
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-600 via-pink-200 to-pink-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-87.5 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-center text-sm text-gray-600">{error}</p>}

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 font-semibold hover:underline"
          >
           register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;