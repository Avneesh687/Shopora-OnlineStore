const Product = require("../models/product");
const { cloudinary } = require("../config/cloudnary");

const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                message: 'Product not found.'
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        console.log(req.body);
        console.log(req.file);
        const imageUrl = {
            url: req.file.path,
            filename: req.file.filename
        };
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
        }
        if (req.file) {
            if (product.imageUrl && product.imageUrl.filename) {
                cloudinary.uploader.destroy(product.imageUrl.filename);
            }
            product.imageUrl = {
                url: req.file.path,
                filename: req.file.filename
            };
        }
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            if (product.imageUrl && product.imageUrl.filename) {
                cloudinary.uploader.destroy(product.imageUrl.filename);
            }
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Product deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Product not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProduct, getProductById, createProduct, updateProduct, deleteProduct };