const Order = require('../models/order');
// const sendEmail = require('../utils/sendEmail');

const addOrderItems = async (req, res) => {
    try {
        console.log("1. Controller reached");
        const { items, totalAmount, address } = req.body;
        console.log("2. Data:", {
            items,
            totalAmount,
            address
        });
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        const order = new Order({
            userId: req.user._id,
            items,
            totalAmount,
            address,
            status: "Pending"
        });
        console.log("3. Saving order");
        await order.save();
        console.log("4. Order saved:", order._id);

        // TEMPORARILY COMMENT THIS
        // sendEmail({
        //     to: req.user.email,
        //     subject: "Order Confirmation",
        //     text: message
        // });
        
        console.log("5. Sending response");
        return res.status(201).json({
            message: "Order created successfully",
            order
        });
    } catch (error) {
        console.error("ORDER ERROR:", error);
        return res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        } else {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.status(200).json({ message: "Order status updated", order: updatedOrder });
        }

    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('items.productId', 'name price');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'id name');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

module.exports = { addOrderItems, updateOrderStatus, getMyOrders, getOrders };