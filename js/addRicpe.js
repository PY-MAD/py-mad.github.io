// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getDatabase , set , ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
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

function addRcipe(){
    let q = `
        <div class="card-container">
            <div class="card-content">
                <div class="name-of-recipe">
                    فاكهي اثيوبيا هامبيلا
                </div>
                <div class="weight">
                    <div class="name">الوزن</div>
                    <div class="number">20g</div>
                </div>
                <div class="numberOfDrips">
                    <div class="name">عدد الصبات</div>
                    <div class="number">4</div>
                </div>
                <div class="temp">
                    <div class="name">درجة الحرارة</div>
                    <div class="number temp-number">89 &#8451;</div>
                </div>
                <div class="timeOfEnd">
                    <div class="name">الوقت المتوقع</div>
                    <div class="number">2:45</div>
                </div>
            </div>
            <div class="btn">
                <button class="start">إبدا الوصفة</button>
                <button class="edit">تعديل الوصفة</button>
            </div>
    </div>
    `
}
setTimeout(() => {
    let addRec = document.querySelectorAll(".container .card-container");
    addRec.forEach((item)=>{
        item.addEventListener("click",()=>{
            if(item.id == "addRicpe"){
                let id = item.id
                let formAdd = document.querySelector(".form-add-recipe");
                formAdd.classList.remove("add-unactive")
                formAdd.classList.add("add-active")
                document.querySelector(".dark-background").classList.remove("add-unactive")
                item.classList.add("add-active")
                item.classList.remove("add-unactive")
                document.querySelector(".adds-img").classList.add("add-unactive")





            }
        })
    })
    let dripsSec = document.querySelector(".drips")
    function addDrips(e){
        let q = `
        <div class="drips-${e}">
            <input type="number" name="drips-${e}" id="drips-${e}" placeholder="الصبة رقم ${e} ...">
            <input type="number" name="drips-${e}" id="drips-waiting-${e}" placeholder="الإنتظار">
        </div>
        `
        return dripsSec.innerHTML += q;
    }
    
    let drips = document.getElementById("countDrips")
    drips.addEventListener("focusout",()=>{
        dripsSec.innerHTML = "";
        let count = drips.value
        for(let i = 1; i <= count ; i++){
            addDrips(i)
        }
    })


}, 2000);

function check(e){
    if(e != 0 || e != " "){
        return e;
    }else{
        check(e)
    }
}

let secs = document.getElementById("secs")
let mins = document.getElementById("mins")
function addTime(e , id){
    let q = `
        <option value="${e}">${e}</option>
    `
    return id.innerHTML += q;
}

for(let i = 0; i<60 ; i += 5){
    addTime(i, secs)
}
for(let i = 1; i<=5 ; i ++){
    addTime(i, mins)
}

auth.onAuthStateChanged((user)=>{
    let uid = user.uid;
    get(ref(database, `/users`)).then((snap)=>{
        let data = snap.val();
        let id = ""
        let name = ""
        for(let i in data){
            if(data[i].uid == uid){
                name = data[i].name;
            }
        }
            setTimeout(() => {
                
                let save = document.getElementById("save-ricpe");

        save.addEventListener("click",()=>{
            let nameOFRicpe = document.getElementById("nameOfRicpe").value;
            let tempDgree = document.getElementById("tempDgree").value;
            let weight = document.getElementById("weight").value;
            let mins = document.getElementById("mins");
            let minsValue = mins.options[mins.selectedIndex].text; 
            let secs = document.getElementById("secs");
            let secsValue = secs.options[secs.selectedIndex].text;
            let countDrips = document.getElementById("countDrips").value;
            

            let drips = document.querySelectorAll(".drips div input")
            let length_drips = drips.length/2;
            let drip = []
            let wait = []
            let total = 0;
            for(let i = 1; i <= length_drips; i++){
                let drips = document.querySelector(`#drips-${i}`)
                let watitingDrips = document.querySelector(`#drips-waiting-${i}`)
                drip.push(drips.value);
                wait.push(watitingDrips.value);
                total += drips.value;
            }
            var seconds = 140;
            var duration = moment.duration(seconds, 'seconds');
            var formatted = duration.format("hh:mm:ss");
            let time = new Date().getTime()
            set(ref(database, `/recipe/${name}/${time}`),{
                nameOFRicpe:nameOFRicpe,
                tempDgree:tempDgree,
                weight:weight,
                minsValue:minsValue,
                secsValue:secsValue,
                countDrips:countDrips,
                totalTime:formatted
            })
            for(let i = 0; i<drip.length; i++){
                set(ref(database, `/recipe/${name}/${time}/drips/${i}`),{
                    drip:drip[i],
                    waiting: wait[i]
                })
            }
            alert("done !!!")
        })


        let cancelBtn = document.getElementById("cancel-ricpe");
        cancelBtn.addEventListener("click", () => {
                setTimeout(() => {
                    let sec = document.querySelector("#addRicpe")
                    let img = document.querySelector(".card-content .adds-img")
                    let dark = document.querySelector(".dark-background")
                    let form = document.querySelector(".form-add-recipe")
                    console.log(sec)
                    console.log(img)
                    console.log(dark)
                    console.log(form)
                    sec.classList.remove("add-active")
                    img.classList.remove("add-unactive")
                    dark.classList.add("add-unactive")
                    form.classList.remove("add-active")
                    form.classList.add("add-unactive")
                    console.log(sec)
                    console.log(img)
                    console.log(dark)
                    console.log(form)
                }, 100);
        });



            }, 3000);
    })
})

