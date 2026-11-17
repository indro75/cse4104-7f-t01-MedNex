const config = require('../config/env');

/**
 * 404 Not Found Middleware
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
    disclaimer: config.medicalDisclaimer
  });
}

/**
 * Global Error Handler Middleware
 */
function globalErrorHandler(err, req, res, next) {
  console.error(`[Error] ${err.message}`, err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
    disclaimer: config.medicalDisclaimer
  });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
