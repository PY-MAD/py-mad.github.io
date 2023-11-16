// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getDatabase, set,ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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
const auth = getAuth(app);

let btnSign = document.getElementById("login");
let btnReg = document.getElementById("reg");

let chooseBtnsSign = document.querySelectorAll(".top div button");

chooseBtnsSign.forEach((item)=>{
    item.addEventListener("click",()=>{
        let id = item.id;
        chooseBtnsSign.forEach((check)=>{
            let checkID = check.id;
            if(id == checkID){
                document.querySelector(`#${checkID}`).classList.add("btn-active")
                if(!document.querySelector(`#${checkID}-sec`).classList.contains("active-section")){
                    document.querySelector(`#${checkID}-sec`).classList.add("active-section")
                }
            }else{
                check.classList.remove("btn-active")
                if(document.querySelector(`#${checkID}-sec`).classList.contains("active-section")){
                    document.querySelector(`#${checkID}-sec`).classList.remove("active-section")
                }
            }
        })
    })
})

let login = document.getElementById("signIn")
let reg = document.getElementById("signUp")
let name = document.getElementById("name")
let regEmail = document.getElementById("reg-email")
let regPass = document.getElementById("reg-pass")
reg.addEventListener("click",(event)=>{
    event.preventDefault();
    const email = regEmail.value;
    const password = regPass.value;
    const userName = name.value;
    let time = new Date().getTime();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user;
        set(ref(database, `/users/${time}`),{
            name:userName,
            email:email,
            password:password,
            uid:user.uid
        })
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
})
let logEmail = document.getElementById("login-email")
let logPassword = document.getElementById("login-password")
login.addEventListener("click",(event)=>{
    event.preventDefault();
    const email = logEmail.value;
    const password = logPassword.value;
    signInWithEmailAndPassword(auth , email, password).then((user)=>{
        window.open("admin.html","_self")
    })
})