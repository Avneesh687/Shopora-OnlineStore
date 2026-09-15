import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-gray-100 transition-colors duration-200 pt-24 pb-16 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-8 md:p-12 shadow-soft">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E1F5EE] dark:bg-[#17332A] text-[#1D9E75] text-2xl font-bold mb-6">
            🔄
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-sm text-[#6B7A75] dark:text-[#E1F5EE] mb-8">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>

          <div className="space-y-6 text-[#6B7A75] dark:text-[#E1F5EE] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-2">
                1. 7-Day Hassle-Free Returns
              </h2>
              <p>
                We want you to be completely delighted with your purchase. If you receive an item that is defective, damaged, or not as described, you may request a return within 7 calendar days of delivery.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-2">
                2. Return Eligibility
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Item must be unused and in original packaging.</li>
                <li>All tags, manuals, and accessories must be intact.</li>
                <li>Proof of purchase (Order ID/Receipt) is required.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-2">
                3. Refund Process
              </h2>
              <p>
                Once your returned item is received and inspected, we will notify you via email. If approved, your refund will be processed within 5-7 business days back to your original payment method or bank account.
              </p>
            </section>

            <div className="pt-6 border-t border-[#D8E6E1] dark:border-[#2b3b35] flex items-center justify-between">
              <span className="text-sm">Have questions? Reach us anytime.</span>
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

export default ReturnPolicy;
