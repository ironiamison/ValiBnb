# ValiBNB Deployment Guide

## ✅ Production Ready

ValiBNB is fully ready for deployment. All features will work the same way locally and in production because:

1. **Public RPC Endpoints** - BSC RPC endpoints are public and accessible from anywhere
2. **No Local Dependencies** - Everything connects to external services
3. **Environment Variables** - All configuration is environment-based
4. **Static File Serving** - Website files are served from the same server

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - FREE)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "NETWORK": "mainnet",
    "BSC_RPC_URL": "https://bsc-dataseed1.binance.org"
  }
}
```

### Option 2: Railway (FREE tier available)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Set environment variables in Railway dashboard:
- `NODE_ENV=production`
- `NETWORK=mainnet`
- `BSC_RPC_URL=https://bsc-dataseed1.binance.org`

### Option 3: Render (FREE tier available)

1. Connect your GitHub repository
2. Select "Web Service"
3. Set environment variables:
   - `NODE_ENV=production`
   - `NETWORK=mainnet`
   - `BSC_RPC_URL=https://bsc-dataseed1.binance.org`

### Option 4: DigitalOcean App Platform

1. Connect repository
2. Set environment variables
3. Deploy!

### Option 5: Heroku

```bash
# Install Heroku CLI
heroku create validnb

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set NETWORK=mainnet
heroku config:set BSC_RPC_URL=https://bsc-dataseed1.binance.org

# Deploy
git push heroku main
```

## 📋 Environment Variables

Create these in your deployment platform:

```env
NODE_ENV=production
PORT=3000
NETWORK=mainnet
BSC_RPC_URL=https://bsc-dataseed1.binance.org
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
MIN_CONFIRMATIONS=3
MAX_PAYMENT_AGE_HOURS=24
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔧 Build Commands

```json
{
  "scripts": {
    "start": "node src/index.js",
    "build": "echo 'No build needed, Node.js app'"
  }
}
```

## ✅ What Works in Production

- ✅ Website (HTML/CSS/JS)
- ✅ API endpoints (`/health`, `/supported`, `/verify`, `/settle`)
- ✅ BSC mainnet connection
- ✅ BSC testnet connection
- ✅ Payment verification
- ✅ Transaction settlement
- ✅ Live API testing on website
- ✅ Static file serving
- ✅ Rate limiting
- ✅ CORS support

## 🌐 Custom Domain

After deployment, you can add a custom domain:

1. Deploy to platform
2. Go to domain settings
3. Add your domain (e.g., `validnb.com`)
4. Update DNS records as instructed

## 📊 Monitoring

Add monitoring tools:

**Option 1: Uptime Robot** (FREE)
- Monitors your API endpoints
- Alerts if service goes down

**Option 2: Logtail / Better Stack** (FREE tier)
- Log aggregation
- Error tracking

## 🔐 Security Checklist

- [x] Helmet.js security headers
- [x] Rate limiting enabled
- [x] CORS configured
- [x] Input validation
- [x] Error handling
- [ ] Add custom domain SSL (automatic on most platforms)
- [ ] Set up monitoring alerts

## 🎯 Expected Performance

- **Response Time**: < 1 second
- **Availability**: 99.9%+
- **Concurrent Users**: 100+ (with rate limiting)

## 🐛 Troubleshooting

### Issue: "Cannot connect to BSC"
**Solution**: Check RPC endpoint is accessible, try alternative endpoints

### Issue: Rate limiting too strict
**Solution**: Adjust `RATE_LIMIT_MAX_REQUESTS` in environment variables

### Issue: Static files not loading
**Solution**: Ensure `public/` folder is included in deployment

## 📚 Additional Resources

- [BSC RPC Endpoints](https://docs.binance.org/smart-chain/developer/rpc.html)
- [Node.js Deployment Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## 💡 Pro Tips

1. **Use multiple RPC endpoints** - Add fallbacks for reliability
2. **Enable caching** - Cache health checks and supported types
3. **Add CDN** - Serve static files from CDN for faster load times
4. **Monitor costs** - Track API usage if using paid RPC endpoints

---

**Need help?** Open an issue on GitHub or contact support.

