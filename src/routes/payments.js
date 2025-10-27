const express = require('express');
const router = express.Router();
const { verifyPayment, settlePayment } = require('../services/paymentService');

// GET /supported - List supported payment kinds
router.get('/supported', (req, res) => {
  res.json({
    supported: ['exact'],
    description: 'Currently supports exact payment verification on BNB/BSC'
  });
});

// POST /verify - Verify a payment
router.post('/verify', async (req, res) => {
  try {
    const { 
      transactionHash, 
      fromAddress, 
      toAddress, 
      expectedAmount, 
      currency = 'BNB' 
    } = req.body;

    if (!transactionHash) {
      return res.status(400).json({
        error: 'Missing required field: transactionHash'
      });
    }

    if (!fromAddress || !toAddress) {
      return res.status(400).json({
        error: 'Missing required fields: fromAddress and toAddress'
      });
    }

    if (expectedAmount === undefined || expectedAmount === null) {
      return res.status(400).json({
        error: 'Missing required field: expectedAmount'
      });
    }

    const result = await verifyPayment({
      transactionHash,
      fromAddress,
      toAddress,
      expectedAmount,
      currency
    });

    if (result.valid) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      valid: false,
      error: error.message
    });
  }
});

// POST /settle - Settle a payment
router.post('/settle', async (req, res) => {
  try {
    const {
      transactionHash,
      recipientAddress,
      amount,
      currency = 'BNB'
    } = req.body;

    if (!transactionHash) {
      return res.status(400).json({
        error: 'Missing required field: transactionHash'
      });
    }

    if (!recipientAddress) {
      return res.status(400).json({
        error: 'Missing required field: recipientAddress'
      });
    }

    if (amount === undefined || amount === null) {
      return res.status(400).json({
        error: 'Missing required field: amount'
      });
    }

    const result = await settlePayment({
      transactionHash,
      recipientAddress,
      amount,
      currency
    });

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Settlement error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Root endpoint
router.get('/', (req, res) => {
  res.json({
    service: 'ValiBNB',
    description: 'Community-driven payment verification for Binance Smart Chain',
    version: '1.0.0',
    network: process.env.NETWORK || 'mainnet',
    endpoints: {
      'GET /health': 'Health check',
      'GET /supported': 'List supported payment kinds',
      'POST /verify': 'Verify a payment',
      'POST /settle': 'Settle a payment'
    }
  });
});

module.exports = router;

