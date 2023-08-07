// Collage page builder
let collages = document.querySelector('.container-collages');

function buildhtmlBox(data){
    let box = `
    <a href="${data.specialLink}">
        <div class="container-card">
            <div class="title-card">
                <h1>${data.name}</h1>
            </div>
            <div class="img">
                <img src="${data.img}" alt="">
            </div>
            <div class="pra">
                <p>${data.desc}</p>
            </div>
        </div>    
    </a>`
    return box
}
// Main Function
async function collagesStart(){
    // Fetch collages data
    let dataFilePath ='/assets/database/data.json'
    data = await (await fetch(dataFilePath)).json();
    data = data['Imam_U'][0]['colleges']
    // container of boxes
    let htmlText =''
    // remove all collages elements, to prepare for new one
    collages.innerHTML =''
    // Builder: Build all Boxes from data
    for(let i=0;i<data.length;i++){
        htmlText += buildhtmlBox(data[i])
    }
    collages.innerHTML = htmlText;
    
}
// Start Main Function
collagesStart();