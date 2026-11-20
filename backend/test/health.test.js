const { test, describe } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../src/app');

describe('MedNex Backend Day 1 – Foundation & Health Checks', () => {
  test('GET / should return platform information and medical disclaimer', async () => {
    const res = await request(app).get('/');
    assert.strictEqual(res.status, 200);

    // Verify safety disclaimer header
    const disclaimerHeader = res.headers['x-medical-disclaimer'];
    assert.ok(disclaimerHeader, 'X-Medical-Disclaimer header must be present');
    assert.match(disclaimerHeader, /initial assistance/);

    assert.strictEqual(res.body.platform, 'MedNex API');
    assert.strictEqual(res.body.status, 'online');
    assert.strictEqual(res.body.version, '1.0.0-day04');
    assert.strictEqual(res.body.team, 'CSE4104-7F-T01');
    assert.strictEqual(res.body.backendLead, 'Indrojit Sana (11230321391)');
  });

  test('GET /api/health should report healthy system status', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.status, 200);

    assert.strictEqual(res.body.status, 'healthy');
    assert.ok(res.body.timestamp);
    assert.strictEqual(res.body.services.apiGateway, 'operational');
  });

  test('GET /unknown-route should return 404 JSON response', async () => {
    const res = await request(app).get('/non-existent-route');
    assert.strictEqual(res.status, 404);

    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /Resource not found/);
  });
});
