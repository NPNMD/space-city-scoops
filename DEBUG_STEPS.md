# Debug Steps - Still Getting 400 Error

Your configuration looks correct! Let's verify everything step by step.

## ✅ What You've Done Correctly

From your screenshots, I can see:
- ✅ API key restrictions include all three domains
- ✅ Authorized domains are set correctly
- ✅ You're on the deployed site

## 🔍 Next Steps to Debug

### Step 1: Verify Environment Variables Were Used in Build

The most common issue: **Environment variables weren't set when you built the site.**

Check if your API key is in the deployed build:

1. Go to: https://spacecityscoops.web.app
2. Open DevTools (F12)
3. Go to **Sources** tab (or **Network** tab)
4. Search for `AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg` in the JavaScript files
5. If **NOT found** → Environment variables weren't set during build

**Fix**: Rebuild with environment variables set:
```bash
# Make sure .env.local exists with all variables
# Then rebuild
npm run build
firebase deploy --only hosting
```

### Step 2: Check Browser Console for Specific Error

1. Open DevTools → **Console** tab
2. Try logging in again
3. Look for the **exact error message**
4. Share the full error (not just "400 Bad Request")

Common errors:
- `auth/unauthorized-domain` → Domain not in authorized domains
- `auth/api-key-not-valid` → API key issue
- `auth/network-request-failed` → Network/API key restriction issue

### Step 3: Check Network Tab

1. Open DevTools → **Network** tab
2. Try logging in
3. Find the failed request (usually to `identitytoolkit.googleapis.com`)
4. Click on it
5. Check the **Response** tab - what's the exact error message?

### Step 4: Verify API Key Restrictions Propagated

After saving API key restrictions, Google needs **5-10 minutes** to propagate changes.

**Check:**
1. How long ago did you save the API key restrictions?
2. If less than 10 minutes → **Wait longer**
3. Try clearing browser cache and hard refresh (Ctrl+Shift+R)

### Step 5: Test with Temporary Removal of Restrictions

**⚠️ FOR TESTING ONLY - REMOVE AFTER:**

1. Go to API key settings
2. Temporarily set restrictions to **"None"**
3. Save and wait 2-3 minutes
4. Try logging in
5. **If it works** → The issue is definitely API key restrictions
6. **Re-add restrictions** immediately after testing

### Step 6: Verify .env.local File

Make sure `.env.local` exists in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=spacecityscoops.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=spacecityscoops
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=spacecityscoops.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=812439828958
NEXT_PUBLIC_FIREBASE_APP_ID=1:812439828958:web:03f26e5ee403bfcf7a854f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-CFXVJZSPZM
```

Then rebuild:
```bash
npm run build
firebase deploy --only hosting
```

### Step 7: Check Identity Toolkit API

1. Go to: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=spacecityscoops
2. Verify it says **"API enabled"** (not "Enable")
3. If not enabled → Click **Enable**

## Most Likely Issues

Based on your setup, the most likely causes are:

1. **Environment variables not in build** (60% chance)
   - Solution: Rebuild with .env.local set

2. **API key restrictions haven't propagated** (30% chance)
   - Solution: Wait 10+ minutes, clear cache, try again

3. **Browser cache showing old build** (10% chance)
   - Solution: Hard refresh (Ctrl+Shift+R) or incognito mode

## Quick Test

Run this to verify your build has the API key:

```bash
# After building, check if API key is in the output
grep -r "AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg" out/_next/static/chunks/
```

If nothing is found → Environment variables weren't set during build!

## What to Share

Please share:
1. The **exact error message** from browser console
2. The **Response** from the failed network request
3. Whether you **rebuilt and redeployed** after setting .env.local
4. How long ago you **saved the API key restrictions**

