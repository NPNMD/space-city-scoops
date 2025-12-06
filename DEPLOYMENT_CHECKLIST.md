# Firebase Hosting Deployment Checklist

## Pre-Deployment: Environment Variables

Since this is a **static export** (`output: 'export'`), environment variables are baked into the JavaScript at build time. They MUST be set before building.

### Step 1: Set Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Get these values from:**
- Firebase Console → Project Settings → General → Your apps → Web app config

### Step 2: Configure API Key Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your API key
5. Under **Application restrictions** → **HTTP referrers**, add:
   ```
   https://your-project-id.web.app/*
   https://your-project-id.firebaseapp.com/*
   https://your-custom-domain.com/*  (if using custom domain)
   http://localhost:3000/*  (for local development)
   ```
6. Click **Save**
7. **Wait 5-10 minutes** for changes to propagate

### Step 3: Configure Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Verify these are listed:
   - `localhost`
   - `your-project-id.web.app`
   - `your-project-id.firebaseapp.com`
   - Your custom domain (if using one)

### Step 4: Enable Identity Toolkit API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **Library**
4. Search for "Identity Toolkit API"
5. Click **Enable** if not already enabled

### Step 5: Build and Deploy

```bash
# Build with environment variables
npm run build

# Verify build output contains your API key (optional check)
grep -r "AIzaSy" out/_next/static/chunks/ || echo "API key not found in build!"

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Post-Deployment: Verify

1. **Check deployed site loads**
2. **Try logging in** - should work without 400 errors
3. **Check browser console** - no Firebase config errors
4. **Verify API key in Network tab** - requests should succeed

## Common Issues

### Issue: 400 Bad Request on Login

**Most likely causes:**
1. ✅ API key restrictions don't include your production domain
2. ✅ Production domain not in authorized domains
3. ✅ Environment variables not set during build
4. ✅ Identity Toolkit API not enabled

**Quick fix:**
- Check API key restrictions include `https://your-project-id.web.app/*`
- Verify domain in authorized domains
- Rebuild and redeploy if env vars changed

### Issue: Environment Variables Not Working

**Check:**
- `.env.local` exists in project root
- Variables start with `NEXT_PUBLIC_`
- Build was run AFTER setting variables
- Variables are not in `.gitignore` (they should be, but check they exist locally)

### Issue: Works Locally But Not Deployed

**This means:**
- Environment variables are set locally but not during build
- API key restrictions only allow localhost
- Authorized domains missing production domain

**Solution:**
- Set environment variables before building
- Add production domain to API key restrictions
- Add production domain to authorized domains

## Quick Test Commands

```bash
# Check if environment variables are set
echo $NEXT_PUBLIC_FIREBASE_API_KEY

# Build and check for API key in output
npm run build && grep -r "AIzaSy" out/_next/static/chunks/ | head -1

# Deploy
firebase deploy --only hosting

# Check Firebase project
firebase projects:list
```

