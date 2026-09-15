const router = require("express").Router();
const {protect} = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productController");

const multer = require("multer");
const { storage } = require("../config/cloudnary");
const upload = multer({ storage: storage });

router.route("/")
    .get(getProduct)
    .post(protect, admin, upload.single('image'), createProduct)

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, upload.single('image'), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;    