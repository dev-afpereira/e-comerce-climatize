const request = require('supertest');
const app = require('../server'); // O servidor Express
const Product = require('../models/Product');
const { generateToken } = require('../controllers/authController'); // Função para gerar tokens para testes

describe('Product API', () => {
  let token;

  beforeAll(async () => {
    // Criação de um usuário para obter um token de autenticação
    const res = await request(app).post('/api/auth/register').send({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
    });
    token = res.body.token;
  });

  beforeEach(async () => {
    await Product.deleteMany(); // Limpar a base de dados antes de cada teste
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Product 1',
        description: 'Description for product 1',
        price: 100,
        stock: 10,
        category: 'Category 1',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'Product 1');
  });

  it('should get all products', async () => {
    await Product.create({
      name: 'Product 1',
      description: 'Description for product 1',
      price: 100,
      stock: 10,
      category: 'Category 1',
    });

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});