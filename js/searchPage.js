// Gloabla Variables
let longStyleButton = document.querySelector('.longStyle');
let cardsStyleButton = document.querySelector('.cardsStyle');
let results = document.querySelector('.results');
let dirNav = document.querySelector('.directories');
let dataFilePath = '/assets/database/data.json'
let KeysFilePath = '/assets/database/keys.json'

// let searchBar = document.querySelector('.search-bar.show');

// Switch buttons
// when click button 1
longStyleButton.addEventListener('click',()=>{
    longStyleButton.classList.add('active');
    cardsStyleButton.classList.remove('active');

    results.classList.add('long');
    results.classList.remove('cards');
    
});

// when click button 2
cardsStyleButton.addEventListener('click',()=>{
    cardsStyleButton.classList.add('active');
    longStyleButton.classList.remove('active');

    results.classList.add('cards');
    results.classList.remove('long');
});

// Data Fetch
function buildhtmlBox(data){
    let box = document.createElement('div');
    box.classList.add('box')
    let htmlBox=`
    <img src="${data['img']}" alt="img">
    <div class="contentBox">
    <h2>${data['name']}</h2>
    <p>${data['desc']}</p>
    </div>
    
    `
    box.innerHTML = htmlBox
    
    return box;
}


// Get data .json file
// intilize root Directory
let dir = ["Imam_U"]

function fetchMain(point){
    // removeAllElements();
    fetch(dataFilePath)
    .then(response => response.json())
        .then((data) => {
            let dataDir = data[dir[0]];
            let i=point;
            for (const key in dataDir) {
                let k=i;
                let dataDirK = dataDir[key];
                let box = buildhtmlBox(dataDirK);
                function clickfp(){
                    fullPage(dataDirK,k,[key]); 
                    let dirLen = dir.length;
                    DirNavBuild(dataDirK.name,dirLen);
                    box.removeEventListener('click',clickfp);
                }
                box.addEventListener('click',clickfp);
                results.append(box)
                i++;
        }
        })
    }
fetchMain(0);

// Enter Page
function fullPage(data,index,arrDir){

    // Check if there is built in html page, then go to that page 
    if (data['specialLink'] != undefined){
        if(data['blank'] != undefined && data['blank'] == true){
                window.open(
                    data['specialLink'],
                    '_blank' // <- new window.
                );
                return
            }
        else{
            // if there is no blank or blank is value false then in same page navigate
            location.href = data['specialLink']
        }
    }else if(data['samePage'] == true){
        //some code for nested data
        let arrObj = [];
        for(let i in data){
            if(Array.isArray(data[i])){
                arrObj =data[i];
                console.log(arrObj);
            }
        }
        for(let i in arrObj){
            // now arrObj is empty so we can not test
            console.log(i);
        }
        return
    }

    // let branches = document.createElement('div');
    let searchStyleSection= document.querySelector('.searchStyleSection');
    let searchBar= document.querySelector('.search-bar');

    let directories= document.querySelector('.directories');
    let box = (document.querySelectorAll('.box'))[index];

    // branches.classList.add('branches');
    searchStyleSection.classList.add('remove');
    searchBar.classList.add('remove');
    directories.classList.add('fp');
    
    box.classList.remove('box')
    box.classList.add('boxFullPage')
 
    for(let i in arrDir){
        dir.push(arrDir[i])
    }

    if(data['video']!=undefined)
    box.append(buttonPlayerElement(data['video']));//

    removeAllElements();
    results.append(box);
   
    let istherebranch = bldBranches(data);//
    if(!istherebranch)
    box.classList.add('noBranch')

    results.classList.add('fullPage');
    results.classList.add('long');
    results.classList.remove('cards');
    
}

// Remove all element for next Element/s
function removeAllElements(exceptE){
    rc = document.querySelectorAll('.results > *');
    rc2 = document.querySelectorAll('.results > .branches > *');
    branches = document.querySelector('.results .branches');
    for (let i =0 ;i<rc.length;i++) {
        if(rc[i]==exceptE) continue;
        rc[i].remove()
    }
    for (let i =0 ;i<rc2.length;i++) {
        if(rc2[i]==exceptE) continue;
        rc2[i].remove()
    }
    if(branches!=undefined)
    branches.remove();
}

// Build Directory nav
function DirNavBuild(text,dirLen){
    let dirNavSpan = document.createElement('span');
    let dirNavEl = document.createElement('a');
    if(typeof text==='object'){ 
        text =text.name;
    }
    dirNavSpan.innerHTML =">";
    dirNavEl.innerHTML =text;

    dirNav.append(dirNavEl)
    dirNav.append(dirNavSpan)

    dirNavEl.addEventListener('click',()=>{fullDirBuildByLen(dirLen)});
}
// Builder for player video Button
function buttonPlayerElement(vidSrc){
    let buttonPlayer = document.createElement('div');
    buttonPlayer.classList.add('buttonPlayer');
    let buttonVideo = document.createElement('button');
    buttonVideo.innerHTML='<i class="fa-solid fa-play"></i>'
    buttonPlayer.append(buttonVideo);
    
    let videoDiv = (document.createElement('div'));
    videoDiv.classList.add('videoDiv');
    let videoEl = document.createElement('video');
    videoDiv.classList.add('videoEl');
    let closeVideo = document.createElement('button');
    closeVideo.classList.add('closeVideo');

    closeVideo.innerHTML = "X";
    videoEl.setAttribute('src',vidSrc);

    buttonPlayer.addEventListener('click',()=>{
        videoDiv.classList.add('show')
        videoEl.play();
        videoEl.setAttribute('controls','');
        videoEl.setAttribute('loop','');
    })
    closeVideo.addEventListener('click',()=>{
        videoDiv.classList.remove('show');
        videoEl.pause()
        videoEl.removeAttribute('loop','');
    })

    videoDiv.appendChild(videoEl);
    videoDiv.appendChild(closeVideo);
    document.body.append(videoDiv);


    let buttonVideoText = document.createElement('h3').innerHTML="المقطع التعريفي";
    buttonPlayer.append(buttonVideoText);
    return buttonPlayer
}
// For Backward in Dir Nav
async function fullDirBuildByLen(len){
    document.querySelector('.search-bar').classList.add('remove')
    document.querySelector('.searchStyleSection').classList.add('remove');
    document.querySelector('.directories').classList.add('fp');

    let dirTemp =[]
    dirNav.innerHTML =''
    data = await (await fetch(dataFilePath)).json()
    for(let i=0;i<len;i++){
        dirTemp.push(dir[i]);
        if(!Array.isArray(data[dir[i]])){//Yesssssssssssssss, This how you can know is Array of Objects
            let dirLen = dirTemp.length;
            DirNavBuild(data[dir[i]].name,dirLen)
        }
        data = data[dir[i]];
    }
    dir = dirTemp;
    buildFullBoxPage(data)
    bldBranches(data)
    
}
// Builder Sp
function buildFullBoxPage(data){
    removeAllElements()
    let fullPageBox = buildhtmlBox(data)
    fullPageBox.classList.add('boxFullPage', 'long');
    fullPageBox.classList.remove('box')
    
    if(data['video']!=undefined){
     let bp = buttonPlayerElement(data['video']);
     fullPageBox.append(bp);
    }    
    results.append(fullPageBox);
}

function bldBranches(data){
    let branches = document.createElement('div');
    branches.classList.add('branches');
     // Add Nested Data, Like: Majors
     let el ;
     for(const key in data){
             if(!Array.isArray(data[key])) continue;
                 let i = 0;
                 for(let element in data[key]){
                     let dataK =data[key][element]
                     el = buildhtmlBox(dataK);
                     el.classList.add('long')
                     let j=i,box =el;
                     function clickfpEl(){
                         fullPage(dataK,j,[key,j]);
                         let dirLen = dir.length;
                         DirNavBuild(dataK,dirLen)
                         box.removeEventListener('click',clickfpEl);
 
                     }
                     box.addEventListener('click',clickfpEl);
                     branches.append(box);
                     i++;
                 } 
     }
    //  branche checker
     if(branches.innerHTML!="")
     {
         results.append(branches);
         return true
     }
     else
     return false

}


// Search Function
async function search(){
    // Get Data
    searchBarValue=  document.querySelector('.search-bar.show input').value;
    keys = await (await fetch(KeysFilePath)).json();
    data = await (await fetch(dataFilePath)).json();
    // Format Input Value
    words = searchBarValue.split(' ');
    // Build List to Order Data By more seem like what user wants
    matchOrder = []

    // Loop For Input Value and Try Search for 
    for (let i = 0; i < words.length; i++) {
        pointMatch = 0;
        if(keys[words[i]]!=undefined){
            let k = words[i];
            for (let indx = 0; indx < keys[k].length; indx++) {
                // Get dir
                let dir = (keys[k][indx]).split(',')
                // This Function Make sure String is String and Number is Number, If Data can converted to number Then Conver
                dir = dir.map((x)=>{
                    return !isNaN(parseInt(x,10))?parseInt(x,10):x;
                });
                // Get data from data.json
                let pointer = data;
                for (let index = 0; index < dir.length; index++) {
                    pointer = pointer[dir[index]];   
                }
                // flag to check if it newData
                let newData = true
                // Order Data
                for(let d=0;d<matchOrder.length;d++){
                    if(matchOrder[d].nameP==pointer.name){ 
                        matchOrder[d].value = matchOrder[d].value + 1;
                        newData=false;
                    }
                    // console.log(matchOrder);

                }
                
                if(newData==true)
                    matchOrder.push({pointer:pointer,value:1,nameP:pointer.name,dir:dir})
                
            }
        }
    }
    results.innerHTML=''
    // Add Values to more likely seem search-bar value
    for(let d=0;d<matchOrder.length;d++){
        if(matchOrder[d].nameP==searchBarValue){
            matchOrder[d].value = matchOrder[d].value + 50;
        }
        else if((matchOrder[d].nameP).includes(searchBarValue)){
            matchOrder[d].value = matchOrder[d].value + 5;
        }

    }

    // sort By Custom_Compare Function
    matchOrder.sort(custom_compare).reverse();
    // After search, Build HTML page of results
    for(let i=0;i<matchOrder.length;i++){
        let result = buildhtmlBox(matchOrder[i].pointer);
        result.addEventListener('click',()=>{  
             // Check if there is built in html page, then go to that page   
            if (matchOrder[i].pointer['specialLink'] != undefined){
                if(matchOrder[i].pointer['blank'] != undefined && matchOrder[i].pointer['blank'] == true){
                        window.open(
                            matchOrder[i].pointer['specialLink'],
                            '_blank' // <- new window.
                        );
                    }
                else{
                    // if there is no blank or blank is value false then in same page navigate
                    location.href = matchOrder[i].pointer['specialLink']
                }
            }else if(matchOrder[i].pointer['samePage'] ==true){
                //some code for nested data
            }
            results.classList.remove('cards');
            results.classList.add('fullPage','long');
            dir =matchOrder[i].dir;
            fullDirBuildByLen(matchOrder[i].dir.length)
        })
        results.append(result);
    }
}   
// Evens when user Write in search-bar
document.querySelector('.search-bar.show input').addEventListener('keyup',()=>{
    search();
})
// Event when user Click search Button
document.querySelector('.fa-magnifying-glass').addEventListener('click',()=>{
    search();
})
// Function to used it when sort
function custom_compare (a,b) {
    return a.value - b.value;
}