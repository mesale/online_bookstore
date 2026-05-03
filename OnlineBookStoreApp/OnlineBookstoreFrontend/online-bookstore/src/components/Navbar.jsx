import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";


export default function Navbar() {
  const { user, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

        {/* Left: Browse Category */}
        <div className="flex items-center gap-1 text-textMuted cursor-pointer hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">
          <span>Browse Category</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Center-left: Search */}
        <form onSubmit={handleSearch} className="flex items-center bg-surface rounded-full px-4 py-2 gap-2 flex-1 max-w-sm">
          <svg className="w-4 h-4 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search Book"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none w-full text-textMain placeholder-textMuted"
          />
        </form>

        {/* Center: Logo */}
        <Link to="/" className="text-xl font-display font-bold text-textMain tracking-tight">
          read<span className="text-primary">books</span>
        </Link>

        {/* Right: Avatar + Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="relative cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Go to user dashboard"
              >
                <img
                  src={`https://i.pravatar.cc/36?u=${user.email}`}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-primary"
                />
              </button>
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-xs font-semibold text-textMain">{user.name}</span>
                <button onClick={logout} className="text-xs text-primary hover:underline text-left">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/register")}
                className="border-2 border-primary text-primary px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Register
              </button>
              <button
                onClick={login}
                className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Login
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 cursor-pointer text-textMain hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-sm font-medium">Menu</span>
          </div>
        </div>

      </div>
    </nav>
  );
}
