const request = require('supertest');
const app = require('../server'); // O servidor Express
const User = require('../models/User');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany(); // Limpar a base de dados antes de cada teste
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'John Doe');
    expect(res.body).toHaveProperty('email', 'john@example.com');
  });

  it('should login an existing user', async () => {
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'John Doe');
    expect(res.body).toHaveProperty('email', 'john@example.com');
  });
});