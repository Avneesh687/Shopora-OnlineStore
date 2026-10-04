import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/myorders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] mt-8 py-14 px-4 flex justify-center transition-colors duration-200">
      <div className="w-full max-w-4xl bg-gray-50 dark:bg-[#1a1d1c] rounded-2xl border border-[#D8E6E1] dark:border-[#2a2f2d] p-8 md:p-12 shadow-lg h-fit">
        {/* Profile Header Area */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-start border-b border-[#D8E6E1] dark:border-[#2a2f2d] pb-8 mb-8 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-[#17332A] dark:text-white mb-4">
              My Profile
            </h2>
            <p className="text-lg text-[#17332A] dark:text-gray-300">
              <strong className="text-[#6B7A75] dark:text-gray-400 font-semibold mr-1">
                Name:
              </strong>
              {user?.username || "Guest"}
            </p>
            <p className="text-lg text-[#17332A] dark:text-gray-300">
              <strong className="text-[#6B7A75] dark:text-gray-400 font-semibold mr-1">
                Email:
              </strong>
              {user?.email || "No Email Provided"}
            </p>

            <div className="pt-2">
              <span className="px-4 py-1.5 rounded-lg text-sm font-bold bg-[#E1F5EE] dark:bg-[#0b1a15] border border-[#1D9E75] text-[#1D9E75] uppercase tracking-wider inline-block">
                {user.role === "admin" ? "Admin" : "User"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="border border-[#1D9E75] text-[#1D9E75] hover:bg-[#E1F5EE] dark:hover:bg-[#0F6E56] dark:hover:text-white px-5 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-[#1D9E75] focus:outline-none"
          >
            Logout
          </button>
        </div>

        <h3 className="text-2xl font-bold text-[#17332A] dark:text-white mb-6">
          Order History
        </h3>

        {loading ? (
          <p className="text-[#1D9E75] font-medium animate-pulse">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-[#0b1a15] rounded-xl border border-[#D8E6E1] dark:border-[#131615] p-12 flex flex-col items-center justify-center gap-5 shadow-inner">
            {/* Empty State Box */}
            <p className="text-[#6B7A75] dark:text-gray-400 text-lg">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="inline-flex px-6 py-3 bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-semibold rounded-xl shadow transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Orders List */}
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-[#222725] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <p className="text-[#17332A] dark:text-white">
                    <strong className="text-[#6B7A75] dark:text-gray-400 font-semibold mr-1">
                      Order ID:
                    </strong>
                    {order._id}
                  </p>
                  <p className="text-[#17332A] dark:text-white">
                    <strong className="text-[#6B7A75] dark:text-gray-400 font-semibold mr-1">
                      Date:
                    </strong>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-[#1D9E75] font-extrabold text-lg pt-1">
                    <strong className="text-[#6B7A75] dark:text-gray-400 font-normal text-base mr-1">
                      Total:
                    </strong>
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>

                <div>
                  <span className="px-5 py-1.5 rounded-lg text-sm font-bold bg-[#E1F5EE] dark:bg-[#0b1a15] border border-[#1D9E75] text-[#1D9E75] uppercase tracking-wider inline-block">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
