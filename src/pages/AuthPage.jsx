import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearchLocation, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { api } from "../api";

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const result = isLogin
        ? await api.login(email, password)
        : await api.signup(name, email, password);

      onLogin(result.user, result.token);
      navigate("/feed");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center px-4">
      <div className="bg-[rgb(var(--bg-card))] w-full max-w-sm rounded-xl shadow-md border border-[rgb(var(--border-color))] p-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <FaSearchLocation className="text-amber-500 w-5 h-5" />
          <h1 className="text-xl font-bold text-[rgb(var(--text-primary))]">
            Lost & Found
          </h1>
        </div>
        <p className="text-center text-sm text-[rgb(var(--text-secondary))] mb-4">
          Campus Lost and Found Portal
        </p>

        <div className="flex mb-4 border border-[rgb(var(--border-color))] rounded-lg overflow-hidden">
          <button
            className={`w-1/2 py-2 text-sm font-medium ${
              isLogin
                ? "bg-amber-600 text-white"
                : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))]"
            }`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-sm font-medium ${
              !isLogin
                ? "bg-amber-600 text-white"
                : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))]"
            }`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] w-3.5 h-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[rgb(var(--border-color))] rounded-lg pl-9 pr-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] w-3.5 h-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[rgb(var(--border-color))] rounded-lg pl-9 pr-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] w-3.5 h-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[rgb(var(--border-color))] rounded-lg pl-9 pr-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 text-sm disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-[rgb(var(--text-secondary))] text-center mt-4">
          Connects to the real backend API for authentication.
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
