import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";

function App() {
  // Persist login across page refreshes using localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("lf_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("lf_token"));

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("lf_user", JSON.stringify(userData));
    localStorage.setItem("lf_token", authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lf_user");
    localStorage.removeItem("lf_token");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/feed" /> : <AuthPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/feed"
        element={
          user ? (
            <FeedPage user={user} token={token} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to={user ? "/feed" : "/login"} />} />
    </Routes>
  );
}

export default App;
