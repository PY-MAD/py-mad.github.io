// Subjects builder
let level_x_box = document.querySelectorAll(".subjects");
fetch('/json/computer/cs.json').then(res => res.json())
.then(data => {
    // interate in each html level box
    level_x_box.forEach((levl,j)=>{
        // iterate subjects for each level
        for(let i = 0; i < data[j].Subject.length; i+= 1){
            levl.innerHTML +=
            `
                <div class="box">
                    <div class="code">${data[j].code[i]}</div>
                    <div class="box_bottom_content">
                        <div class="subject_name">${data[j].Subject[i]}</div>
                        <div class="time">الساعات : ${data[j].time[i]}</div>
                    </div>
                </div>
                `;
            
        }
        
    })
})