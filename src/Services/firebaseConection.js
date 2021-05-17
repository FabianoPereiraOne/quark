import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyCAVBwy5WSpWpYtXOyv6-e6D_K8pJ147cM",
    authDomain: "quark-e80c2.firebaseapp.com",
    projectId: "quark-e80c2",
    storageBucket: "quark-e80c2.appspot.com",
    messagingSenderId: "483822783894",
    appId: "1:483822783894:web:c98875365ffe6f0bf4e1b7"
};


if(!firebase.apps.length){

   //==> Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}


export default firebase