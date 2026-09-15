import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#17332A] py-8 px-6 md:px-14 border-t border-[#D8E6E1] dark:border-[#0F6E56] transition-colors duration-200">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        {/* Left Side: Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex items-center gap-3 focus:outline-none">
            <img
              src="/Shopora-logo.svg"
              alt="Shopora Logo"
              className="h-12 md:h-16 w-auto"
            />
          </Link>
          <p className="text-[#6B7A75] dark:text-[#E1F5EE] text-sm transition-colors duration-200">
            Premium E-Commerce Platform.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link
            to="/about"
            className="text-[#6B7A75] dark:text-[#E1F5EE] hover:text-[#1D9E75] dark:hover:text-[#1D9E75] transition-colors focus:outline-none"
          >
            About Us
          </Link>
          <Link
            to="/return-policy"
            className="text-[#6B7A75] dark:text-[#E1F5EE] hover:text-[#1D9E75] dark:hover:text-[#1D9E75] transition-colors focus:outline-none"
          >
            Return Policy
          </Link>
          <Link
            to="/disclaimer"
            className="text-[#6B7A75] dark:text-[#E1F5EE] hover:text-[#1D9E75] dark:hover:text-[#1D9E75] transition-colors focus:outline-none"
          >
            Disclaimer
          </Link>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-[#6B7A75] dark:text-[#E1F5EE] text-sm text-center md:text-right transition-colors duration-200">
          © {new Date().getFullYear()} Shopora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
