import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px] border border-gray-200">
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          LinkUp
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 outline-none focus:border-blue-400 focus:bg-white transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 outline-none focus:border-blue-400 focus:bg-white transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-slate-800 text-white py-2 rounded-full hover:bg-slate-700 transition">
          Login
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Signup
          </Link>
        </p>
      </div>

    </div>
  );
}