import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const HandleCart = () => {
    if (product.stock > 0) {
      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl.url,
          qty: 1,
        }),
      );
      // Optional: Redirect to cart after adding or show a toast notification
      alert("Product added to cart!");
    } else {
      alert("Product is out of stock and cannot be added to the cart.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#FFFFFF] dark:bg-[#0b1a15]">
        <p className="text-[#1D9E75] text-xl font-bold animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className=" mt-16 min-h-screen flex flex-col justify-center items-center bg-[#FFFFFF] dark:bg-[#0b1a15] gap-4">
        <p className="text-xl text-[#17332A] dark:text-white font-medium">
          Product not found.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#1D9E75] hover:bg-[#0F6E56] text-white px-6 py-2 rounded-lg transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-12 px-4 md:px-14 transition-colors duration-200">
      {/* Breadcrumb / Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-[#6B7A75] hover:text-[#1D9E75] font-medium mb-8 flex items-center gap-2 focus:outline-none"
      >
        <span>←</span> Back
      </button>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 flex-shrink-0 bg-gray-50 dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#0F6E56] overflow-hidden relative h-[400px] md:h-[500px]">
          <img
            src={product.imageUrl.url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Product Information Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Category Tag */}
          {product.category && (
            <span className="inline-block bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 w-max">
              {product.category}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-black text-[#1D9E75] mb-6">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="border-t border-b border-[#D8E6E1] dark:border-[#1e2321] py-6 mb-8">
            <h3 className="text-[#17332A] dark:text-white font-bold mb-2">
              Description
            </h3>
            <p className="text-[#6B7A75] dark:text-[#E1F5EE] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-4">
            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm font-medium">
              {product.stock > 0 ? (
                <>
                  <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-[#17332A] dark:text-white">
                    In Stock{" "}
                    <span className="text-[#6B7A75]">
                      ({product.stock} units available)
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span className="flex h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="text-red-500">Temporarily Out of Stock</span>
                </>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={HandleCart}
              disabled={product.stock <= 0}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  product.stock > 0
                    ? "bg-[#1D9E75] hover:bg-[#0F6E56] text-white focus:ring-[#1D9E75] dark:focus:ring-offset-[#0b1a15] shadow-lg hover:shadow-xl"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
