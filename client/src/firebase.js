import firebase from 'firebase/app';
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCPqqUpcGsBEDOXW0aruwZviBls_snX0-g",
    authDomain: "maker-app-171cd.firebaseapp.com",
    databaseURL: "https://maker-app-171cd.firebaseio.com",
    projectId: "maker-app-171cd",
    storageBucket: "maker-app-171cd.appspot.com",
    messagingSenderId: "189710278332",
    appId: "1:189710278332:web:35084540e54cd8df523ab9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };