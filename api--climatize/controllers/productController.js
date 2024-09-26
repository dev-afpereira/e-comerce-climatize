const Product = require('../models/Product');

// Obter todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

// Adicionar novo produto (somente admin)
exports.addProduct = async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;

  try {
    const product = new Product({ name, description, price, stock, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar produto' });
  }
};