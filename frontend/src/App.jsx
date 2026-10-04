import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ProductDetail from "./Pages/ProductDetail";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import About from "./Pages/About";
import ReturnPolicy from "./Pages/ReturnPolicy";
import Disclaimer from "./Pages/Disclaimer";
import Checkout from "./Pages/CheackOut";
import OrderSuccess from "./Pages/OrderSuccess";
import Profile from "./Pages/Profile";
import AddProduct from "./Admin/AddProduct";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminOrders from "./Admin/AdminOrders";
import AdminUsers from "./Admin/AdminUsers";
import AdminProducts from "./Admin/AdminProducts";
import EditProduct from "./Admin/EditProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
