import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-gray-100 transition-colors duration-200 pt-24 pb-16 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-8 md:p-12 shadow-soft">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E1F5EE] dark:bg-[#17332A] text-[#1D9E75] text-2xl font-bold mb-6">
            🏬
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-4">
            About Shopora
          </h1>
          <p className="text-lg text-[#1D9E75] font-semibold mb-6">
            Your destination for curated, high-quality products at unbeatable value.
          </p>

          <div className="space-y-6 text-[#6B7A75] dark:text-[#E1F5EE] leading-relaxed">
            <p>
              Welcome to <strong>Shopora</strong>, where premium lifestyle meets modern e-commerce. Founded with a vision to make online shopping seamless, delightful, and trustworthy, we bring together carefully selected products across categories.
            </p>
            <p>
              Our mission is simple: provide an elevated shopping experience with swift delivery, verified quality, and 24/7 customer support. Every item in our collection undergoes strict quality checks before reaching your doorstep.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D8E6E1] dark:border-[#2b3b35]">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#17332A] text-center">
                <div className="text-2xl font-extrabold text-[#1D9E75] mb-1">10k+</div>
                <div className="text-xs font-semibold">Happy Customers</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#17332A] text-center">
                <div className="text-2xl font-extrabold text-[#1D9E75] mb-1">100%</div>
                <div className="text-xs font-semibold">Authentic Products</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#17332A] text-center">
                <div className="text-2xl font-extrabold text-[#1D9E75] mb-1">24/7</div>
                <div className="text-xs font-semibold">Customer Support</div>
              </div>
            </div>

            <div className="pt-6 text-center">
              <Link
                to="/shop"
                className="inline-flex px-6 py-3 bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-semibold rounded-xl shadow transition"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
