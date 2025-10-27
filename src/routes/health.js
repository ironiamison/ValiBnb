const express = require('express');
const router = express.Router();
const { getWeb3Status } = require('../services/web3Service');

router.get('/', async (req, res) => {
  try {
    const status = await getWeb3Status();
    res.json({
      status: 'ok',
      network: process.env.NETWORK || 'mainnet',
      timestamp: new Date().toISOString(),
      web3: status
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;

