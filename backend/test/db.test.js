const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const request = require('supertest');

const app = require('../src/app');
const { checkDbConnection, query } = require('../src/config/db');

describe('MedNex Backend Day 2 – Database & Schema Architecture', () => {
  test('checkDbConnection should gracefully return health report without crashing', async () => {
    const report = await checkDbConnection();
    assert.ok(typeof report === 'object');
    assert.ok('connected' in report);
    assert.ok('status' in report);
  });

  test('schema.sql must define all 9 required relational tables', () => {
    const schemaPath = path.join(__dirname, '../src/database/schema.sql');
    assert.ok(fs.existsSync(schemaPath), 'schema.sql must exist');

    const sql = fs.readFileSync(schemaPath, 'utf8');

    const expectedTables = [
      'users',
      'doctors',
      'hospitals',
      'ambulances',
      'appointments',
      'medicines',
      'drug_interactions',
      'bmi_logs',
      'health_activities'
    ];

    expectedTables.forEach((table) => {
      const tableRegex = new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`, 'i');
      assert.ok(tableRegex.test(sql), `schema.sql must create table: ${table}`);
    });
  });

  test('schema.sql must include performance indexes for Khulna search queries', () => {
    const schemaPath = path.join(__dirname, '../src/database/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    assert.ok(sql.includes('idx_doctors_specialty'), 'Index on doctor specialty must exist');
    assert.ok(sql.includes('idx_doctors_area'), 'Index on doctor area must exist');
    assert.ok(sql.includes('idx_medicines_brand'), 'Index on medicine brand must exist');
  });

  test('GET /api/health/db should return database diagnostics and safety disclaimer', async () => {
    const res = await request(app).get('/api/health/db');
    // Status is 200 (connected) or 503 (offline fallback mode)
    assert.ok([200, 503].includes(res.status));
    assert.ok('health' in res.body);
    assert.ok(res.headers['x-medical-disclaimer']);
  });
});
