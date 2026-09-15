import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-gray-100 transition-colors duration-200 pt-24 pb-16 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-8 md:p-12 shadow-soft">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E1F5EE] dark:bg-[#17332A] text-[#1D9E75] text-2xl font-bold mb-6">
            ✅
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-4">
            Order Successful!
          </h1>
          <p className="text-sm text-[#6B7A75] dark:text-[#E1F5EE] mb-8">
            Thank you for your purchase. Your order has been placed successfully
            and is being processed. You will receive a confirmation email
            shortly with the details of your order.
          </p>
          <Link to="/shop" className="mt-2 inline-block">
            <p className="text-sm font-semibold text-[#1D9E75] hover:underline">
              ← Continue Shopping
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
