const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../src/app');
const UserModel = require('../src/models/userModel');

describe('MedNex Backend Day 4 – Authentication REST API Endpoints', () => {
  beforeEach(() => {
    UserModel.clearMemoryStore();
  });

  const sampleUser = {
    name: 'Sazzad Hossain',
    email: 'sazzad@mednex.org',
    password: 'Password@123',
    phone: '01712345678',
    age: 28,
    gender: 'Male',
    blood_group: 'A+',
    city: 'Khulna',
    emergency_contact: '01987654321',
    allergies: ['Dust'],
    chronic_conditions: []
  };

  test('POST /api/auth/register should create account, return 201, JWT token and user profile', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(sampleUser);

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.token);
    assert.strictEqual(typeof res.body.token, 'string');
    assert.ok(res.body.user);
    assert.strictEqual(res.body.user.email, sampleUser.email);
    assert.strictEqual(res.body.user.password_hash, undefined); // Sensitive data stripped
    assert.strictEqual(res.body.user.blood_group, 'A+');
    assert.ok(res.headers['x-medical-disclaimer']);
  });

  test('POST /api/auth/register should return 400 when input validation fails', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'A',
        email: 'not-an-email',
        password: '123'
      });

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
    assert.ok(Array.isArray(res.body.errors));
    assert.ok(res.body.errors.length >= 3);
  });

  test('POST /api/auth/register should return 409 when email already exists', async () => {
    // First registration
    await request(app).post('/api/auth/register').send(sampleUser);

    // Duplicate registration attempt
    const res = await request(app).post('/api/auth/register').send(sampleUser);

    assert.strictEqual(res.status, 409);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /already exists/);
  });

  test('POST /api/auth/login should authenticate valid user and return 200 with JWT', async () => {
    // Register user first
    await request(app).post('/api/auth/register').send(sampleUser);

    // Login with correct credentials
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: sampleUser.email,
        password: sampleUser.password
      });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.token);
    assert.strictEqual(res.body.user.email, sampleUser.email);
    assert.strictEqual(res.body.user.name, sampleUser.name);
  });

  test('POST /api/auth/login should reject incorrect password with 401', async () => {
    await request(app).post('/api/auth/register').send(sampleUser);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: sampleUser.email,
        password: 'WrongPassword!123'
      });

    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /Invalid email or password/);
  });

  test('POST /api/auth/login should reject non-existent user with 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nobody@mednex.org',
        password: 'Password@123'
      });

    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.body.success, false);
  });

  test('POST /api/auth/demo-login should provide instant 1-click access with seeded demo profile', async () => {
    const res = await request(app).post('/api/auth/demo-login');

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.isDemo, true);
    assert.ok(res.body.token);
    assert.strictEqual(res.body.user.email, 'demo.patient@mednex.org');
    assert.strictEqual(res.body.user.blood_group, 'B+');
    assert.deepStrictEqual(res.body.user.allergies, ['Penicillin', 'Dust']);
  });

  test('GET /api/auth/profile should return 401 when token is missing', async () => {
    const res = await request(app).get('/api/auth/profile');

    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /missing or malformed/);
  });

  test('GET /api/auth/profile should return authenticated user details with valid token', async () => {
    const regRes = await request(app).post('/api/auth/register').send(sampleUser);
    const token = regRes.body.token;

    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.user.email, sampleUser.email);
    assert.strictEqual(res.body.user.city, 'Khulna');
    assert.deepStrictEqual(res.body.user.allergies, ['Dust']);
  });

  test('PUT /api/auth/profile should update user clinical metadata and return 200', async () => {
    const regRes = await request(app).post('/api/auth/register').send(sampleUser);
    const token = regRes.body.token;

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sazzad Hossain Chowdhury',
        blood_group: 'O+',
        allergies: ['Dust', 'Pollen', 'Sulfa Drugs'],
        chronic_conditions: ['Hypertension']
      });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.user.name, 'Sazzad Hossain Chowdhury');
    assert.strictEqual(res.body.user.blood_group, 'O+');
    assert.deepStrictEqual(res.body.user.allergies, ['Dust', 'Pollen', 'Sulfa Drugs']);
    assert.deepStrictEqual(res.body.user.chronic_conditions, ['Hypertension']);
  });

  test('POST /api/auth/logout should return 200 and success confirmation', async () => {
    const res = await request(app).post('/api/auth/logout');

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.match(res.body.message, /Logged out successfully/);
  });
});
