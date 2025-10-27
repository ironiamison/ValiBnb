const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const paymentRoutes = require('./routes/payments');
const healthRoutes = require('./routes/health');
const { initializeWeb3 } = require('./services/web3Service');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting (skip for static files)
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to API endpoints only
app.use('/health', limiter);
app.use('/supported', limiter);
app.use('/verify', limiter);
app.use('/settle', limiter);

// Initialize Web3 connection
initializeWeb3();

// API Routes (specific endpoints first)
app.use('/health', healthRoutes);
app.use('/supported', paymentRoutes);
app.use('/verify', paymentRoutes);
app.use('/settle', paymentRoutes);
app.use('/api', paymentRoutes);

// Serve static files last (after API routes)
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`╔════════════════════════════════════════╗`);
  console.log(`║          ValiBNB Validator             ║`);
  console.log(`╚════════════════════════════════════════╝`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Network: ${process.env.NETWORK || 'mainnet'}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n✨ Visit http://localhost:${PORT} to see the website!`);
});

module.exports = app;
