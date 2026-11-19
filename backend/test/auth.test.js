const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');

const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  sanitizeUser
} = require('../src/utils/security');

const {
  validateRegisterInput,
  validateLoginInput,
  validateProfileUpdate
} = require('../src/utils/validators');

const UserModel = require('../src/models/userModel');
const { authenticate, optionalAuth } = require('../src/middlewares/authMiddleware');

describe('MedNex Backend Day 3 – User Model & Auth Security', () => {
  beforeEach(() => {
    UserModel.clearMemoryStore();
  });

  describe('Password Security Utilities', () => {
    test('hashPassword should generate a secure bcrypt hash', async () => {
      const password = 'SecretPassword123';
      const hash = await hashPassword(password);

      assert.ok(hash);
      assert.notStrictEqual(hash, password);
      assert.ok(hash.startsWith('$2')); // bcrypt identifier
    });

    test('comparePassword should return true for correct password and false for wrong', async () => {
      const password = 'PatientSecurePass#1';
      const hash = await hashPassword(password);

      const isMatch = await comparePassword(password, hash);
      assert.strictEqual(isMatch, true);

      const isWrong = await comparePassword('WrongPassword!', hash);
      assert.strictEqual(isWrong, false);
    });

    test('hashPassword should throw on empty input', async () => {
      await assert.rejects(async () => {
        await hashPassword('');
      }, /Password must be a non-empty string/);
    });
  });

  describe('JWT Token Utilities', () => {
    test('generateToken and verifyToken should sign and decode payload', () => {
      const payload = { id: 'usr-12345', email: 'patient@mednex.org', role: 'patient' };
      const token = generateToken(payload);

      assert.ok(token);
      assert.strictEqual(typeof token, 'string');

      const decoded = verifyToken(token);
      assert.strictEqual(decoded.id, payload.id);
      assert.strictEqual(decoded.email, payload.email);
      assert.strictEqual(decoded.role, payload.role);
      assert.ok(decoded.exp);
    });

    test('verifyToken should reject invalid/tampered tokens', () => {
      assert.throws(() => {
        verifyToken('invalid.token.string');
      });
    });

    test('sanitizeUser should strip password_hash', () => {
      const rawUser = {
        id: 'usr-1',
        name: 'Indrojit Sana',
        email: 'indro@mednex.org',
        password_hash: '$2a$10$xyz...',
        blood_group: 'B+',
        city: 'Khulna'
      };

      const safe = sanitizeUser(rawUser);
      assert.strictEqual(safe.id, rawUser.id);
      assert.strictEqual(safe.name, rawUser.name);
      assert.strictEqual(safe.email, rawUser.email);
      assert.strictEqual(safe.password_hash, undefined);
    });
  });

  describe('Input Validators', () => {
    test('validateRegisterInput should validate name, email, and password length', () => {
      // Valid input
      const valid = validateRegisterInput({
        name: 'Rahim Khan',
        email: 'rahim@example.com',
        password: 'password123',
        blood_group: 'O+'
      });
      assert.strictEqual(valid.isValid, true);
      assert.strictEqual(valid.errors.length, 0);

      // Invalid input
      const invalid = validateRegisterInput({
        name: 'A',
        email: 'invalid-email',
        password: '123',
        blood_group: 'INVALID'
      });
      assert.strictEqual(invalid.isValid, false);
      assert.strictEqual(invalid.errors.length, 4);
    });

    test('validateLoginInput should validate required credentials', () => {
      const valid = validateLoginInput({
        email: 'user@mednex.org',
        password: 'securePassword'
      });
      assert.strictEqual(valid.isValid, true);

      const invalid = validateLoginInput({});
      assert.strictEqual(invalid.isValid, false);
      assert.strictEqual(invalid.errors.length, 2);
    });
  });

  describe('UserModel Operations', () => {
    test('createUser should persist user and findUserByEmail should retrieve it', async () => {
      const passwordHash = await hashPassword('password123');
      const newUser = await UserModel.createUser({
        name: 'Tanvir Hossain',
        email: 'tanvir@khulna.org',
        password_hash: passwordHash,
        blood_group: 'A+',
        city: 'Khulna',
        allergies: ['Penicillin'],
        chronic_conditions: ['Hypertension']
      });

      assert.ok(newUser.id);
      assert.strictEqual(newUser.name, 'Tanvir Hossain');
      assert.strictEqual(newUser.email, 'tanvir@khulna.org');
      assert.deepStrictEqual(newUser.allergies, ['Penicillin']);

      // Case-insensitive lookup
      const found = await UserModel.findUserByEmail('TANVIR@KHULNA.ORG');
      assert.ok(found);
      assert.strictEqual(found.id, newUser.id);
    });

    test('createUser should reject duplicate email address', async () => {
      const hash = await hashPassword('pass123');
      await UserModel.createUser({
        name: 'User One',
        email: 'duplicate@mednex.org',
        password_hash: hash
      });

      await assert.rejects(async () => {
        await UserModel.createUser({
          name: 'User Two',
          email: 'duplicate@mednex.org',
          password_hash: hash
        });
      }, /already exists/);
    });

    test('updateUserProfile should update allowed clinical fields', async () => {
      const hash = await hashPassword('pass123');
      const user = await UserModel.createUser({
        name: 'Initial Name',
        email: 'update@mednex.org',
        password_hash: hash
      });

      const updated = await UserModel.updateUserProfile(user.id, {
        name: 'Updated Name',
        blood_group: 'AB+',
        allergies: ['Dust', 'Pollen']
      });

      assert.strictEqual(updated.name, 'Updated Name');
      assert.strictEqual(updated.blood_group, 'AB+');
      assert.deepStrictEqual(updated.allergies, ['Dust', 'Pollen']);
    });
  });

  describe('Authentication Middleware', () => {
    test('authenticate should block requests without Authorization header', async () => {
      const req = { headers: {} };
      let statusCode = null;
      let jsonBody = null;
      const res = {
        status: (code) => {
          statusCode = code;
          return {
            json: (body) => {
              jsonBody = body;
            }
          };
        }
      };
      let nextCalled = false;

      await authenticate(req, res, () => {
        nextCalled = true;
      });

      assert.strictEqual(nextCalled, false);
      assert.strictEqual(statusCode, 401);
      assert.strictEqual(jsonBody.success, false);
      assert.match(jsonBody.message, /missing or malformed/);
    });

    test('authenticate should verify valid Bearer token and attach req.user', async () => {
      const hash = await hashPassword('pass123');
      const user = await UserModel.createUser({
        name: 'Verified Patient',
        email: 'verified@mednex.org',
        password_hash: hash
      });

      const token = generateToken({ id: user.id, email: user.email });

      const req = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      const res = {};
      let nextCalled = false;

      await authenticate(req, res, () => {
        nextCalled = true;
      });

      assert.strictEqual(nextCalled, true);
      assert.ok(req.user);
      assert.strictEqual(req.user.id, user.id);
      assert.strictEqual(req.user.email, user.email);
      assert.strictEqual(req.user.password_hash, undefined); // Sanitized
    });

    test('optionalAuth should set req.user to null when header is absent', async () => {
      const req = { headers: {} };
      let nextCalled = false;

      await optionalAuth(req, {}, () => {
        nextCalled = true;
      });

      assert.strictEqual(nextCalled, true);
      assert.strictEqual(req.user, null);
    });
  });
});
