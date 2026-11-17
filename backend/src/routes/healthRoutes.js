const express = require('express');
const config = require('../config/env');

const router = express.Router();

/**
 * @route   GET /
 * @desc    Root API endpoint
 */
router.get('/', (req, res) => {
  res.json({
    platform: 'MedNex API',
    tagline: 'Understand Your Symptoms. Find the Right Care.',
    course: 'CSE 4104 – Software Development III',
    team: 'CSE4104-7F-T01',
    backendLead: 'Indrojit Sana (11230321391)',
    version: '1.0.0-day01',
    status: 'online',
    deploymentHub: config.deploymentHub,
    emergencyHotline: config.emergencyHotline,
    disclaimer: config.medicalDisclaimer
  });
});

/**
 * @route   GET /api/health
 * @desc    System health & diagnostics endpoint
 */
router.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.nodeEnv,
    nodeVersion: process.version,
    services: {
      apiGateway: 'operational',
      database: 'scaffolded',
      geminiAi: config.geminiApiKey ? 'configured' : 'pending_api_key',
      emergencyDialer: 'active (999)'
    },
    disclaimer: config.medicalDisclaimer
  });
});

module.exports = router;
