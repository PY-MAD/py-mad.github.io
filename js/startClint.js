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

setTimeout(() => {
    
    get(ref(database, `/recipe/`)).then((snap)=>{
        let data = snap.val();
        let start = document.querySelectorAll(".start");
        console.log(start)
        for(let i in data){
            start.forEach((item)=>{
                item.addEventListener("click",()=>{
                    let main = document.querySelector("main")
                    main.style.display ="none"
                    let exit = document.querySelector("#exit-start-ricpe");
                    let id = item.id;
                    let OwnerName = i
                    get(ref(database, `/recipe/${OwnerName}/${id}`)).then((snap)=>{
                        let data = snap.val()
                        let content = document.querySelector(".content-recipe")
                        exit.addEventListener("click",()=>{
                            content.innerHTML = " "
                            document.getElementById("start-ricpe").classList.remove("active-start")
                            main.style.display ="flex"
                        })
                        function recipe(ownerRicpe , name , temp,weight , timeOfEnd , dirpsCount){
                            content.innerHTML = " "
                            let q = `
                                
                                    <div class="owner-recipe-start start-str">
                                        <div class="str">مبتكر الوصفة</div>
                                        <div class="name">${ownerRicpe}</div>
                                    </div>
                                    <div class="name-recipe-start start-str">
                                        <div class="str">أسم الوصفة</div>
                                        <div class="name">${name}</div>
                                    </div>
                                    <div class="temp-recipe-start start-str">
                                        <div class="str">درجة الحرارة</div>
                                        <div class="name">${temp}</div>
                                    </div>
                                    <div class="weight-recipe-start start-str">
                                        <div class="str">الوزن</div>
                                        <div class="name">${weight}</div>
                                    </div>
                                    <div class="timeOfEnd-recipe-start start-str">
                                        <div class="str">الوقت المتوقع للانتهاء</div>
                                        <div class="name">${timeOfEnd}</div>
                                    </div>
                                    <div class="countDrips-recipe-start start-str">
                                        <div class="str">عدد الصبات</div>
                                        <div class="name">${dirpsCount}</div>
                                    </div>
                            `
                            return content.innerHTML = q;
                        }
                        function addDrips(drips , count){
                            let q = `
                                <div class="drip-recipe-start-${count} start-str">
                                    <div class="str">الصبة رقم ${count}</div>
                                    <div class="name">${drips}</div>
                                </div>
                            `
                            return content.innerHTML += q;
                        }
                        for(let i in data){
                            let user = OwnerName;
                            let name = data.nameOFRicpe;
                            let temp = data.tempDgree;
                            let weight = data.weight;
                            let finalTime = data.totalTime;
                            let countOfDrip = data.countDrips;
                            recipe(user , name , temp , weight, finalTime , countOfDrip)
                        }
                        for(let i in data.drips){
                            addDrips(data.drips[i].drip , ++i)
                        }
                        let start_sec = document.getElementById("start-ricpe")
                        start_sec.classList.add("active-start")
                    })
                })
            })
        }
    })
}, 1500);