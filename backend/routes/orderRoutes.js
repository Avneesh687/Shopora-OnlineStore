const express = require('express');
const admin = require('../middleware/adminMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { addOrderItems, updateOrderStatus, getMyOrders, getOrders } = require('../controller/orderController');

const router = express.Router();

// All routes are protected by the 'protect' middleware
router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);
router.route('/myorders')
    .get(protect, getMyOrders);
router.route('/:id/status')
    .put(protect, admin, updateOrderStatus);

module.exports = router;