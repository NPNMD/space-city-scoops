import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// DEBUG: Log Firebase configuration (masking sensitive data)
if (typeof window !== 'undefined') {
  console.group('🔥 Firebase Configuration Debug');
  console.log('📍 Current URL:', window.location.href);
  console.log('📍 Current Origin:', window.location.origin);
  console.log('📍 Current Hostname:', window.location.hostname);
  console.log('✅ API Key:', firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...${firebaseConfig.apiKey.substring(firebaseConfig.apiKey.length - 4)}` : '❌ MISSING');
  console.log('✅ Auth Domain:', firebaseConfig.authDomain || '❌ MISSING');
  console.log('✅ Project ID:', firebaseConfig.projectId || '❌ MISSING');
  console.log('✅ App ID:', firebaseConfig.appId || '❌ MISSING');
  console.log('✅ Storage Bucket:', firebaseConfig.storageBucket || '❌ MISSING');
  console.log('✅ Messaging Sender ID:', firebaseConfig.messagingSenderId || '❌ MISSING');
  console.log('✅ Measurement ID:', firebaseConfig.measurementId || '❌ MISSING');
  console.groupEnd();
}

// Validate required Firebase config values
const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'] as const;
const missingKeys = requiredConfigKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0 && typeof window !== 'undefined') {
  console.error('❌ Missing Firebase configuration:', missingKeys);
  console.error('Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set');
  console.error('Create a .env.local file in the root directory with your Firebase config');
}

// Only initialize Firebase if we have the minimum required config
// This prevents 400 errors from invalid API keys
const hasMinimumConfig = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId;

// Initialize Firebase
// We check if apps are already initialized to avoid duplicate initialization errors in development
let app: FirebaseApp;
try {
  if (typeof window !== 'undefined') {
    console.group('🔥 Firebase Initialization');
    console.log('✅ Has minimum config:', hasMinimumConfig);
    console.log('✅ Existing apps count:', getApps().length);
  }
  
  if (!hasMinimumConfig && typeof window !== 'undefined') {
    console.warn('⚠️ Firebase configuration incomplete. Authentication may not work properly.');
  }
  
  app = !getApps().length && hasMinimumConfig ? initializeApp(firebaseConfig) : getApp();
  
  if (typeof window !== 'undefined') {
    console.log('✅ Firebase app initialized:', app.name);
    console.groupEnd();
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  if (typeof window !== 'undefined') {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
  // Fallback: try to get existing app or create with partial config
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google Auth Provider with proper settings
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
googleProvider.addScope('email');
googleProvider.addScope('profile');

// DEBUG: Log provider configuration
if (typeof window !== 'undefined') {
  console.group('🔥 Google Auth Provider Configuration');
  console.log('✅ Provider ID:', googleProvider.providerId);
  console.log('✅ Custom Parameters:', { prompt: 'select_account' });
  console.log('✅ Scopes:', ['email', 'profile']);
  console.log('✅ Auth instance:', auth ? 'Initialized' : '❌ NOT INITIALIZED');
  console.log('✅ Auth app name:', auth?.app?.name || 'N/A');
  console.groupEnd();
  
  // DEBUG: Monitor Firebase API requests
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0]?.toString() || '';
    const isFirebaseRequest = url.includes('firebase') || 
                             url.includes('identitytoolkit') || 
                             url.includes('googleapis.com') ||
                             url.includes('accounts.google.com');
    
    if (isFirebaseRequest) {
      console.group('🌐 Firebase Network Request');
      console.log('📍 URL:', url);
      console.log('📍 Method:', args[1]?.method || 'GET');
      console.log('📍 Headers:', args[1]?.headers || {});
      console.log('📍 Body:', args[1]?.body || 'N/A');
      console.log('⏰ Timestamp:', new Date().toISOString());
      
      // Intercept response to log errors
      return originalFetch.apply(this, args).then(response => {
        console.log('📥 Response Status:', response.status, response.statusText);
        console.log('📥 Response Headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          console.error('❌ Request failed!');
          console.error('Status:', response.status);
          console.error('Status Text:', response.statusText);
          
          // Try to read response body for error details
          response.clone().text().then(text => {
            console.error('Response Body:', text);
            try {
              const json = JSON.parse(text);
              console.error('Response JSON:', json);
            } catch (e) {
              // Not JSON, that's fine
            }
          }).catch(e => {
            console.error('Could not read response body:', e);
          });
        }
        
        console.groupEnd();
        return response;
      }).catch(error => {
        console.error('❌ Network request error:', error);
        console.groupEnd();
        throw error;
      });
    }
    
    return originalFetch.apply(this, args);
  };
  
  console.log('✅ Network request monitor installed');
}

// Analytics is only supported in browser environments
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, auth, db, googleProvider };

