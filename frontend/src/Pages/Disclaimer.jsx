import React from "react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-gray-100 transition-colors duration-200 pt-24 pb-16 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-8 md:p-12 shadow-soft">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E1F5EE] dark:bg-[#17332A] text-[#1D9E75] text-2xl font-bold mb-6">
            ⚖️
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-4">
            Disclaimer
          </h1>
          <p className="text-sm text-[#6B7A75] dark:text-[#E1F5EE] mb-8">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>

          <div className="space-y-6 text-[#6B7A75] dark:text-[#E1F5EE] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-2">
                General Information
              </h2>
              <p>
                The information provided on <strong>Shopora</strong> is for general informational and shopping purposes only. All product images, specifications, and details are presented in good faith, however, actual product packaging and materials may contain different details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-2">
                External Links & Pricing
              </h2>
              <p>
                Product pricing and availability are subject to change without prior notice. We reserve the right to limit the sales of our products or services to any person, geographic region, or jurisdiction.
              </p>
            </section>

            <div className="pt-6 border-t border-[#D8E6E1] dark:border-[#2b3b35] flex items-center justify-between">
              <span className="text-sm">Questions regarding our policies?</span>
              <Link
                to="/"
                className="text-sm font-semibold text-[#1D9E75] hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
