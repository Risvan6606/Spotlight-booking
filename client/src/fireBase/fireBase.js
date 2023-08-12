import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBx6yAOpeCHfwkmGhTgCh4eHu5EZj8F0xI",
    authDomain: "booking-3f8e1.firebaseapp.com",
    projectId: "booking-3f8e1",
    storageBucket: "booking-3f8e1.appspot.com",
    messagingSenderId: "770211076114",
    appId: "1:770211076114:web:6a306809d18e90efd060cb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase


