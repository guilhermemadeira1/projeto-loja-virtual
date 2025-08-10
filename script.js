
const nav = document.querySelector("nav");
const searchIcon =  document.querySelector("#search-icon");
const divSearchInput = document.querySelector("#div-search input");
const priceRanges = document.querySelectorAll(".price-range-input");

const menuOptions = document.querySelector("#menu-options");
const hamburgerButton = document.querySelector('#hamburguer-button');
const filterButton = document.querySelector("#filter-button");


hamburgerButton.addEventListener("click", ()=>{
    console.log(menuOptions);
    menuOptions.classList.toggle("menu-open");
    if(menuOptions.classList.contains("menu-open")){
         hamburgerButton.innerHTML = 'close';
    }
    else{
         hamburgerButton.innerHTML = 'menu';
    }
});

filterButton.addEventListener("click", ()=>{
    const priceMobileDiv = document.querySelector(".price-range-mobile-div");
    console.log(priceMobileDiv);

    priceMobileDiv.classList.toggle("price-range-mobile-div-open");

    if(priceMobileDiv.classList.contains("price-range-mobile-div-open")){
        filterButton.innerHTML = 'filter_alt_off';   
    }
    else{
        filterButton.innerHTML = 'filter_alt';
    }
});

priceRanges.forEach(input =>{
    const label = document.querySelector(`label[for='${input.id}']`);

    label.innerHTML = "Preços até: R$" + input.value + ",00";

    input.addEventListener("change", ()=>{
        label.innerHTML = "Preços até: R$" + input.value + ",00";
    });

});

//menuOptions.style.display = 'none';

window.addEventListener("resize", ()=>{

});

window.addEventListener("", )


searchIcon.addEventListener("click",()=>{
    conso
    divSearchInput.style.left = '39%';
    divSearchInput.style.opacity = '100%';
    divSearchInput.style.width = '55%';
});



