import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import { clearCart } from "../Redux/cartSlice.js";

const CheackOut = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0,
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          qty: item.qty,
          price: item.price,
        })),

        totalAmount: totalPrice,

        address: {
          fullName: formData.fullName,
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: "India",
        },
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("Order placed successfully:", data);

      dispatch(clearCart());

      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message || "There was an error placing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] flex flex-col justify-center items-center pt-24 px-4 text-center">
        <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-10 max-w-md shadow-sm">
          <div className="text-4xl mb-3">🛒</div>
          <h2 className="text-2xl font-bold text-[#17332A] dark:text-white mb-2">
            No Items to Checkout
          </h2>
          <p className="text-[#6B7A75] dark:text-[#E1F5EE] text-sm mb-6">
            Please add some products to your cart before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-flex px-6 py-2.5 bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-semibold rounded-lg shadow-sm transition-all"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-gray-100 transition-colors duration-200 pt-24 pb-16 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-8 border-b border-[#D8E6E1] dark:border-[#2b3b35] pb-4">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
            {/* Shipping Information Card */}
            <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-6 md:p-8 shadow-soft">
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-5 flex items-center gap-2">
                <span>📍</span> Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#17332A] dark:text-gray-200 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] bg-gray-50 dark:bg-[#17332A] text-[#17332A] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1D9E75] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#17332A] dark:text-gray-200 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] bg-gray-50 dark:bg-[#17332A] text-[#17332A] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1D9E75] focus:outline-none text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#17332A] dark:text-gray-200 mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apartment 4B"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] bg-gray-50 dark:bg-[#17332A] text-[#17332A] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1D9E75] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#17332A] dark:text-gray-200 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] bg-gray-50 dark:bg-[#17332A] text-[#17332A] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1D9E75] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#17332A] dark:text-gray-200 mb-1.5">
                    Postal Code / PIN
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] bg-gray-50 dark:bg-[#17332A] text-[#17332A] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1D9E75] focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-6 md:p-8 shadow-soft">
              <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-5 flex items-center gap-2">
                <span>💳</span> Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#17332A] transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="text-[#1D9E75] focus:ring-[#1D9E75]"
                    />
                    <span className="font-semibold text-sm">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                    Recommended
                  </span>
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-[#D8E6E1] dark:border-[#2b3b35] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#17332A] transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className="text-[#1D9E75] focus:ring-[#1D9E75]"
                    />
                    <span className="font-semibold text-sm">
                      UPI / QR Payment
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Google Pay, PhonePe, Paytm
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-[#1D9E75] text-center cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Processing Order..."
                : `Place Order (₹${totalPrice.toFixed(2)})`}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-6 shadow-soft sticky top-24">
            <h2 className="text-xl font-bold text-[#17332A] dark:text-white border-b border-[#D8E6E1] dark:border-[#2b3b35] pb-4 mb-4">
              Order Summary ({cartItems.length})
            </h2>

            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1D9E75]">
                      {item.qty}x
                    </span>
                    <span className="truncate max-w-[140px] text-[#17332A] dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-[#17332A] dark:text-white">
                    ₹{((item.price || 0) * (item.qty || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-sm border-t border-[#D8E6E1] dark:border-[#2b3b35] pt-4">
              <div className="flex justify-between text-[#6B7A75] dark:text-[#E1F5EE]">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B7A75] dark:text-[#E1F5EE]">
                <span>Delivery</span>
                <span className="text-[#1D9E75] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-[#17332A] dark:text-white pt-2 border-t border-[#D8E6E1] dark:border-[#2b3b35]">
                <span>Total Amount</span>
                <span className="text-lg text-[#1D9E75]">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheackOut;
