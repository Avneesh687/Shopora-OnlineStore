import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched orders:", data);
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log("Updated order status:", data);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pt-16 pb-16 min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-10 px-4 md:px-14 transition-colors duration-200">
      {/* Header */}
      <div className="mb-8 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-6">
        <h1 className="text-3xl font-extrabold text-[#17332A] dark:text-white">
          Manage Orders
        </h1>
        <p className="text-[#6B7A75] dark:text-[#E1F5EE] mt-2">
          View and update customer order statuses.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-[#1D9E75] text-lg font-bold animate-pulse">
            Loading orders...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 dark:bg-[#1a1d1c] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] p-12 text-center">
          <p className="text-[#6B7A75] dark:text-gray-400 text-lg">
            No orders found.
          </p>
        </div>
      ) : (
        /* Responsive Table Container */
        <div className="bg-white dark:bg-[#1a1d1c] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Head */}
              <thead className="bg-gray-50 dark:bg-[#222725] text-[#6B7A75] dark:text-gray-400 text-xs sm:text-sm uppercase font-bold tracking-wider border-b border-[#D8E6E1] dark:border-[#2a2f2d]">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Order ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">User</th>
                  <th className="px-6 py-4 whitespace-nowrap">Total</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table Body */}

              <tbody className="divide-y divide-[#D8E6E1] dark:divide-[#2a2f2d]">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#222725]/50 transition-colors"
                  >
                    {/* Order ID */}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#6B7A75] dark:text-[#E1F5EE]">
                      {order._id.substring(order._id.length - 8)}{" "}
                      {/* Sirf last 8 characters dikhaye hain taaki table clean lage */}
                    </td>

                    {/* User Name */}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#17332A] dark:text-white">
                      {order.address?.fullName || "Unknown"}
                    </td>

                    {/* Total Amount */}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-[#1D9E75]">
                      ${order.totalAmount?.toFixed(2)}
                    </td>

                    {/* Date */}

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#17332A] dark:text-gray-300">
                      {new Date(
                        order.date || order.createdAt,
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status Dropdown */}

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className={`
                          text-sm font-bold rounded-lg px-3 py-1.5 border-2 outline-none cursor-pointer transition-colors focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-[#1a1d1c]
                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400 focus:ring-green-500"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 focus:ring-blue-500"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-400 focus:ring-yellow-500"
                          }
                        `}
                      >
                        <option
                          value="Pending"
                          className="text-gray-900 bg-white"
                        >
                          Pending
                        </option>
                        <option
                          value="Shipped"
                          className="text-gray-900 bg-white"
                        >
                          Shipped
                        </option>
                        <option
                          value="Delivered"
                          className="text-gray-900 bg-white"
                        >
                          Delivered
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
