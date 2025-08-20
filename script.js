
const nav = document.querySelector("nav");
const searchIcon =  document.querySelector("#search-icon");
const divSearchInput = document.querySelector("#div-search input");
const priceRanges = document.querySelectorAll(".price-range-input");

const menuOptions = document.querySelector("#menu-options");
const hamburgerButton = document.querySelector('#hamburguer-button');
const filterButton = document.querySelector("#filter-button");

const modal = document.querySelector(".modal");
const modalCloseDetails = document.querySelector("#close-details");

const btnAddList = document.querySelectorAll(".btn-add");

const products = [
    {   
        name: 'Torradeira elétrica',
        brand: 'Marca X',
        category: 'Eletrodoméstico',
        price: '159,90',
        image: 'imagens/torradeira.jpg'
    },
    {
        name: 'Kit 10 xícaras de porcelana',
        brand: 'Marca Y',
        category: 'Cozinha',
        price: '119,90',
        image: 'imagens/xicaras.jpg'
    },
    {
        name: 'Ferro de passar roupa',
        brand: 'Marca X',
        category: 'Eletrodoméstico',
        price: '148,00',
        image: 'imagens/ferro-de-roupa.jpg'
    },
    {
        name: 'Travesseiro de cama',
        brand: 'Marca Z',
        category: 'Quarto',
        price: '49,90',
        image: 'imagens/travesseiros.jpg'
    },
    {
        name: 'Bicicleta elétrica',
        brand: 'Marca Z',
        category: 'Lazer',
        price: '3.429,90',
        image: 'imagens/bicicleta-eletrica.jpg'
    }
];

products.forEach(prod =>{
    let name = prod['name'];
    let brand = prod['brand'];
    let category = prod['category'];
    let price = prod['price'];
    let image = prod['image'];

    if(!prod['image']){
        image = 'imagens/logo-home.jpg';
    }
    createProduct(name,brand,category,price,image);
});

function createProduct(name, brand, category, price, image){
    const productSection = document.querySelector('section.product-section');
    const product = document.createElement('article');
    const productImg = document.createElement('img');
    const productDescr = document.createElement('div');
    const optionsDiv  = document.createElement('div');
    const btnAdd = document.createElement('button');
    const btnDetails = document.createElement('button');

    product.setAttribute('class', 'product');
    productImg.setAttribute('src', image);
    productImg.setAttribute('alt', 'imagem-produto');
    productDescr.setAttribute('class','product-description');

    const productName = document.createElement('h3');
    const brandP  = document.createElement('p');
    const categoryP  = document.createElement('p');
    const priceP  = document.createElement('p');

    productName.innerHTML = name;
    brandP.innerHTML = 'Marca: ' + brand;
    categoryP.innerHTML = 'Categoria: ' + category;
    priceP.innerHTML = 'Preço: R$' + price;

    productDescr.appendChild(productName);
    productDescr.appendChild(brandP);
    productDescr.appendChild(categoryP);
    productDescr.appendChild(priceP);

    btnAdd.innerHTML = 'Adicionar';
    btnAdd.setAttribute('class', 'btn btn-add');
    btnDetails.innerHTML = 'Detalhes';

    btnDetails.addEventListener("click",()=>{
        modal.style.display = 'flex';
        console.log(btnDetailsList);
    });

    btnDetails.classList.add('btn');
    btnDetails.classList.add('btn-details');

    optionsDiv.appendChild(btnAdd);
    optionsDiv.appendChild(btnDetails);
    productDescr.appendChild(optionsDiv);

    product.appendChild(productImg);
    product.appendChild(productDescr);
    productSection.appendChild(product);
};


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

modalCloseDetails.addEventListener("click",()=>{
    modal.style.display = 'none';
});

window.addEventListener("resize", ()=>{

});

searchIcon.addEventListener("click",()=>{
    divSearchInput.style.left = '39%';
    divSearchInput.style.opacity = '100%';
    divSearchInput.style.width = '55%';
});



