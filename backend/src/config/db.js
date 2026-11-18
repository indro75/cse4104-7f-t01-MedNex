const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
const config = require('./env');

/**
 * PostgreSQL Connection Pool Configuration
 * Supports direct PostgreSQL connections, Supabase Transaction / Session poolers.
 */
let pool = null;

if (config.databaseUrl) {
  try {
    pool = new Pool({
      connectionString: config.databaseUrl,
      ssl:
        config.nodeEnv === 'production' || config.databaseUrl.includes('supabase')
          ? { rejectUnauthorized: false }
          : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });

    pool.on('error', (err) => {
      console.error('[DB Pool Error] Unexpected idle client error:', err.message);
    });
  } catch (err) {
    console.warn('[DB Pool Warning] Could not instantiate pool:', err.message);
  }
}

/**
 * Supabase Client (Optional direct REST / Auth / Storage client)
 */
let supabase = null;
if (config.supabaseUrl && config.supabaseAnonKey && !config.supabaseUrl.includes('your-project')) {
  try {
    supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
  } catch (err) {
    console.warn('[Supabase Client Warning] Could not instantiate Supabase client:', err.message);
  }
}

/**
 * Test & verify active database connectivity
 * Returns detailed health metrics without throwing unhandled exceptions.
 */
async function checkDbConnection() {
  if (!pool) {
    return {
      connected: false,
      status: 'unconfigured',
      message: 'DATABASE_URL is not configured in .env',
      mode: 'offline_fallback'
    };
  }

  const start = Date.now();
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, current_database() as db_name, version() as version');
    client.release();
    const latencyMs = Date.now() - start;

    return {
      connected: true,
      status: 'operational',
      database: result.rows[0].db_name,
      timestamp: result.rows[0].current_time,
      latencyMs,
      engine: 'PostgreSQL'
    };
  } catch (err) {
    return {
      connected: false,
      status: 'disconnected',
      message: err.message,
      mode: 'offline_fallback',
      help: 'Ensure PostgreSQL / Supabase server is running and DATABASE_URL in .env is valid.'
    };
  }
}

/**
 * Safe SQL Query Executor
 * @param {string} text - SQL statement
 * @param {Array} params - Query parameters
 */
async function query(text, params) {
  if (!pool) {
    throw new Error('Database pool is not initialized. Please configure DATABASE_URL in .env');
  }

  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (config.nodeEnv === 'development') {
      console.log(`[SQL Query] Executed in ${duration}ms | rows: ${res.rowCount}`);
    }
    return res;
  } catch (err) {
    console.error(`[SQL Error] ${err.message} | Query: ${text}`);
    throw err;
  }
}

module.exports = {
  pool,
  supabase,
  query,
  checkDbConnection
};
