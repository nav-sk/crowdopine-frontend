// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBo7jhGyhPfNecq0JcIY-R6iNg98mm6sik",
    authDomain: "project-x-00100.firebaseapp.com",
    projectId: "project-x-00100",
    storageBucket: "project-x-00100.appspot.com",
    messagingSenderId: "610664437592",
    appId: "1:610664437592:web:db0f68a9749c565c89772d",
    measurementId: "G-6EGNXBW7G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;