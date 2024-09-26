const Order = require('../models/Order');

// Criar um pedido
exports.createOrder = async (req, res) => {
  const { products, totalPrice } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
};

// Obter pedidos do usuário
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
};