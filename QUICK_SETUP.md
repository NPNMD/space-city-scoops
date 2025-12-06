# Quick Setup Guide for spacecityscoops

## Step 1: Create Environment Variables File

Create a file named `.env.local` in the root of your project with these values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=spacecityscoops.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=spacecityscoops
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=spacecityscoops.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=812439828958
NEXT_PUBLIC_FIREBASE_APP_ID=1:812439828958:web:03f26e5ee403bfcf7a854f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-CFXVJZSPZM
```

**Important**: This file should NOT be committed to git (it's in .gitignore).

## Step 2: Configure API Key Restrictions (CRITICAL!)

This is likely the cause of your 400 error!

1. **Go to**: https://console.cloud.google.com/apis/credentials?project=spacecityscoops
2. **Click on** your API key: `AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg`
3. **Under "Application restrictions"**, select **HTTP referrers (web sites)**
4. **Add these domains** (one per line):
   ```
   https://spacecityscoops.web.app/*
   https://spacecityscoops.firebaseapp.com/*
   http://localhost:3000/*
   http://127.0.0.1:3000/*
   ```
5. **Click Save**
6. **Wait 5-10 minutes** for changes to take effect

## Step 3: Verify Authorized Domains

1. **Go to**: https://console.firebase.google.com/project/spacecityscoops/authentication/settings
2. **Check "Authorized domains"** section
3. Should include:
   - `localhost`
   - `spacecityscoops.web.app`
   - `spacecityscoops.firebaseapp.com`

## Step 4: Enable Identity Toolkit API

1. **Go to**: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=spacecityscoops
2. **Click "Enable"** if not already enabled

## Step 5: Rebuild and Deploy

```bash
# Build with environment variables
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Step 6: Test

1. Go to your deployed site: https://spacecityscoops.web.app
2. Try logging in
3. Should work without 400 errors!

## If Still Not Working

After making API key restriction changes:
- ⏰ **Wait 5-10 minutes** (Google needs time to propagate changes)
- 🔄 **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)
- 🧹 **Clear browser cache** or try incognito mode
- 📝 **Check browser console** for specific error messages

## Common Mistakes

❌ **Only adding localhost** - Must include production domains!
❌ **Missing `https://` or `/*`** - Must include both!
❌ **Not waiting** - Changes take 5-10 minutes to propagate
❌ **Not rebuilding** - Environment variables must be set before build

