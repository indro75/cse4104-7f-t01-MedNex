const path = require('path');
const dotenv = require('dotenv');

// Load .env file from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  deploymentHub: process.env.DEPLOYMENT_HUB || 'Khulna Division, Bangladesh',
  emergencyHotline: process.env.EMERGENCY_HOTLINE || '999',
  medicalDisclaimer:
    process.env.MEDICAL_DISCLAIMER ||
    'MedNex serves as an initial assistance and informational tool. It does not replace professional medical consultation, provide clinical diagnoses, or prescribe medication.',
  databaseUrl: process.env.DATABASE_URL || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  geminiApiKey: process.env.GEMINI_API_KEY || ''
};

module.exports = config;
