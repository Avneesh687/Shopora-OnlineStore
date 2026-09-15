const express = require("express");
const cors = require("cors");
const connectToMongo = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectToMongo();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRouts"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`);
});