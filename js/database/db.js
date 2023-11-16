// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD3CBjFYCxR_Mxmq3ibBdI9R2MNz-_SnDY",
    authDomain: "taregcoffee.firebaseapp.com",
    databaseURL:
        "https://taregcoffee-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "taregcoffee",
    storageBucket: "taregcoffee.appspot.com",
    messagingSenderId: "259103045439",
    appId: "1:259103045439:web:44e3e32e0c5a939b6ec58a",
    measurementId: "G-5DCTS25NGH",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
