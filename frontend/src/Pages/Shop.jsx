import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="pt-24 pb-16  min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-10 px-4 md:px-14 transition-colors duration-200">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-6">
        <h1 className="text-3xl font-extrabold text-[#17332A] dark:text-white">
          All Products
        </h1>

        {/* Modern Search Bar */}
        <div className="relative w-full md:w-96">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-[#6B7A75]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#1e2321] border border-[#D8E6E1] dark:border-[#0F6E56] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] text-[#17332A] dark:text-white placeholder-[#6B7A75] transition-colors"
          />
        </div>
      </div>

      {loading ? (
        // Loading State
        <div className="flex justify-center items-center h-64">
          <p className="text-[#1D9E75] text-xl font-bold animate-pulse">
            Loading products...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        // Empty Search State
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-xl text-[#6B7A75] dark:text-[#E1F5EE]">
            No products found matching "{search}".
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 text-[#1D9E75] font-medium hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        // Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
