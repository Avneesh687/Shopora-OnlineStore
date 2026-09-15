import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] transition-colors duration-200 pt-16 pb-16">
      
      {/* Hero Section */}
      <div className="bg-[#E1F5EE] dark:bg-[#17332A] mx-4 md:mx-14 mt-8 mb-12 p-10 md:p-16 rounded-2xl text-center flex flex-col items-center justify-center transition-colors duration-200">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#17332A] dark:text-white mb-4">
          Welcome to Shopora
        </h1>
        <p className="text-[#0F6E56] dark:text-[#E1F5EE] text-lg md:text-xl max-w-2xl">
          Your one-stop destination for all your shopping needs.
        </p>
      </div>

      {/* Featured Products Section */}
      <div className="px-4 md:px-14">
        <h2 className="text-2xl font-bold text-[#17332A] dark:text-white mb-8 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-4">
          Featured Products
        </h2>

        {loading ? (
          // Professional Loading State
          <div className="flex justify-center items-center h-48">
            <p className="text-[#1D9E75] text-lg font-bold animate-pulse">
              Loading products...
            </p>
          </div>
        ) : (
          // Responsive Grid Layout matching the card design
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product._id || product.id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Home;