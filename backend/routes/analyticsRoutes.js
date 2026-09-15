const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const { getAnalytics } = require('../controller/analyticsController');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', protect, admin, getAnalytics);

module.exports = router;