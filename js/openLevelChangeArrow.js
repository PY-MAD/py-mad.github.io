// Add click level functions
let contentLevels = document.querySelectorAll('.content_levels');
contentLevels.forEach((levl)=>{
    levl.addEventListener('click',()=>{
        // default behavior(closed)
        contentLevels.forEach((e)=>{
            e.classList.add('closed');
        })
        // open level chosed, or close if it open before
        levl.classList.toggle('closed');
    })
})



