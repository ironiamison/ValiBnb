# Quick Start Guide

Get your BNB X402 Validator up and running in minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Create environment file**
```bash
cp .env.example .env
```

3. **Edit configuration** (optional)
Open `.env` and adjust settings as needed:
- Change `PORT` if port 3000 is already in use
- Set `NETWORK` to `testnet` for testing
- Adjust `MIN_CONFIRMATIONS` for your needs

4. **Start the server**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Test the API

Once the server is running, you can test it:

### Test health endpoint
```bash
curl http://localhost:3000/health
```

### List supported payment types
```bash
curl http://localhost:3000/supported
```

### Verify a payment

Replace the transaction hash with a real BSC transaction:
```bash
curl -X POST http://localhost:3000/verify \
  -H "Content-Type: application/json" \
  -d '{
    "transactionHash": "0xYOUR_TRANSACTION_HASH",
    "fromAddress": "0xSENDER_ADDRESS",
    "toAddress": "0xRECEIVER_ADDRESS",
    "expectedAmount": "0.1",
    "currency": "BNB"
  }'
```

### Run test suite (if you have a real transaction)
```bash
node examples/test-endpoints.js http://localhost:3000
```

## Switching Networks

To switch to BSC testnet for testing:

1. Edit `.env`
2. Change `NETWORK=testnet`
3. Restart the server

## Common Issues

### Port already in use
Change `PORT` in `.env` to a different port (e.g., `PORT=3001`)

### Connection timeout
- Check your internet connection
- Verify the RPC endpoint is accessible
- Try a different RPC URL from the list in README.md

### Transaction not found
- Ensure you're using the correct network (mainnet vs testnet)
- Verify the transaction hash is correct
- Wait a few seconds for the transaction to propagate

## Next Steps

- Read the full [README.md](README.md) for detailed API documentation
- Integrate the API into your application
- Set up production deployment with proper security

## Support

For issues or questions:
- Check the README.md for full documentation
- Review the API endpoints in the code
- Test with the example transaction in the test file

