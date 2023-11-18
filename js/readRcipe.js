// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getDatabase , set , ref, get, onChildAdded} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

auth.onAuthStateChanged((user)=>{
    let uid = user.uid;
    get(ref(database, `/users/`)).then((snap)=>{
        let data = snap.val();
        let name = "";
        for(let i in data){
            if(uid == data[i].uid){
                name = data[i].name            
            }
        }
        get(ref(database, `/recipe/${name}`)).then((snap)=>{
            let continer = document.querySelector(".container")
            function addCard(title , weight , temp , timeOfEnd ,id){
                let q = `
                        <div class="card-container">
                            <div class="card-content">
                                <div class="titleRicpe">${title}</div>
                                <div class="content-rcipe">
                                    <div class="text-weight">
                                        <div class="str">الوزن</div>
                                        <div class="number">${weight}g</div>
                                    </div>
                                    <div class="text-temp">
                                        <div class="str">درجة الحرارة</div>
                                        <div class="number">${temp} °C</div>
                                    </div>
                                    <div class="text-time">
                                        <div class="str">الوقت المتوقع</div>
                                        <div class="number">${timeOfEnd}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="start" id="${id}">
                                <button >إبدا الوصفة</button>
                            </div>
                        </div>
                `
                return continer.innerHTML += q;
            }
            onChildAdded(ref(database, `/recipe`), (snap)=>{
                let data = snap.val()
                for(let i in data){
                    let id = i;
                    let title = data[i].nameOFRicpe;
                    let weight = data[i].weight;
                    let temp = data[i].tempDgree;
                    let timeOfEnd = data[i].totalTime;
                    addCard(title , weight , temp , timeOfEnd, id);
                }
            })
        })
    })
})