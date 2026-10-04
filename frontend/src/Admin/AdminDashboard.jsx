import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Agar user admin nahi hai, toh wapas bhej do
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/analytics`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch admin stats.");
        } else {
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  // Flash prevent karne ke liye
  if (!user || user.role !== "admin") return null;

  return (
    <div className="mt-16 pt-16 pb-16 min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-10 px-4 md:px-14 transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-10 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-[#6B7A75] dark:text-[#E1F5EE] mt-2">
          Welcome back, {user.username}. Here is what's happening today.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-[#1D9E75] text-lg font-bold animate-pulse">
            Loading analytics...
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Analytics Statistics Grid */}
          <div>
            <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-6">
              Overview Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-[#1a1d1c] p-6 rounded-2xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#E1F5EE] dark:bg-[#0b1a15] flex items-center justify-center text-[#1D9E75] border border-[#1D9E75]/30">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6B7A75] dark:text-gray-400">
                    Total Users
                  </p>
                  <p className="text-2xl font-extrabold text-[#17332A] dark:text-white">
                    {stats.totalUsers}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1d1c] p-6 rounded-2xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/30">
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6B7A75] dark:text-gray-400">
                    Products
                  </p>
                  <p className="text-2xl font-extrabold text-[#17332A] dark:text-white">
                    {stats.totalProducts}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1d1c] p-6 rounded-2xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-500/30">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6B7A75] dark:text-gray-400">
                    Total Orders
                  </p>
                  <p className="text-2xl font-extrabold text-[#17332A] dark:text-white">
                    {stats.totalOrders}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1d1c] p-6 rounded-2xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-500/30">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6B7A75] dark:text-gray-400">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-extrabold text-[#17332A] dark:text-white">
                    ${stats.revenue?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel Section */}
          <div>
            <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-6 border-t border-[#D8E6E1] dark:border-[#1e2321] pt-10">
              Admin Control Panel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/admin/add-product")}
                className="bg-[#1D9E75] hover:bg-[#0F6E56] text-white py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:ring-offset-2 dark:focus:ring-offset-[#0b1a15]"
              >
                <svg
                  className="w-8 h-8 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Product
              </button>

              <button
                onClick={() => navigate("/admin/products")}
                className="bg-white dark:bg-[#1a1d1c] hover:bg-[#E1F5EE] dark:hover:bg-[#222725] text-[#17332A] dark:text-white border border-[#D8E6E1] dark:border-[#2a2f2d] py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md focus:outline-none"
              >
                <svg
                  className="w-8 h-8 mb-1 text-[#1D9E75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
                Manage Products
              </button>

              <button
                onClick={() => navigate("/admin/orders")}
                className="bg-white dark:bg-[#1a1d1c] hover:bg-[#E1F5EE] dark:hover:bg-[#222725] text-[#17332A] dark:text-white border border-[#D8E6E1] dark:border-[#2a2f2d] py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md focus:outline-none"
              >
                <svg
                  className="w-8 h-8 mb-1 text-[#1D9E75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  ></path>
                </svg>
                Manage Orders
              </button>

              <button
                onClick={() => navigate("/admin/users")}
                className="bg-white dark:bg-[#1a1d1c] hover:bg-[#E1F5EE] dark:hover:bg-[#222725] text-[#17332A] dark:text-white border border-[#D8E6E1] dark:border-[#2a2f2d] py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md focus:outline-none"
              >
                <svg
                  className="w-8 h-8 mb-1 text-[#1D9E75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                Manage Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
