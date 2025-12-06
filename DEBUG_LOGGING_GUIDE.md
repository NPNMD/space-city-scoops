# Debug Logging Guide

## Overview

I've added comprehensive debug logging throughout the Firebase authentication flow. When you try to login, you'll see detailed console logs that will help us pinpoint exactly where the issue is occurring.

## How to Use

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Clear the console** (right-click → Clear console)
4. **Try logging in**
5. **Watch the console logs** - they'll be grouped and color-coded

## What You'll See

### 🔥 Firebase Configuration Debug
**When:** On page load
**Shows:**
- Current URL, Origin, Hostname
- All Firebase config values (API key masked for security)
- Which values are missing (if any)

**What to check:**
- ✅ All values should be present (not "❌ MISSING")
- ✅ Auth Domain should match your Firebase project
- ✅ API Key should be partially visible (first 10 + last 4 chars)

### 🔥 Firebase Initialization
**When:** On page load
**Shows:**
- Whether minimum config is present
- Number of existing Firebase apps
- Firebase app initialization status

**What to check:**
- ✅ Should say "Has minimum config: true"
- ✅ Should say "Firebase app initialized"

### 🔥 Google Auth Provider Configuration
**When:** On page load
**Shows:**
- Provider ID
- Custom parameters
- Scopes
- Auth instance status

**What to check:**
- ✅ Provider ID should be "google.com"
- ✅ Auth instance should be "Initialized"

### 🔥 Auth State Listener Setup
**When:** On page load
**Shows:**
- Auth state listener registration
- Initial auth state

**What to check:**
- ✅ Should say "Auth state listener registered"

### 🔥 Auth State Changed
**When:** Auth state changes (login/logout)
**Shows:**
- User information (if logged in)
- Profile sync status
- Orders loaded

**What to check:**
- ✅ Should show user info when logged in
- ✅ Should show "No user" when logged out

### 🎯 Login Button Clicked
**When:** You click the login button
**Shows:**
- Timestamp
- Current URL/Origin/Hostname

**What to check:**
- ✅ Should show your production domain (spacecityscoops.web.app)

### 🔥 Login Attempt Started
**When:** Login function is called
**Shows:**
- Timestamp
- Current URL/Origin/Hostname
- Firebase configuration check
- Auth instance status
- Provider status

**What to check:**
- ✅ Auth instance should be "Available"
- ✅ Google Provider should be "Available"
- ✅ Configuration check should pass

### 🌐 Firebase Network Request
**When:** Firebase makes API calls
**Shows:**
- Request URL
- Request method
- Request headers
- Request body
- Response status
- Response headers
- Response body (if error)

**What to check:**
- ❌ **If you see 400 Bad Request here**, this is the key!
  - Look at the URL - should include your API key
  - Look at the Response Body - will show exact error
  - Check if URL includes your domain restrictions

### ❌ Login Failed
**When:** Login fails
**Shows:**
- Error code
- Error message
- Error details
- Specific guidance based on error type

**What to check:**
- ❌ **Error code** - This tells us exactly what went wrong
- ❌ **Error message** - Additional details
- 💡 **Guidance** - Specific steps based on error type

## Common Error Codes

### `auth/unauthorized-domain`
- **Meaning:** Domain not in authorized domains
- **Check:** Firebase Console → Authentication → Settings → Authorized domains
- **Fix:** Add your domain

### `auth/api-key-not-valid`
- **Meaning:** API key issue
- **Check:** API key restrictions in Google Cloud Console
- **Fix:** Verify API key is correct and restrictions allow your domain

### `auth/network-request-failed`
- **Meaning:** Network error or API key restriction blocking
- **Check:** Network tab for failed request
- **Fix:** Check API key restrictions, wait for propagation

### 400 Bad Request (no specific code)
- **Meaning:** Usually API key restrictions
- **Check:** Network request logs for exact error
- **Fix:** Add domain to API key restrictions, wait 5-10 minutes

## What to Share

When reporting the issue, please share:

1. **All console logs** (copy/paste or screenshot)
2. **Network tab** - Find the failed request (usually to `identitytoolkit.googleapis.com`)
   - Click on it
   - Share the **Request URL**
   - Share the **Response** tab content
3. **Error code** (if any)
4. **Error message** (full text)

## Quick Test

After rebuilding and deploying:

1. Open https://spacecityscoops.web.app
2. Open DevTools → Console
3. Clear console
4. Click "LOGIN / SIGNUP"
5. Watch the logs
6. Share what you see!

The logs will tell us exactly where it's failing! 🎯

