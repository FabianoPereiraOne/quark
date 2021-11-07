import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBHZqBtjwADORcX9Xb1hyhKBDblHJA4Rf4",
  authDomain: "quark-cb3c2.firebaseapp.com",
  projectId: "quark-cb3c2",
  storageBucket: "quark-cb3c2.appspot.com",
  messagingSenderId: "255513859802",
  appId: "1:255513859802:web:f618effd01a5012055f7e3"
};


if(!firebase.apps.length){

   //==> Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}


export default firebase