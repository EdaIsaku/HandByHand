import firebase from "firebase/app";

// The firebase products that we'll use
import "firebase//auth";
import "firebase/firestore";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ5xq_iZevzHcerUCDnV5Wgas9r7jFz-c",
  authDomain: "handbyhand-699aa.firebaseapp.com",
  projectId: "handbyhand-699aa",
  storageBucket: "handbyhand-699aa.appspot.com",
  messagingSenderId: "106415876441",
  appId: "1:106415876441:web:963ba24d439f65249e8448",
  measurementId: "G-Y2L9VCQNEL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
