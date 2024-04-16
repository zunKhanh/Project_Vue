import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBliAV8MMupuFTwf-cw14FdL-niHcPOdKc",
  authDomain: "imoney-f2eb0.firebaseapp.com",
  projectId: "imoney-f2eb0",
  storageBucket: "imoney-f2eb0.appspot.com",
  messagingSenderId: "723453195599",
  appId: "1:723453195599:web:1bcc082fd4962ce6ea013a",
  measurementId: "G-9KXNPVSZE4",
 
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const firestore = getFirestore(app); // Lấy đối tượng firestore
  export {auth,  firestore }