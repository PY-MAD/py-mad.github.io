
//  navigate search bar
if(document.querySelector('.nav-bar .search-bar')!=null)
document.querySelector('.nav-bar .search-bar').addEventListener('click',()=>{
    location.href='/pages/searchPage.html';
});

// logo click event; to go to home when click
document.querySelector('.nav-bar .logo').addEventListener('click',()=>{
    location.href='/';
});