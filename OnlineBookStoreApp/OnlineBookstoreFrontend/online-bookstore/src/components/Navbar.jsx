import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getDashboardPath } from "../context/AuthContext";

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
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center items-center px-8 py-4 bg-surface/90 backdrop-blur-md shadow-elevation-1">
      <div className="flex items-center gap-12 max-w-7xl w-full justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-display font-bold text-3xl text-primary tracking-tight">
            The<span className="italic text-secondary font-medium ml-1">Inkwell.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1 label-md hover:-translate-y-0.5 transition-all duration-300">Browse</Link>
            <Link to="/collections" className="text-secondary font-medium label-md hover:text-primary hover:-translate-y-0.5 transition-all duration-300">Collections</Link>
            <Link to="/stores" className="text-secondary font-medium label-md hover:text-primary hover:-translate-y-0.5 transition-all duration-300">Stores</Link>
            <Link to="/membership" className="text-secondary font-medium label-md hover:text-primary hover:-translate-y-0.5 transition-all duration-300">Membership</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search by author, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-b-2 border-stone focus:border-primary focus:ring-0 px-4 py-2 w-64 body-md text-on-surface outline-none transition-colors duration-300 placeholder-on-surface-variant"
            />
            <button type="submit" className="absolute right-2 top-2 text-on-surface-variant hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </form>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate(getDashboardPath(user?.roles || []))}
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary label-md rounded-sm hover:bg-primary hover:text-on-primary transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  My Dashboard
                </button>
                <div className="hidden md:flex flex-col leading-tight items-end">
                  <span className="label-md text-on-surface">{user.name}</span>
                  <button onClick={logout} className="caption text-primary hover:underline">Logout</button>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(getDashboardPath(user?.roles || []))}
                  className="relative cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/36?u=${user.email}`}
                    alt={user.name}
                    className="w-10 h-10 object-cover"
                  />
                </button>
              </>
            ) : (
              <>
                <button onClick={login} className="text-primary font-bold label-md hover:text-primary-container transition-colors">Log In</button>
                <button onClick={() => navigate("/register")} className="btn-primary">Sign Up</button>
              </>
            )}
            <button className="hidden md:block btn-ghost px-4 py-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
