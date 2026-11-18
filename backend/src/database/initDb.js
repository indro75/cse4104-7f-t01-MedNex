const fs = require('fs');
const path = require('path');
const { pool, checkDbConnection } = require('../config/db');

async function initializeDatabase() {
  console.log('='.repeat(70));
  console.log('📦 MedNex Database Initializer – PostgreSQL / Supabase Schema');
  console.log('='.repeat(70));

  const health = await checkDbConnection();
  if (!health.connected) {
    console.error('❌ Database connection failed:');
    console.error(`   ${health.message}`);
    console.log('\n💡 Setup Instructions:');
    console.log('   1. Create a Supabase project at https://supabase.com or run local PostgreSQL.');
    console.log('   2. Add your connection string in backend/.env:');
    console.log('      DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres');
    console.log('   3. Run this command again: npm run db:init\n');
    process.exit(1);
  }

  console.log(`✅ Connected to database: "${health.database}" (${health.latencyMs}ms latency)`);

  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  try {
    console.log('⏳ Executing schema.sql to create 9 relational tables & indexes...');
    await pool.query(sql);

    // Verify created tables
    const checkTablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    const res = await pool.query(checkTablesQuery);
    const tableNames = res.rows.map((r) => r.table_name);

    console.log(`🎉 Schema successfully initialized! Created / verified ${tableNames.length} tables:`);
    tableNames.forEach((name, i) => {
      console.log(`   ${i + 1}. ${name}`);
    });
    console.log('='.repeat(70));
    process.exit(0);
  } catch (err) {
    console.error('❌ Error executing schema.sql:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
