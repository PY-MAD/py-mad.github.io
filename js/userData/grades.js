import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref,onValue, child, get, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPs6u-21i0E9mxGXWhdlFiCKpkuhrPpBc",
    authDomain: "test-ab03a.firebaseapp.com",
    databaseURL: "https://test-ab03a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-ab03a",
    storageBucket: "test-ab03a.appspot.com",
    messagingSenderId: "19444872261",
    appId: "1:19444872261:web:69de8c91e006b58aa8df2c"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth();
auth.onAuthStateChanged((user)=>{
    let userUid = user.uid;
    let getDataUserQuiz = ref(database, `/users/${userUid}/quiz`)
    let getDataUserAss= ref(database, `/users/${userUid}/homework`)
    let queryQuiz = document.getElementById("quiz-table");
    let querAss = document.getElementById("ass-table");

    function addQuizGrade(nameQuiz , grade , totalGrade){
        let q =`
                <tr>
                    <td>${nameQuiz}</td>
                    <td>${grade}/${totalGrade}</td>
                </tr>
        `
        return queryQuiz.innerHTML += q;
    }
    function addAssGrade(nameQuiz , grade , totalGrade){
        let q =`
                <tr>
                    <td>${nameQuiz}</td>
                    <td>${grade}/${totalGrade}</td>
                </tr>
        `
        return querAss.innerHTML += q;
    }
    get(getDataUserQuiz).then((quiz)=>{
        let data = quiz.val()
        for(let i in data){
            let name = i;
            let grade = data[i].grade;
            let totalGrade = data[i].totalGrade;
            addQuizGrade(name , grade , totalGrade)
        }
    })
    get(getDataUserAss).then((homework)=>{
        let data = homework.val()
        for(let i in data){
            let name = i;
            let grade = data[i].grade;
            let totalGrade = data[i].totalGrade;
            addAssGrade(name , grade , totalGrade)
        }
    })

})