const { verifyToken, sanitizeUser } = require('../utils/security');
const UserModel = require('../models/userModel');
const config = require('../config/env');

/**
 * Strict Authentication Middleware
 * Requires a valid Bearer JWT in Authorization header
 */
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token is missing or malformed.',
      disclaimer: config.medicalDisclaimer
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this session token no longer exists.',
        disclaimer: config.medicalDisclaimer
      });
    }

    // Attach sanitized user to request
    req.user = sanitizeUser(user);
    req.token = token;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
        expired: true,
        disclaimer: config.medicalDisclaimer
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.',
      disclaimer: config.medicalDisclaimer
    });
  }
}

/**
 * Optional Authentication Middleware
 * Extracts user if token is present, but allows guest access if absent
 */
async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findUserById(decoded.id);
    req.user = user ? sanitizeUser(user) : null;
  } catch {
    req.user = null;
  }

  next();
}

module.exports = {
  authenticate,
  optionalAuth
};
