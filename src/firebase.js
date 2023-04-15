import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCB7f_O-lxtN6MH8_nRrzZy1F_DOzX0LYQ',
  databaseURL:
    'https://my-crm-test-71f07-default-rtdb.europe-west1.firebasedatabase.app/',
  authDomain: 'my-crm-test-71f07.firebaseapp.com',
  projectId: 'my-crm-test-71f07',
  storageBucket: 'my-crm-test-71f07.appspot.com',
  messagingSenderId: '226520021320',
  appId: '1:226520021320:web:8693502e6d41cc4ece5b7d',
  measurementId: 'G-6H7QL0F116',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleAuthProvider = new GoogleAuthProvider();
