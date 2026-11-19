const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

const SALT_ROUNDS = 10;

/**
 * Hash a plain-text password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare plain-text password with stored hash
 * @param {string} plainPassword - User entered password
 * @param {string} hashedPassword - Stored hash
 * @returns {Promise<boolean>} Match result
 */
async function comparePassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) {
    return false;
  }
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Generate a signed JWT token
 * @param {Object} payload - Data to embed in the token (e.g. { id, email, name })
 * @param {string} [expiresIn] - Token expiration duration (default from config)
 * @returns {string} Signed JWT token
 */
function generateToken(payload, expiresIn = config.jwtExpiresIn) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token string
 * @returns {Object} Decoded payload
 */
function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

/**
 * Strip sensitive fields (like password_hash) from user object
 * @param {Object} user - User record
 * @returns {Object} Sanitized user profile
 */
function sanitizeUser(user) {
  if (!user) return null;
  const { password_hash, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  sanitizeUser
};
