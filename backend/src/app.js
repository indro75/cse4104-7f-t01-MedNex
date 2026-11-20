const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const safetyHeaders = require('./middlewares/safetyHeaders');
const { notFoundHandler, globalErrorHandler } = require('./middlewares/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// 1. Security HTTP Headers
app.use(helmet());

// 2. Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// 3. Request Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. HTTP Request Logger
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// 5. Persistent Healthcare Safety Headers
app.use(safetyHeaders);

// 6. Mount Core Routes
app.use(healthRoutes);
app.use('/api/auth', authRoutes);

// 7. Error Handling Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
