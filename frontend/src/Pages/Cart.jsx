import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../Redux/cartSlice.js";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (item, qty) => {
    if (qty < 1) return; // Prevent negative or zero quantity
    dispatch(addToCart({ ...item, qty: qty }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0b1a15] py-10 px-4 md:px-14 transition-colors duration-200">
      <h2 className="text-3xl font-extrabold text-[#17332A] dark:text-white mb-8 border-b border-[#D8E6E1] dark:border-[#1e2321] pb-4">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-[#1e2321] rounded-xl border border-[#D8E6E1] dark:border-[#0F6E56]">
          <p className="text-xl text-[#6B7A75] dark:text-[#E1F5EE] mb-6">
            Your cart is currently empty.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#1D9E75] hover:bg-[#0F6E56] text-white px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D9E75]"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="flex-grow space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id || item._id} 
                className="flex flex-col sm:flex-row items-center bg-white dark:bg-[#1e2321] p-4 rounded-xl border border-[#D8E6E1] dark:border-[#0F6E56] shadow-sm gap-4"
              >
                {/* Item Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={item.imageUrl?.url || item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#17332A] dark:text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[#1D9E75] font-bold text-lg">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-center sm:items-end gap-3">
                  
                  {/* Plus / Minus Box */}
                  <div className="flex items-center border border-[#D8E6E1] dark:border-[#6B7A75] rounded-md overflow-hidden">
                    <button
                      onClick={() => handleUpdateQuantity(item, item.qty - 1)}
                      className="px-3 py-1 bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-white hover:bg-[#E1F5EE] dark:hover:bg-[#0F6E56] transition-colors focus:outline-none"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-medium text-[#17332A] dark:text-white border-l border-r border-[#D8E6E1] dark:border-[#6B7A75]">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item, item.qty + 1)}
                      className="px-3 py-1 bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-white hover:bg-[#E1F5EE] dark:hover:bg-[#0F6E56] transition-colors focus:outline-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(item.id || item._id)}
                    className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Checkout Box) */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-[#1e2321] p-6 rounded-xl border border-[#D8E6E1] dark:border-[#0F6E56] sticky top-24">
              <h3 className="text-xl font-bold text-[#17332A] dark:text-white mb-4 border-b border-[#D8E6E1] dark:border-[#6B7A75] pb-4">
                Order Summary
              </h3>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#6B7A75] dark:text-[#E1F5EE] font-medium">Subtotal</span>
                <span className="text-2xl font-extrabold text-[#17332A] dark:text-white">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:ring-offset-2 dark:focus:ring-offset-[#1e2321]"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-xs text-center text-[#6B7A75] mt-4">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;