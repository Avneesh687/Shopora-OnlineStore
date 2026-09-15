import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Fixed typo from 'nevigate'

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Defined the missing CSS class variables for consistent styling
  const labelClass =
    "block text-sm font-semibold text-[#17332A] dark:text-[#E1F5EE] mb-2";
  const inputClass =
    "w-full bg-gray-50 dark:bg-[#17332A] border border-[#D8E6E1] dark:border-[#2b3b35] rounded-xl px-4 py-3 text-[#17332A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1D9E75] transition-colors";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    // Fixed: Added logic to actually send the image if a new one is selected
    if (image) {
      data.append("image", image);
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      if (response.ok) {
        navigate("/admin/products");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1a15] text-[#17332A] dark:text-gray-100 transition-colors duration-200 pt-24 pb-16 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#17332A] dark:text-white mb-8 border-b border-[#D8E6E1] dark:border-[#2b3b35] pb-4">
          Edit Product
        </h1>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#1e2321] rounded-2xl border border-[#D8E6E1] dark:border-[#2b3b35] p-6 md:p-8 shadow-soft">
            <h2 className="text-xl font-bold text-[#17332A] dark:text-white mb-6 flex items-center gap-2">
              <span>📦</span>
              Product Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className={labelClass}>
                  Product Name
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>

                <input
                  type="text"
                  id="category"
                  placeholder="e.g. Electronics"
                  className={inputClass}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className={labelClass}>
                  Price
                </label>

                <input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  min="0"
                  className={inputClass}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className={labelClass}>
                  Stock Quantity
                </label>

                <input
                  type="number"
                  id="stock"
                  placeholder="Enter stock quantity"
                  min="0"
                  className={inputClass}
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Enter product description"
                  rows="5"
                  className={`${inputClass} resize-none`}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label htmlFor="image" className={labelClass}>
                  Product Image (Optional)
                </label>

                <div className="border border-dashed border-[#D8E6E1] dark:border-[#2b3b35] rounded-xl p-5 bg-gray-50 dark:bg-[#17332A]">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="w-full text-sm text-[#6B7A75] dark:text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:bg-[#1D9E75] file:text-white
                    file:font-semibold
                    hover:file:bg-[#0F6E56]
                    file:cursor-pointer"
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  {image && (
                    <p className="mt-3 text-xs text-[#1D9E75] font-semibold">
                      Selected: {image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-7 py-4 px-6 bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-[#1D9E75] focus:outline-none text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving Product..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
