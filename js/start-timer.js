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



let start = document.querySelector(".start-recipe")
let holder = document.getElementById("holder")
let cirSec = document.getElementById("circle-bar-secitons")
function addCir(i){
    let q = `
    <div class="circle-bar" id="${i}"></div>
    `
    return cirSec.innerHTML += q;
}
function addSteps(i , dirp){
    holder.innerHTML = " "
    let q =`
    <div class="start-sec">
        <div class="drip">الصبة رقم ${i}</div>
        <div class="drip-num">${dirp} ml</div>
    </div>
    `
    return holder.innerHTML = q;
}
function handleNextClick(i, drip, timer, curr) {
    addSteps(i,drip);
    continueTimer(timer , curr)
}
function startTimer(endTime, total)
{
    let endT = `00:${endTime}`
    var startTimestamp = moment().startOf("day");
    let i = 0;
    let timer = setInterval(function() {
        i++;
        startTimestamp.add(1, 'second');
        document.getElementById('prograess-number').innerHTML = startTimestamp.format('mm:ss');
        let t = document.getElementById("prograess-number")
        // let pr = (i/total)*100;
        // console.log(i)
        // t.style.setProperty("--timer-circle", `${pr}%`);
        function updateProgressBar(pr) {
            let root = document.documentElement;
            root.style.setProperty("--timer-circle", `${pr}%`);
            root.style.setProperty("--timer-transition", "all 0.5s ease");
        }
        
        // Inside your timer update function
        let pr = (i / total) * 100;
        updateProgressBar(pr);
        
        if(t.textContent == `${endT}`){
            console.log("we stop now");
            document.querySelector("#i").textContent = i;
            document.querySelector("#next").style.display="block"
            clearInterval(timer);
            
            
        }
        let exit = document.querySelector("#exit-started")
        exit.addEventListener("click",()=>{
            document.getElementById('prograess-number').textContent = "00:00"
            updateProgressBar(0)
            clearInterval(timer)
        })
    }, 1000);
}
function continueTimer(curr, total){
    let st = document.getElementById('prograess-number').textContent;
    var startTimestamp = moment(st, "mm:ss")
    let value = document.querySelector("#i").textContent;
    let i = parseInt(value)
    let timers = setInterval(()=>{
        i++;
        startTimestamp.add(1, 'second');
        document.getElementById('prograess-number').textContent = startTimestamp.format('mm:ss');
        let t = document.getElementById("prograess-number")
        // let pr = (i/total)*100;
        // console.log(i)
        // console.log(total)
        // t.style.setProperty("--timer-circle", `${pr}%`);

        function updateProgressBar(pr) {
            let root = document.documentElement;
            root.style.setProperty("--timer-circle", `${pr}%`);
            root.style.setProperty("--timer-transition", "all 0.5s ease");
        }
        
        // Inside your timer update function
        let pr = (i / total) * 100;
        updateProgressBar(pr);
        
        
        if(t.textContent == `${curr}`){
            console.log("we stop now");
            document.querySelector("#i").textContent = i;
            document.querySelector("#next").style.display="block"
            clearInterval(timers)
            
            
        }
        let exit = document.querySelector("#exit-started")
        exit.addEventListener("click",()=>{
            document.getElementById('prograess-number').textContent = "00:00"
            updateProgressBar(0)
            clearInterval(timers)
        })
    },1000)
}

start.addEventListener("click",()=>{
    let startSec = document.getElementById("started")
    document.querySelector("#start-ricpe").classList.remove("active-start")
    startSec.classList.add("active-start")
    let count = document.querySelector(".countDrips-recipe-start .name").textContent;
    let owner = document.querySelector(".owner-recipe-start .name").textContent;
    let name = document.querySelector(".name-recipe-start .name").textContent;
    let next = document.getElementById("next")
    get(ref(database, `/recipe/${owner}/`)).then((snap)=>{
        let data = snap.val()
        let id = ""
        for(let i in data){
            if(data[i].nameOFRicpe == name){
                id = i;
            }
        }
        get(ref(database, `/recipe/${owner}/${id}/drips`)).then((snap)=>{
            let data = snap.val()
            let drips = []
            let wait = []
            let timer = 0;
            let curr ;
            let total = 0;
            for(let i in data){
                drips.push(data[i].drip)
                wait.push(data[i].waiting)
            }
            console.log(drips)
            console.log(wait)
            for(let i = 2; i<=drips.length; i++){
                addCir(i);
            }
            for(let i in wait){
                total+=parseInt(wait[i]);
            }
            let i = 1;
            
            addSteps(i, drips[0]);
            curr = startTimer(wait[0], total);
            timer+=parseInt(wait[0])
            
            next.addEventListener("click",()=>{
                document.querySelector("#next").style.display="none"
                ++i;
                console.log(curr)
                if(i <= count){
                    let t = `00:${wait[0]}`
                    timer+= parseInt(wait[i-1])
                    let m = moment.duration(timer,"seconds")
                    let formatted = m.format("mm:ss")
                    console.log(formatted)
                    handleNextClick(i,drips[i-1], formatted, total)
                    let cir = document.querySelectorAll(".circle-bar");
                    
                    cir.forEach((item)=>{
                        if(item.id == i){
                            item.classList.add("acitve-circle");
                        }else{
                            if(item.classList.contains("acitve-circle"))
                                item.classList.remove("acitve-circle");
                        }
                    })
                }else{
                    document.querySelector(".sections").classList.add("d-none")
                    document.querySelector(".content-started").classList.add("d-none")
                    document.querySelector("#next").classList.add("d-none")
                    document.querySelector(".bon").classList.remove("d-none")
                }
            })
            let exit = document.querySelector("#exit-started")
            let main = document.querySelector("main")
            exit.addEventListener("click",()=>{
                holder.innerHTML = " "
                cirSec.innerHTML = " "
                document.getElementById("start-ricpe").classList.remove("active-start")
                document.getElementById("started").classList.remove("active-start")
                main.style.display ="flex"
            })
    
        })
    })

})