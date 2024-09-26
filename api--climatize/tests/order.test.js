const request = require('supertest');
const app = require('../server'); // O servidor Express
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

describe('Order API', () => {
  let token;
  let productId;
  let userId;

  beforeAll(async () => {
    // Criação de um usuário para obter um token de autenticação
    const userRes = await request(app).post('/api/auth/register').send({
      name: 'Customer User',
      email: 'customer@example.com',
      password: 'password123',
    });
    token = userRes.body.token;
    userId = userRes.body._id;

    // Criação de um produto
    const productRes = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Product 1',
        description: 'Description for product 1',
        price: 100,
        stock: 10,
        category: 'Category 1',
      });
    productId = productRes.body._id;
  });

  beforeEach(async () => {
    await Order.deleteMany(); // Limpar a base de dados antes de cada teste
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        products: [{ product: productId, quantity: 1 }],
        totalPrice: 100,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('totalPrice', 100);
  });

  it('should get user orders', async () => {
    await Order.create({
      user: userId,
      products: [{ product: productId, quantity: 1 }],
      totalPrice: 100,
    });

    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});