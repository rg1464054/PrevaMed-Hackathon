import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// ✅ Fixed config
const firebaseConfig = {
  apiKey: 'AIzaSyAQTBgkyPEni4sj2_DOvgi5loRym0SmFZ8',
  authDomain: 'diagnox-625f0.firebaseapp.com',
  projectId: 'diagnox-625f0',
  storageBucket: 'diagnox-625f0.appspot.com', // ✅ Corrected
  messagingSenderId: '915427804435',
  appId: '1:915427804435:web:8a25b035f27a94fbc086e6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
