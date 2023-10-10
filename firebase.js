import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAos7xQPZm9SkSTIooArP4BtYyNtBR4BBI",
    authDomain: "qrollcall.firebaseapp.com",
    projectId: "qrollcall",
    storageBucket: "qrollcall.appspot.com",
    messagingSenderId: "520903601705",
    appId: "1:520903601705:web:2be32ecf7a61ebbae2f638",
    measurementId: "G-QD8B3P32PT"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const db = firebase.firestore();
