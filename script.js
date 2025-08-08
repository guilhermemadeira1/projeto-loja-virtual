const menu = document.querySelector("#hamburguer");
const nav = document.querySelector("#options");
const searchIcon =  document.querySelector("#search-icon");
const priceRanges = document.querySelectorAll(".price-range-input");

priceRanges.forEach(input =>{
    const label = document.querySelector(`label[for='${input.id}']`);

    label.innerHTML = "Preços até: R$" + input.value + ",00";

    input.addEventListener("change", ()=>{
        label.innerHTML = "Preços até: R$" + input.value + ",00";
    });

});

nav.style.display = 'none';

window.addEventListener("resize", ()=>{
    nav.style.display = 'none';
});

searchIcon.addEventListener("click",()=>{

});

menu.addEventListener("click", ()=>{
    if(nav.style.display === 'flex'){
        nav.style.display = 'none';
    }
    else{
        nav.style.display = 'flex';
    }
});

