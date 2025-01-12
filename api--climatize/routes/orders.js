const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);

module.exports = router;