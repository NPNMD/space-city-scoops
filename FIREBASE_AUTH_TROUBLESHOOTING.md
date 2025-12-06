# Firebase Authentication Troubleshooting Guide

## Issue: 400 Bad Request Error on Login (DEPLOYED SITE)

**IMPORTANT**: This guide is for **production/deployed sites**. If you're testing locally, see the localhost section below.

If you're seeing a `400 (Bad Request)` error when trying to login on your deployed site, it's typically caused by one of the following issues:

### 1. API Key Restrictions (MOST COMMON ISSUE FOR DEPLOYED SITES)

The Firebase API key might have HTTP referrer restrictions that don't include your **production domain**.

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** > **Credentials**
4. Find your API key (the one starting with `AIzaSy...`)
5. Click on it to edit
6. Under **Application restrictions**, check if **HTTP referrers** is selected
7. **CRITICAL**: Add your production domain(s):
   - `https://your-project-id.web.app/*`
   - `https://your-project-id.firebaseapp.com/*`
   - `https://your-custom-domain.com/*` (if using custom domain)
   - `https://*.your-custom-domain.com/*` (for subdomains)
   - Keep localhost for development: `http://localhost:3000/*` and `http://127.0.0.1:3000/*`
8. Click **Save**
9. **Wait 5-10 minutes** for changes to propagate

**Common Mistake**: Only having `localhost` in the restrictions - your production domain must be explicitly added!

### 2. Authorized Domains (REQUIRED FOR PRODUCTION)

Firebase Authentication requires domains to be explicitly authorized. Your Firebase Hosting domains should be auto-added, but custom domains must be manually added.

**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** > **Settings** > **Authorized domains**
4. Verify these domains are listed:
   - `localhost` (for development)
   - `your-project-id.web.app` (Firebase Hosting)
   - `your-project-id.firebaseapp.com` (Firebase Hosting)
   - Your custom domain (e.g., `yourdomain.com`) - **must be added manually**
5. Click **Add domain** if your custom domain is missing
6. **Important**: Don't include `https://` or `/*` - just the domain name (e.g., `yourdomain.com`)

### 3. Environment Variables (CRITICAL FOR DEPLOYED SITES)

Since your site uses `output: 'export'` (static export), environment variables are **baked into the JavaScript bundle at build time**. They must be set **before building**, not at runtime.

#### For Firebase Hosting Deployment:

**Option A: Set Environment Variables Before Building Locally**

1. Create a `.env.local` file in the root of your project:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

2. Get these values from Firebase Console:
   - Go to **Project Settings** > **General**
   - Scroll down to **Your apps** section
   - Click on the web app icon (`</>`) or create a new web app
   - Copy the configuration values

3. Build with environment variables:
```bash
npm run build
```

4. Deploy:
```bash
firebase deploy --only hosting
```

**Option B: Use Firebase Functions Environment Config (Recommended)**

If you're using Firebase Functions, you can set environment variables there:

```bash
firebase functions:config:set firebase.api_key="your_api_key"
firebase functions:config:set firebase.auth_domain="your-project.firebaseapp.com"
# ... etc
```

However, since you're using static export, **Option A is required**.

**Option C: Use Firebase Hosting Environment Variables**

Firebase Hosting doesn't support runtime environment variables for static sites. You must set them at build time.

#### For Netlify Deployment:

1. Go to Netlify Dashboard → Your Site → **Site settings** → **Environment variables**
2. Add all `NEXT_PUBLIC_FIREBASE_*` variables
3. Redeploy your site (Netlify will use these during build)

#### For Vercel Deployment:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add all `NEXT_PUBLIC_FIREBASE_*` variables
3. Redeploy your site

#### Verify Environment Variables Are Set:

After building, check the generated files in `out/_next/static/chunks/` - search for your API key to confirm it's included. **Never commit `.env.local` to git** - add it to `.gitignore`.

### 4. Identity Toolkit API Not Enabled

The Identity Toolkit API must be enabled for Firebase Authentication to work.

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** > **Library**
4. Search for "Identity Toolkit API"
5. Click on it and ensure it's **Enabled**
6. If not enabled, click **Enable**

### 5. Build-Time Environment Variables

Since this is a static export (`output: 'export'`), environment variables must be available at build time.

**Solution:**
- Ensure all `NEXT_PUBLIC_*` variables are set before running `npm run build`
- For production deployments, set these in your hosting platform's environment variable settings

### 6. Cross-Origin-Opener-Policy Warning

The `Cross-Origin-Opener-Policy policy would block the window.close call` warning is harmless and doesn't prevent authentication from working. It's just a browser security feature.

### Testing Steps

1. **Check Console for Missing Config:**
   - Open browser DevTools
   - Look for console errors about missing Firebase configuration
   - If you see errors, your environment variables aren't set correctly

2. **Verify API Key:**
   - Check that the API key in the error matches your `.env.local` file
   - Ensure it's not restricted incorrectly

3. **Test with Different Browser:**
   - Try incognito/private mode
   - Clear browser cache and cookies
   - Try a different browser

4. **Check Network Tab:**
   - Open DevTools > Network tab
   - Try logging in
   - Look at the failed request to see the exact error response

### Quick Fix Checklist for DEPLOYED SITES

- [ ] **Environment variables are set BEFORE building** (not at runtime)
- [ ] **API key restrictions include your production domain** (`https://your-project.web.app/*`)
- [ ] **Production domain is added to Firebase authorized domains**
- [ ] **Identity Toolkit API is enabled** in Google Cloud Console
- [ ] **Site was rebuilt and redeployed** after making changes
- [ ] **Waited 5-10 minutes** after changing API key restrictions (propagation delay)
- [ ] Browser popups are not blocked
- [ ] No ad blockers are interfering with Firebase

### Quick Fix Checklist for LOCALHOST

- [ ] All environment variables are set in `.env.local`
- [ ] Development server was restarted after adding environment variables
- [ ] API key restrictions allow `http://localhost:3000/*`
- [ ] `localhost` is in Firebase authorized domains (should be automatic)
- [ ] Identity Toolkit API is enabled

### Debugging Steps for Deployed Sites

1. **Check if environment variables are in the build:**
   - Open your deployed site
   - View page source or check DevTools → Sources
   - Search for your API key in the JavaScript files
   - If not found, environment variables weren't set during build

2. **Check the exact error:**
   - Open browser DevTools → Console
   - Look for the exact error message
   - Check Network tab → Failed request → Response tab for details

3. **Verify your production domain:**
   - Check what domain you're actually using (check browser address bar)
   - Ensure that EXACT domain is in:
     - API key restrictions
     - Authorized domains

4. **Test API key restrictions:**
   - Temporarily set API key restrictions to "None" (for testing only!)
   - If login works, the issue is definitely domain restrictions
   - **Remember to re-add restrictions after testing**

### Still Having Issues?

If the problem persists:

1. **Verify environment variables are set at build time:**
   ```bash
   # Check if variables are available
   echo $NEXT_PUBLIC_FIREBASE_API_KEY
   
   # Build and check output
   npm run build
   # Search for API key in out/_next/static/chunks/*.js
   ```

2. **Check Firebase project status:**
   - Verify project is active
   - Check if billing is enabled (required for some features)
   - Ensure you're using the correct project

3. **Try a fresh build:**
   - Delete `out/` folder
   - Delete `.next/` folder
   - Rebuild: `npm run build`
   - Redeploy: `firebase deploy --only hosting`

4. **Contact Support:**
   - Check Firebase status page: https://status.firebase.google.com/
   - Review Firebase documentation: https://firebase.google.com/docs/auth/web/start

