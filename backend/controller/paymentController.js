const rozerPay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
    try {
        const instance = new rozerPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const order = await instance.orders.create({
            amount: req.body.amount * 100, // Razorpay expects amount in paise
            currency: "INR",
        });
        if (!order) return res.status(500).json({ message: "Error creating order" });
        res.status(201).json({ order });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (signature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }
        res.status(200).json({ message: "Payment verified successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOrder, verifyPayment };