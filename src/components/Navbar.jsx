import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearchLocation, FaSignOutAlt } from "react-icons/fa";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-[rgb(var(--bg-secondary))] border-b border-[rgb(var(--border-color))] px-4 py-3 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FaSearchLocation className="text-[rgb(var(--accent))] w-5 h-5" />
          <h1 className="text-lg sm:text-xl font-bold text-[rgb(var(--text-primary))]">
            Lost & Found
          </h1>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {user && (
            <span className="hidden sm:inline text-[rgb(var(--text-secondary))]">
              Hello, <span className="font-semibold text-[rgb(var(--text-primary))]">{user.name}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 border border-[rgb(var(--border-color))] text-[rgb(var(--text-primary))] px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[rgb(var(--bg-card))] hover:border-[rgb(var(--accent))]"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
