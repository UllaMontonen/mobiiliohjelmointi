// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZUbIYMElzZLHTmhaxVBB2KDxXv4TfaCs",
  authDomain: "shoppinglist-67c2b.firebaseapp.com",
  projectId: "shoppinglist-67c2b",
  storageBucket: "shoppinglist-67c2b.appspot.com",
  messagingSenderId: "563686326684",
  appId: "1:563686326684:web:ba85238b4fe7242eba8859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;