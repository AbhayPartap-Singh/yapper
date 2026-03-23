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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-gray-950 via-red-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-black/70 border border-red-500/40 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-red-300 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;