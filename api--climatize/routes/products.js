const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, addProduct);

module.exports = router;