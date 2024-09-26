const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registro
router.post('/register', authController.register);

// Rota para login (exemplo adicional, ajuste conforme necessário)
router.post('/login', authController.login);

module.exports = router;