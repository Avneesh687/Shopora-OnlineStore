import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItemCount = useSelector((state) => state.cart.cartItems.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#FFFFFF] dark:bg-[#17332A] border-b border-[#D8E6E1] dark:border-[#0F6E56] z-50 transition-colors duration-200">
      <div className="px-6 md:px-14 py-2 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 focus:outline-none">
            <img
              src="/Shopora-logo.svg"
              alt="Shopora Logo"
              className="h-12 md:h-16 w-auto"
            />
          </Link>
        </div>
        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-[#17332A] dark:text-[#E1F5EE] focus:outline-none focus:ring-2 focus:ring-[#1D9E75] rounded p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Right Side: Desktop Links, Theme Toggle & Logout */}
        
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/shop"
                className="text-[#6B7A75] dark:text-[#E1F5EE] hover:text-[#1D9E75] font-medium transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-[#6B7A75] dark:text-[#E1F5EE] hover:text-[#1D9E75] font-medium transition-colors"
              >
                Cart ({cartItemCount})
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span className="text-[#17332A] dark:text-white font-medium">
                    <Link to="/profile">Hi, {user.username}</Link>
                  </span>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="text-[#1D9E75] hover:bg-[#E1F5EE] dark:hover:bg-[#0F6E56] dark:hover:text-white px-5 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-[#1D9E75] focus:outline-none"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  {" "}
                  <button
                    className="border border-[#1D9E75] text-[#1D9E75] hover:bg-[#E1F5EE] dark:hover:bg-[#0F6E56] dark:hover:text-white px-5 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-[#1D9E75] focus:outline-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                {" "}
                <Link
                  to="/login"
                  className="border border-[#1D9E75] text-[#1D9E75] hover:bg-[#E1F5EE] dark:hover:bg-[#0F6E56] dark:hover:text-white px-5 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-[#1D9E75] focus:outline-none"
                >
                  LogIn
                </Link>
              </li>
            )}
          </ul>

          {/* Theme Divider */}
          <div className="h-6 w-px bg-[#D8E6E1] dark:bg-[#6B7A75]"></div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1D9E75]
              ${isDarkMode ? "bg-[#D8E6E1]" : "bg-[#1D9E75]"}
            `}
            title="Toggle Theme"
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 
                transition duration-200 ease-in-out flex items-center justify-center
                ${isDarkMode ? "translate-x-5" : "translate-x-0"}
              `}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FFFFFF] dark:bg-[#17332A] border-b border-[#D8E6E1] shadow-lg flex flex-col px-6 py-4 gap-4">
          <Link
            to="/shop"
            className="text-[#6B7A75] dark:text-[#E1F5EE] font-medium"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className="text-[#6B7A75] dark:text-[#E1F5EE] font-medium"
          >
            Cart ({cartItemCount})
          </Link>

          {user.role === "admin" ? (
            <Link
              to="/admin/dashboard"
              className="text-[#1D9E75] dark:text-[#E1F5EE] font-medium"
            >
              Admin Panel
            </Link>
          ) : null}
          <div className="flex items-center justify-between border-t border-[#D8E6E1] pt-4 mt-2">
            <span className="text-[#17332A] dark:text-white font-medium">
              Dark Mode
            </span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${isDarkMode ? "bg-[#1D9E75]" : "bg-[#D8E6E1]"}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isDarkMode ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          <button className="border border-[#1D9E75] text-[#1D9E75] py-2 rounded-md font-medium w-full mt-2">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
