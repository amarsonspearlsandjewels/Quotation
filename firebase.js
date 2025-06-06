// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDgGob0Npy11s4v9OKBKTok1PqwcPoqQM0',
  authDomain: 'apjapi.firebaseapp.com',
  projectId: 'apjapi',
  storageBucket: 'apjapi.firebasestorage.app',
  messagingSenderId: '82211267564',
  appId: '1:82211267564:web:366ac73a3ff3c69150d6c9',
  measurementId: 'G-HC02YJPH8N',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
