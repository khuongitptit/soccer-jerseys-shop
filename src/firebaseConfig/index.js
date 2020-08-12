import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDLKVqBH1xa12AUa_pp9gsre9O6wLe6A0U',
    authDomain: 'soccer-jerseys-shop.firebaseapp.com',
    databaseURL: 'https://soccer-jerseys-shop.firebaseio.com',
    projectId: 'soccer-jerseys-shop',
    storageBucket: 'soccer-jerseys-shop.appspot.com',
    messagingSenderId: '930458420728',
    appId: '1:930458420728:web:1a2d717dbfe4246fc9020d',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase
