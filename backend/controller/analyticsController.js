const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');


const getAnalytics = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        const orders = await Order.find({});
        const revenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.json({
            totalOrders,
            totalProducts,
            totalUsers,
            revenue
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAnalytics };