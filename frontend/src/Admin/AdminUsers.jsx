import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="mt-16 min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-10 px-4 md:px-14 transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-8 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-6">
        <h1 className="text-3xl font-extrabold text-[#17332A] dark:text-white">
          User Directory
        </h1>
        <p className="text-[#6B7A75] dark:text-[#E1F5EE] mt-2">
          Manage registered accounts and view roles.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-[#1D9E75] text-lg font-bold animate-pulse">
            Loading users...
          </p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-gray-50 dark:bg-[#1a1d1c] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] p-12 text-center">
          <p className="text-[#6B7A75] dark:text-gray-400 text-lg">
            No users found.
          </p>
        </div>
      ) : (
        /* Table Container */
        <div className="bg-white dark:bg-[#1a1d1c] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Head */}
              <thead className="bg-gray-50 dark:bg-[#222725] text-[#6B7A75] dark:text-gray-400 text-xs sm:text-sm uppercase font-bold tracking-wider border-b border-[#D8E6E1] dark:border-[#2a2f2d]">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 whitespace-nowrap">Role</th>
                  <th className="px-6 py-4 whitespace-nowrap">Joined</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#D8E6E1] dark:divide-[#2a2f2d]">
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#222725]/50 transition-colors"
                  >
                    {/* User ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#6B7A75] dark:text-[#E1F5EE]">
                      {u._id.substring(u._id.length - 8)}
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#17332A] dark:text-white">
                      {u.username}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7A75] dark:text-gray-300">
                      {u.email}
                    </td>

                    {/* Role Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
                        ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400"
                            : "bg-[#E1F5EE] text-[#0F6E56] border-[#1D9E75]/30 dark:bg-[#0b1a15] dark:text-[#1D9E75]"
                        }
                      `}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#17332A] dark:text-gray-300">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
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

export default AdminUsers;
