import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCIQNESLkfPDwKyLYOaWDt1iAUDqp3jlpY",
    authDomain: "foodswipe-d2297.firebaseapp.com",
    databaseURL: "https://foodswipe-d2297.firebaseio.com",
    projectId: "foodswipe-d2297",
    storageBucket: "foodswipe-d2297.appspot.com",
    messagingSenderId: "211953710318",
    appId: "1:211953710318:web:01725192c8047388706fff",
    measurementId: "G-EFLCYW89W4"
};

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

export const auth = firebase.auth()

export const db = firebase.firestore()