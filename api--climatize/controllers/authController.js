const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
  }
};

// Exemplo de função adicional para login
exports.login = async (req, res) => {
  // Implementação do login
};