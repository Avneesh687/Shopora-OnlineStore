import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        // console.log("Fetched products:", data);

        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProducts();
    }
  }, [user, navigate]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="mt-16 min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-10 px-4 md:px-14 transition-colors duration-200">
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#17332A] dark:text-white">
            Manage Products
          </h1>
          <p className="text-[#6B7A75] dark:text-[#E1F5EE] mt-2">
            View, edit, or delete items from your store catalog.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:ring-offset-2 dark:focus:ring-offset-[#0b1a15] flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-[#1D9E75] text-lg font-bold animate-pulse">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-50 dark:bg-[#1a1d1c] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] p-12 text-center flex flex-col items-center gap-4">
          <p className="text-[#6B7A75] dark:text-gray-400 text-lg">
            Your inventory is empty.
          </p>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="text-[#1D9E75] font-bold hover:underline"
          >
            Add your first product
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1a1d1c] rounded-xl border border-[#D8E6E1] dark:border-[#2a2f2d] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-[#222725] text-[#6B7A75] dark:text-gray-400 text-xs sm:text-sm uppercase font-bold tracking-wider border-b border-[#D8E6E1] dark:border-[#2a2f2d]">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Product</th>
                  <th className="px-6 py-4 whitespace-nowrap">Price</th>
                  <th className="px-6 py-4 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 whitespace-nowrap">Stock</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#D8E6E1] dark:divide-[#2a2f2d]">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#222725]/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-[#17332A] dark:text-white line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs font-mono text-[#6B7A75] dark:text-gray-400 mt-0.5">
                        ID: {product._id.substring(0, 8)}...
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-[#1D9E75]">
                      ₹{product.price?.toFixed(2)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gray-100 dark:bg-[#2a2f2d] text-[#6B7A75] dark:text-[#E1F5EE] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {product.category || "General"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-500"
                            : product.stock < 5
                              ? "text-orange-500"
                              : "text-[#17332A] dark:text-white"
                        }
                      >
                        {product.stock} {product.stock === 0 ? "(Out)" : ""}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
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

export default AdminProducts;