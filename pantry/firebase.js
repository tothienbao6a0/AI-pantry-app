// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy_KAHoQKc4W9PdQEjkqA5CG-ZrfbQ9X8",
  authDomain: "pantryapp-2dfa8.firebaseapp.com",
  projectId: "pantryapp-2dfa8",
  storageBucket: "pantryapp-2dfa8.appspot.com",
  messagingSenderId: "486901965824",
  appId: "1:486901965824:web:77275c874721172c13e4e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export{

    app,firestore
}