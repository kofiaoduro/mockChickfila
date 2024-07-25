const arrowDown = document.querySelector('.bi-arrow-bar-down')
const arrowUp = document.querySelector('.bi-arrow-bar-up')
const menuLinks = document.querySelector('.menu-links')
const closeBtn = document.querySelector('.fa-x')
const phoneBar = document.querySelector('.phone-bar')
const bars = document.querySelector('.fa-bars')
closeBtn.addEventListener('click', ()=>{
    phoneBar.style.width = 0 ;
    phoneBar.style.transition = '0.4s ease-in-out';
    phoneBar.style.overflowX = 'hidden';
    
})
bars.addEventListener('click', ()=>{
    phoneBar.style.width = '100%';
    phoneBar.style.transition = '0.4s ease-in-out';
})
arrowDown.addEventListener('click', ()=>{
    menuLinks.style.display = 'block'
    arrowUp.style.display = 'block'
    arrowDown.style.display = 'none'
})

arrowUp.addEventListener('click', ()=>{
    menuLinks.style.display = 'none'
    arrowUp.style.display = 'none'
    arrowDown.style.display = 'block'
})
