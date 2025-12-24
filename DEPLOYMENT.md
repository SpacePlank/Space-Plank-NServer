# Notification Server Deployment Guide

## Deploy to Render.com (Recommended - Free Tier)

### Step 1: Prepare for Deployment
1. Push the `us/server` folder to a GitHub repository
2. Go to https://render.com and sign up/login

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the repository containing the server code

### Step 3: Configure Service
- **Name**: spaceplank-notifications
- **Root Directory**: `us/server` (if in monorepo) or leave blank
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 4: Add Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://spaceplankdemo.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=spaceplankofficial@gmail.com
EMAIL_PASSWORD=daof crbr hzcz ngem
EMAIL_FROM=SpacePlank Store <spaceplankofficial@gmail.com>
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Copy the service URL (e.g., https://spaceplank-notifications.onrender.com)

### Step 6: Update User App
Update `us/.env` with the deployed URL:
```
VITE_API_URL=https://spaceplank-notifications.onrender.com/api
```

Then redeploy the user app on Vercel.

## Alternative: Railway.app
Similar steps, also has free tier.

## Test Deployment
Visit: `https://your-service.onrender.com/health`
Should return: `{"status":"ok","message":"Notification server is running"}`
