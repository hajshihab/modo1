import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Firebase configuration - Your actual Firebase project
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBsGo3uymvqsmP1uEvjcdQLsT-UrACcR5A",
  authDomain: "modo-platform-2024.firebaseapp.com",
  projectId: "modo-platform-2024",
  storageBucket: "modo-platform-2024.firebasestorage.app",
  messagingSenderId: "256537994487",
  appId: "1:256537994487:web:faaac7451fbff2c8215ff2",
  measurementId: "", // Add if you have Google Analytics
};

// Validate Firebase configuration
const validateFirebaseConfig = (config: FirebaseConfig): boolean => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  
  for (const field of requiredFields) {
    if (!config[field as keyof FirebaseConfig]) {
      console.error(`Firebase configuration missing: ${field}`);
      return false;
    }
  }
  
  return true;
};

// Initialize Firebase app
let app: FirebaseApp;

if (!getApps().length) {
  if (validateFirebaseConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig);
  } else {
    throw new Error('Invalid Firebase configuration. Please check your environment variables.');
  }
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const functions: Functions = getFunctions(app);

// Initialize Analytics (only in browser environment)
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}

// Export the app instance
export { app };

// Firebase service helpers
export const firebaseServices = {
  app,
  auth,
  db,
  storage,
  functions,
  analytics,
};

// Firebase configuration getter
export const getFirebaseConfig = (): FirebaseConfig => firebaseConfig;

// Check if Firebase is properly configured
export const isFirebaseConfigured = (): boolean => {
  return validateFirebaseConfig(firebaseConfig);
};

// Firebase connection status
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Simple test to check if Firebase is accessible
    await db.enableNetwork();
    return true;
  } catch (error) {
    console.error('Firebase connection failed:', error);
    return false;
  }
};

// Firebase error handler
export const handleFirebaseError = (error: any): string => {
  const errorCode = error.code;
  const errorMessage = error.message;

  // Common Firebase Auth errors
  const authErrors: Record<string, string> = {
    'auth/user-not-found': 'No user found with this email address.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };

  // Common Firestore errors
  const firestoreErrors: Record<string, string> = {
    'permission-denied': 'You do not have permission to perform this action.',
    'not-found': 'The requested document was not found.',
    'already-exists': 'The document already exists.',
    'resource-exhausted': 'Quota exceeded. Please try again later.',
    'failed-precondition': 'The operation was rejected due to a failed precondition.',
    'aborted': 'The operation was aborted due to a conflict.',
    'out-of-range': 'The operation was attempted past the valid range.',
    'unimplemented': 'This operation is not implemented or supported.',
    'internal': 'Internal server error.',
    'unavailable': 'The service is currently unavailable.',
    'data-loss': 'Unrecoverable data loss or corruption.',
    'unauthenticated': 'The request does not have valid authentication credentials.',
  };

  // Return user-friendly error message
  if (authErrors[errorCode]) {
    return authErrors[errorCode];
  }

  if (firestoreErrors[errorCode]) {
    return firestoreErrors[errorCode];
  }

  // Return original error message if no mapping found
  return errorMessage || 'An unexpected error occurred.';
};

// Firebase timestamp helpers
export const createTimestamp = () => {
  return new Date();
};

export const formatFirebaseTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp?.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return new Date(timestamp);
};

// Firebase batch operations helper
export const createBatch = () => {
  return db.batch ? db.batch() : null;
};

// Firebase transaction helper
export const runTransaction = async (updateFunction: (transaction: any) => Promise<any>) => {
  const { runTransaction } = await import('firebase/firestore');
  return runTransaction(db, updateFunction);
};

// Export default Firebase app
export default app;
