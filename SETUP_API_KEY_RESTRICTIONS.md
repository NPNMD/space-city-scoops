# Setup API Key Restrictions for spacecityscoops

## Your Firebase Project Details
- **Project ID**: `spacecityscoops`
- **API Key**: `AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg`
- **Production Domains**:
  - `https://spacecityscoops.web.app/*`
  - `https://spacecityscoops.firebaseapp.com/*`

## Step-by-Step: Configure API Key Restrictions

### 1. Go to Google Cloud Console
👉 [Click here to go directly to your API key](https://console.cloud.google.com/apis/credentials?project=spacecityscoops)

Or navigate manually:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **spacecityscoops**
3. Navigate to **APIs & Services** → **Credentials**

### 2. Edit Your API Key
1. Find the API key: `AIzaSyCHb4PqPZ1xzAe2AlkohFd3h6lMcJ5uHRg`
2. Click on it to edit

### 3. Set Application Restrictions
Under **Application restrictions**, select **HTTP referrers (web sites)**

### 4. Add Your Domains
Click **Add an item** and add these domains **one by one**:

```
https://spacecityscoops.web.app/*
https://spacecityscoops.firebaseapp.com/*
http://localhost:3000/*
http://127.0.0.1:3000/*
```

**Important Notes:**
- Include the `https://` or `http://` prefix
- Include the `/*` at the end
- Add each domain on a separate line
- Keep `localhost` entries for local development

### 5. Save Changes
1. Click **Save** at the bottom
2. **Wait 5-10 minutes** for changes to propagate (this is important!)

### 6. Verify Authorized Domains
Also check Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/project/spacecityscoops/authentication/settings)
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Verify these are listed:
   - ✅ `localhost`
   - ✅ `spacecityscoops.web.app`
   - ✅ `spacecityscoops.firebaseapp.com`

If any are missing, they should be auto-added, but you can manually add them if needed.

## After Configuration

1. **Wait 5-10 minutes** for API key restrictions to propagate
2. **Rebuild your site** (if environment variables changed):
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
3. **Test login** on your deployed site
4. **Check browser console** - should no longer see 400 errors

## Troubleshooting

### Still Getting 400 Error?
- ✅ Did you wait 5-10 minutes after saving?
- ✅ Did you include `https://` and `/*` in the domain restrictions?
- ✅ Is your exact domain in the list? (Check browser address bar)
- ✅ Did you rebuild and redeploy after setting environment variables?

### Test API Key Restrictions
Temporarily set restrictions to **None** (for testing only):
- If login works → The issue is definitely domain restrictions
- **Remember to re-add restrictions after testing!**

## Quick Links

- [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials?project=spacecityscoops)
- [Firebase Console - Authentication Settings](https://console.firebase.google.com/project/spacecityscoops/authentication/settings)
- [Identity Toolkit API](https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=spacecityscoops)

