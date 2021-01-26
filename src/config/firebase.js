import * as firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCmv0iHSLgxQkv4tpMuFYjsxIKhkDc0yAc",
    authDomain: "pjscrude-6f0ba.firebaseapp.com",
    projectId: "pjscrude-6f0ba",
    storageBucket: "pjscrude-6f0ba.appspot.com",
    messagingSenderId: "1092569689818",
    appId: "1:1092569689818:web:1784ae21f29f3348753fe3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();