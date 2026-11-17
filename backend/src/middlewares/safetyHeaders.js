const config = require('../config/env');

/**
 * Middleware that appends mandatory healthcare safety disclaimers
 * and security headers to every outgoing HTTP response.
 */
function safetyHeaders(req, res, next) {
  res.setHeader('X-Medical-Disclaimer', config.medicalDisclaimer);
  res.setHeader('X-Deployment-Hub', config.deploymentHub);
  res.setHeader('X-Emergency-Hotline', config.emergencyHotline);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
}

module.exports = safetyHeaders;
