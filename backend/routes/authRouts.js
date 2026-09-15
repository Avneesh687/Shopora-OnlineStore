const router = require("express").Router();
const { resgisterUser, loginUser, getUser } = require("../controller/authController");
const {protect} = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/register", resgisterUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUser);

module.exports = router;