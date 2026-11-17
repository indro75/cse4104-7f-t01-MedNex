const app = require('./src/app');
const config = require('./src/config/env');

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log('='.repeat(70));
  console.log('🏥 MedNex – AI-Powered Healthcare Assistance & Doctor Recommendation');
  console.log('   Tagline: "Understand Your Symptoms. Find the Right Care."');
  console.log('   Course: CSE 4104 – Software Development III | Section: 7F');
  console.log('   Team: CSE4104-7F-T01 | Backend Lead: Indrojit Sana (11230321391)');
  console.log(`   Regional Hub: ${config.deploymentHub}`);
  console.log('='.repeat(70));
  console.log(` • Server listening on  : http://localhost:${PORT}`);
  console.log(` • Health Check Endpoint: http://localhost:${PORT}/api/health`);
  console.log(` • Emergency Helpline   : ${config.emergencyHotline} (National Emergency)`);
  console.log(` • Clinical Tenet       : ${config.medicalDisclaimer}`);
  console.log('='.repeat(70));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received: Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});
