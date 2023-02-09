Array.prototype.forEach.call(document.getElementsByClassName('inputFrame'), (element) => {
    element.addEventListener('click', () => {
        document.getElementsByClassName('formTable')[0].style.backdropFilter = "blur(15px)"
    })
})
// document.getElementsByClassName('formTable')[0].addEventListener('click',()=>{
//     document.getElementsByClassName('formTable')[0].style.backdropFilter="blur(11px)"
// })
document.querySelector('body').addEventListener('click', () => {
    if (!isFocus(document.getElementsByClassName('inputFrame')[0]) && !isFocus(document.getElementsByClassName('inputFrame')[1]) && !isFocus(document.getElementsByClassName('inputFrame')[2]) && !isFocus(document.getElementsByClassName('inputFrame')[3])) {
        document.getElementsByClassName('formTable')[0].style.backdropFilter = "blur(0)"
    }
})