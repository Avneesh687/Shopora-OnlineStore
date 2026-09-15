const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
module.exports = connectToMongo;