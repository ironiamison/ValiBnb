# ValiBNB

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Community](https://img.shields.io/badge/community-driven-brightgreen.svg)](https://github.com)
[![BSC](https://img.shields.io/badge/network-BSC-orange.svg)](https://www.binance.org)

**ValiBNB** - A community-driven payment verification service for Binance Smart Chain (BSC). Verify and settle BNB transactions with confidence using our open-source x402 payment facilitator.

> ⚡ Fast | 🔒 Secure | 🆓 Free Forever | 🌐 Open Source

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/validnb.git
cd validnb

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start server
npm start

# Visit http://localhost:3000
```

## ✨ Features

- ✅ Exact payment verification
- ✅ BSC mainnet and testnet support
- ✅ Transaction status and confirmation checks
- ✅ Amount and address validation
- ✅ RESTful API with rate limiting
- ✅ Security headers and CORS support

## Supported Payment Schemes

- `exact` - Verifies exact BNB amount transfers

## API Endpoints

### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "network": "mainnet",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "web3": {
    "connected": true,
    "currentBlock": 12345678,
    "networkId": 56
  }
}
```

### `GET /supported`
List supported payment kinds

**Response:**
```json
{
  "supported": ["exact"],
  "description": "Currently supports exact payment verification on BNB/BSC"
}
```

### `POST /verify`
Verify a payment transaction

**Request Body:**
```json
{
  "transactionHash": "0x...",
  "fromAddress": "0x...",
  "toAddress": "0x...",
  "expectedAmount": "0.1",
  "currency": "BNB"
}
```

**Success Response:**
```json
{
  "valid": true,
  "transactionHash": "0x...",
  "from": "0x...",
  "to": "0x...",
  "amount": 0.1,
  "currency": "BNB",
  "confirmations": 5,
  "blockNumber": 12345678
}
```

**Error Response:**
```json
{
  "valid": false,
  "reason": "Amount mismatch",
  "expected": 0.1,
  "actual": 0.05,
  "transactionHash": "0x..."
}
```

### `POST /settle`
Settle a payment (mark as processed)

**Request Body:**
```json
{
  "transactionHash": "0x...",
  "recipientAddress": "0x...",
  "amount": "0.1",
  "currency": "BNB"
}
```

**Success Response:**
```json
{
  "success": true,
  "settled": true,
  "transactionHash": "0x...",
  "recipient": "0x...",
  "amount": 0.1,
  "currency": "BNB",
  "confirmations": 5,
  "blockNumber": 12345678,
  "settledAt": "2024-01-01T00:00:00.000Z"
}
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bnb-x402-validator
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and set your configuration:
```env
PORT=3000
NODE_ENV=production
BSC_RPC_URL=https://bsc-dataseed1.binance.org
NETWORK=mainnet
MIN_CONFIRMATIONS=3
MAX_PAYMENT_AGE_HOURS=24
```

4. Start the server
```bash
# Production
npm start

# Development
npm run dev
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `BSC_RPC_URL` | Mainnet RPC endpoint | https://bsc-dataseed1.binance.org |
| `BSC_TESTNET_RPC_URL` | Testnet RPC endpoint | https://data-seed-prebsc-1-s1.binance.org:8545 |
| `NETWORK` | Network to use (mainnet/testnet) | mainnet |
| `MIN_CONFIRMATIONS` | Minimum confirmations required | 3 |
| `MAX_PAYMENT_AGE_HOURS` | Maximum payment age in hours | 24 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## RPC Endpoints

### Mainnet
- `https://bsc-dataseed1.binance.org`
- `https://bsc-dataseed2.binance.org`
- `https://bsc-dataseed3.binance.org`

### Testnet
- `https://data-seed-prebsc-1-s1.binance.org:8545`
- `https://data-seed-prebsc-2-s1.binance.org:8545`

## Example Usage

### Verify a payment
```bash
curl -X POST http://localhost:3000/verify \
  -H "Content-Type: application/json" \
  -d '{
    "transactionHash": "0x123...",
    "fromAddress": "0xabc...",
    "toAddress": "0xdef...",
    "expectedAmount": "0.1"
  }'
```

### Settle a payment
```bash
curl -X POST http://localhost:3000/settle \
  -H "Content-Type: application/json" \
  -d '{
    "transactionHash": "0x123...",
    "recipientAddress": "0xdef...",
    "amount": "0.1"
  }'
```

## Security Features

- ✅ Helmet.js for security headers
- ✅ CORS support
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

## License

MIT

## Donations

BNB Donations: `TBD`

## Acknowledgments

Inspired by [Solidus](https://www.soliduspay.xyz/) for Solana

