# StayScape - Render Deployment Guide

## Prerequisites
- MongoDB Atlas account (for database)
- Cloudinary account (for image uploads)
- Render account

## Environment Variables

Set these variables in your Render dashboard under Environment:

1. **ATLAS_DB_URL** - Your MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/StayScape?retryWrites=true&w=majority`

2. **SECRET** - Session secret (use a secure random string)
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

3. **CLOUD_NAME** - Your Cloudinary account name

4. **CLOUD_API_KEY** - Your Cloudinary API key

5. **CLOUD_API_SECRET** - Your Cloudinary API secret

## Deployment Steps

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add all environment variables in Render dashboard
6. Deploy

## Fixed Issues for Production

✅ Port now uses environment variable (process.env.PORT)
✅ Middleware filename corrected (middelware → middleware)
✅ Passport configuration fixed
✅ Cloudinary config corrected (allowedFormats)
✅ Database reference bug fixed (reviews field)
✅ Express-session version updated
✅ Start script added to package.json
✅ Environment variables documented

## Notes

- The `/init` directory is only for local development and initializing sample data
- All user sessions are stored in MongoDB via connect-mongo
- Image uploads are handled through Cloudinary
