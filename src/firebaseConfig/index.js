import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCBqnF-YFwLKBgPe4-QvNDAzPunVMn7_vY",
    authDomain: "test-firebase-auth-305e7.firebaseapp.com",
    databaseURL: "https://test-firebase-auth-305e7.firebaseio.com",
    projectId: "test-firebase-auth-305e7",
    storageBucket: "test-firebase-auth-305e7.appspot.com",
    messagingSenderId: "218546413120",
    appId: "1:218546413120:web:e1a070e1c2c6e7862ac9a5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase