const express = require('express');
const config = require('../config/env');
const { checkDbConnection } = require('../config/db');
const DoctorModel = require('../models/doctorModel');
const HospitalModel = require('../models/hospitalModel');

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
    version: '1.0.0-day06',
    status: 'online',
    deploymentHub: config.deploymentHub,
    emergencyHotline: config.emergencyHotline,
    disclaimer: config.medicalDisclaimer
  });
});

/**
 * @route   GET /api/health
 * @desc    System health & diagnostics endpoint (including live DB check)
 */
router.get('/api/health', async (req, res) => {
  const dbHealth = await checkDbConnection();

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.nodeEnv,
    nodeVersion: process.version,
    services: {
      apiGateway: 'operational',
      database: dbHealth.connected ? 'connected' : dbHealth.status,
      geminiAi: config.geminiApiKey ? 'configured' : 'pending_api_key',
      emergencyDialer: 'active (999)'
    },
    databaseDetails: {
      connected: dbHealth.connected,
      engine: dbHealth.engine || 'PostgreSQL / Supabase',
      ...(dbHealth.connected ? { latencyMs: dbHealth.latencyMs } : { note: dbHealth.message })
    },
    disclaimer: config.medicalDisclaimer
  });
});

/**
 * @route   GET /api/health/db
 * @desc    Dedicated database connection status and diagnostics
 */
router.get('/api/health/db', async (req, res) => {
  const dbHealth = await checkDbConnection();
  res.status(dbHealth.connected ? 200 : 503).json({
    success: dbHealth.connected,
    health: dbHealth,
    disclaimer: config.medicalDisclaimer
  });
});

/**
 * @route   GET /api/health/seed-status
 * @desc    Inspect Khulna verified registry coverage
 */
router.get('/api/health/seed-status', async (req, res) => {
  const totalDoctors = await DoctorModel.countDoctors();
  const totalHospitals = await HospitalModel.countHospitals();
  const specialties = await DoctorModel.getAllSpecialties();
  const areas = await DoctorModel.getAllAreas();

  res.json({
    success: true,
    registry: {
      deploymentHub: config.deploymentHub,
      totalHospitals,
      totalDoctors,
      specialtiesCount: specialties.length,
      specialties,
      areasCovered: areas
    },
    disclaimer: config.medicalDisclaimer
  });
});

module.exports = router;
