import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Backend data fallback
  const productId = product._id || product.id;

  return (
    <div className="flex flex-col bg-[#FFFFFF] dark:bg-[#1e2321] rounded-xl overflow-hidden border border-[#D8E6E1] dark:border-transparent shadow-sm">

      {/* Product Image Container */}
      
      <div className="w-full h-48 sm:h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.imageUrl?.url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details Section */}

      <div className="p-4 flex flex-col flex-grow">

        {/* Title (Truncated to exactly 1 line like the image) */}

        <h3 className="text-[#17332A] dark:text-white font-bold text-base truncate mb-1">
          {product.name}
        </h3>

        {/* Price */}

        <p className="text-[#1D9E75] font-bold text-lg mb-4">
          ₹{product.price}
        </p>

        {/* View Details Button */}

        <div className="mt-auto">
          <Link
            to={`/product/${productId}`}
            className="block w-full text-center bg-[#1D9E75] hover:bg-[#0F6E56] text-white py-2.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:ring-offset-2 dark:focus:ring-offset-[#1e2321]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
