/*branch: feat-menu-navegacao*/

const menuMobile = document.querySelector("#menu-mobile");
const searchIcon =  document.querySelector("#search-icon");
const divSearchInput = document.querySelector("#div-search");

const aside = document.querySelector("#aside");

const priceRangeMobileDiv = document.querySelector("#price-range-mobile-div");
const priceRanges = document.querySelectorAll(".price-range-input");
const priceRangeMobile = document.querySelector("#price-range-mobile");
const priceRangeDesktop = document.querySelector("#price-range-desktop");

const navigation = document.querySelector(".navigation");
const navigationLinksDiv = document.querySelector("#navigation-links-div");

const btnClearDesktop = document.querySelector("#btn-clear-desktop");
const btnClearMobile = document.querySelector("#btn-clear-mobile");
const categoryOptionsMobile = document.querySelectorAll(".categories-list > .category-option");

const hamburgerButton = document.querySelector('#hamburguer-button');
const filterIcon = document.querySelector("#filter-icon");
const filterButtons = document.querySelectorAll(".btn-filter");
const filterCleaners = document.querySelectorAll(".btn-clear");

const productSection = document.querySelector("#product-section")

const modal = document.querySelector(".modal");
const modalCloseDetails = document.querySelector("#close-details");

const btnAddList = document.querySelectorAll(".btn-add");
const defaultProductImg = 'imagens/logo-home.jpg';

/*
fazer: trocar createElement por template tag
*/

const deviceBreakpoint = 620; //ponto de quebra desktop para dispositivos mobile

window.addEventListener("DOMContentLoaded", ()=>{
    if(window.innerWidth <= deviceBreakpoint){
        aside.classList.add("hidden");
        priceRangeMobileDiv.classList.remove("hidden");
        priceRangeMobileDiv.classList.add("price-range-mobile-div-closed");
        navigationLinksDiv.classList.remove("hidden");
        navigationLinksDiv.classList.add("navigation-links-div-closed");
    }
    else{
         priceRangeMobileDiv.classList.add("hidden");
    }
})

window.addEventListener("resize", ()=>{
    if(window.innerWidth <= deviceBreakpoint){
        aside.classList.add("hidden");
        priceRangeMobileDiv.classList.remove("hidden");
        navigationLinksDiv.classList.add("navigation-links-div-closed");
    }
    else{
        aside.classList.remove("hidden");
        priceRangeMobileDiv.classList.add("price-range-mobile-div-closed");
        navigationLinksDiv.classList.remove("navigation-links-div-closed");
    }
} );

window.addEventListener("scroll", ()=>{
    if(window.innerWidth > deviceBreakpoint){
        const headerBottomPosition = document.querySelector("header").getBoundingClientRect().bottom;
        if(headerBottomPosition <= 0){
            aside.style.top = '0px';
        }
        else{
            aside.style.top = headerBottomPosition + 'px';
        }
    }
});

function objectHasInvalidValues(obj){
    for(const key in obj){
        if(obj[key] === null || obj[key] === undefined){
            return true;
        }
        else{
            return false;
        }
      
    }
}

function getInvalidKeyList(obj){
    const invalidKeys = [];
    for(const key in obj){
        if(obj[key] === null || obj[key] === undefined){
                invalidKeys.push(key);
            }
        }
    return invalidKeys.lenght > 0 ? invalidKeys : null;
}

async function fetchProducts(){
    let products;
    try{
        const response = await fetch('products.json');
        products = await response.json();
    }
    catch{
        console.error("Erro ao buscar os produtos.")
    }
    return products;
}

async function renderProductSection(){
    const products = await fetchProducts();
    console.log(products);

    products.forEach(prod =>{
        renderProduct(prod);
    });
}
renderProductSection();

function setDefaultValues(product){
    const prod = {...product}; // cria uma cópia do objeto (const prod = product copiaria a referência, não o objeto)
    if(objectHasInvalidValues(prod)){
        const invalidKeys = getInvalidKeyList(prod);
        invalidKeys.forEach(key=>{
            switch(key){
                case 'name': 
                    prod.name = 'Nome indisponível'; 
                    break;
                case 'image': 
                    prod.image = defaultProductImg; 
                    break;
                case 'description': 
                    prod.description = 'Informações não foram passadas para este produto.'; 
                    break;
                case 'rate': 
                    prod.rate = -1; 
                    break;
                default:
                    prod[key] = 'Indisponível'
            }                
        });
    }
    return prod;
}

function getVisibleRangeInput(){
    if(aside.classList.contains("hidden")){
        return priceRangeMobile;
    }
    else{
        return priceRangeDesktop;
    }
}

async function filterProducts(){
    const priceRange = getVisibleRangeInput();
    //console.log(priceRange)
    const checkedCategoryList = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(checkbox => checkbox.value.toLowerCase());
    const productSection =  document.querySelector("section.product-section");
    const allProducts = await fetchProducts();
    const filteredProducts = [];

    let countResultSet = 0;
    let filterPrice = priceRange.max;
    const priceValue = Number(priceRange.value);

    productSection.innerHTML = ''; //remove os produtos renderizados anteriormente

    if(priceValue && !isNaN(priceValue)){
        filterPrice = priceValue;
        console.log(filterPrice); 
    }
    console.log(checkedCategoryList);

    allProducts.forEach(prod =>{
        prod = setDefaultValues(prod);
        const productPrice  = Number(prod.price);

        if(checkedCategoryList.length > 0){
            if(!prod.category || !checkedCategoryList.includes(prod.category.toLowerCase()))
                return; // interrompe a iteração antes de renderizar o produto
        }
        if(isNaN(prod.price)) 
            return;

        if(productPrice > filterPrice)
            return; // interrompe a iteração se o preço do produto for maior que o valor buscado
        
        countResultSet++;
        filteredProducts.push(prod);    
    });
    console.log(filteredProducts); 

    if(filteredProducts.length > 0){
        filteredProducts.forEach(prod =>{
            renderProduct(prod);
        });
    }
    if(countResultSet < 1){
        console.log("Nenhum produto");
        productSection.innerHTML ='<p class="result-message">Nenhum produto encontrado.</p>';
        if(!productSection.classList.contains("empty-product-section")){
            productSection.classList.add("empty-product-section");
        }
    }
}

function clearFilter(){
    productSection.innerHTML = "";
    renderProductSection();
}

function openProductDetails(product){
    const modal = document.querySelector('#modal');
    const productDetails = document.createElement('div');
    const info = document.createElement('div');
    const header = document.createElement('div');
    const data = document.createElement('div');
    const options = document.createElement('div');

    const title = document.createElement('h3');
    const img = document.createElement('img');
    const close = document.createElement('span');
        
    modal.classList.remove('hidden'); // exibe o modal
        
    if(modal.hasChildNodes()){
        modal.innerHTML = '';  //limpa abas de detalhes aberta anteriormente no modal
    }
    img.src = product.image;
    close.id = 'close-button';
    close.innerHTML = 'close';
    close.classList.add('material-symbols-outlined');
    close.addEventListener("click",()=>{
        modal.classList.add('hidden');
    });
    title.innerHTML = product.name;

    productDetails.classList.add('product-details');
    info.classList.add('info');
    header.classList.add('header');
    data.classList.add('data');

    header.appendChild(title);
    header.appendChild(img);
    productDetails.appendChild(close);
    productDetails.appendChild(info);
    info.appendChild(header);
    info.appendChild(data);

    const pRate = document.createElement('p');
    const pCateg = document.createElement('p');
    const pBrand = document.createElement('p');
    const pPrice = document.createElement('p');
    const pDescHeader = document.createElement('p');
    const pDesc = document.createElement('p');
    pDesc.classList.add('description');
    
    const btnAdd2 = document.createElement('button');
    const btnSave = document.createElement('button');
    
    btnAdd2.innerHTML = 'Adicionar';
    btnSave.innerHTML = 'Salvar nos favoritos';
    
    options.classList.add('options');
    btnAdd2.classList.add('btn', 'btn-add');
    btnSave.classList.add('btn');
    options.appendChild(btnAdd2);
    options.appendChild(btnSave);
    productDetails.appendChild(options);
    pRate.innerHTML = '<strong>Avaliação</strong>: ';

    if(typeof product.rate === 'number' && product.rate > -1){
        for(let i = 0; i < product.rate; i++){
            pRate.innerHTML += '&#11088;';
        }
    }
    else{
        pRate.innerHTML += product.rate;
    }

    pCateg.innerHTML = `<strong>Categoria:</strong> ${product.category}`;
    pBrand.innerHTML = `<strong>Marca:</strong> ${product.brand}`;
    pPrice.innerHTML = `<strong>Preço:</strong> ${product.price.toLocaleString('pt-br', {currency: 'BRL', style: 'currency'})}`;
    pDescHeader.innerHTML = `<strong>Descrição: </strong>`;
    pDesc.innerHTML = product.description;

    const pList = [pRate, pBrand, pCateg, pPrice, pDescHeader, pDesc];
    pList.forEach(p =>{
        data.appendChild(p);
    });

    modal.appendChild(productDetails);
}

function renderProduct(product){
    const prod = setDefaultValues(product);
    let {name, brand, category, price, image, description, rate} = prod; // converte objeto em variáveis individuais

    const productSection = document.querySelector('section.product-section');
    const productCard = document.createElement('article');
    const productImg = document.createElement('img');
    const productDescr = document.createElement('div');
    const optionsDiv  = document.createElement('div');
    const btnAdd = document.createElement('button');
    const btnDetails = document.createElement('button');

    productCard.setAttribute('class', 'product');
    productImg.setAttribute('src', image);
    productImg.setAttribute('alt', 'imagem-produto');
    productDescr.setAttribute('class','product-description');

    const productName = document.createElement('h3');
    const categoryP  = document.createElement('p');
    const priceP  = document.createElement('p');

    productName.innerHTML = name;
    categoryP.innerHTML = 'Categoria: <strong>' + category + '</strong>';
    priceP.innerHTML = 'Preço: <strong>' + price.toLocaleString('pt-br',{currency: 'BRL', style: 'currency'}) + '</strong>';

    productDescr.appendChild(productName);
    productDescr.appendChild(categoryP);
    productDescr.appendChild(priceP);

    btnAdd.innerHTML = 'Adicionar';
    btnAdd.setAttribute('class', 'btn btn-add');
    btnDetails.innerHTML = 'Detalhes';

    btnDetails.addEventListener("click",()=>{
        openProductDetails( // as variável são convertidas para chave de objeto 
            {name, brand, category, price, image, description, rate}
        ); 
    });

    btnDetails.classList.add('btn');
    btnDetails.classList.add('btn-details');

    optionsDiv.appendChild(btnAdd);
    optionsDiv.appendChild(btnDetails);
    productDescr.appendChild(optionsDiv);

    productCard.appendChild(productImg);
    productCard.appendChild(productDescr);
    productSection.appendChild(productCard);
};

hamburgerButton.addEventListener("click", ()=>{
    navigationLinksDiv.classList.toggle("navigation-links-div-closed");
   
    if(navigationLinksDiv.classList.contains("navigation-links-div-closed")){
        hamburgerButton.innerHTML = 'menu';
    }
    else{
        hamburgerButton.innerHTML = 'close';
    }
    
});

filterButtons.forEach(btn =>{
    btn.addEventListener("click",(event)=>{
        event.preventDefault(); // impede que a página seja recarregada ao enviar dados do formalario de filtragem
        filterProducts();
    });
});

filterIcon.addEventListener("click",()=>{
    priceRangeMobileDiv.classList.toggle("price-range-mobile-div-closed");

    if(priceRangeMobileDiv.classList.contains("price-range-mobile-div-closed")){
  ;     filterIcon.innerHTML = 'filter_alt';
    }
    else{
        filterIcon.innerHTML = 'filter_alt_off'
    }
});

categoryOptionsMobile.forEach(opt =>{
    opt.addEventListener("click",()=>{
        const checkbox = opt.querySelector("input[type='checkbox']");
        const isChecked = checkbox.checked;

        checkbox.checked = !isChecked;

        if(checkbox.checked){
            opt.classList.add("checked-option");
        }
        else{
            opt.classList.remove("checked-option");
        }
       
    });
});

btnClearDesktop.addEventListener("click", ()=>{
    productSection.innerHTML = "";
    renderProductSection();
});

btnClearMobile.addEventListener("click", ()=>{
    productSection.innerHTML = "";
    renderProductSection();
    categoryOptionsMobile.forEach(opt =>{      
        opt.classList.remove("checked-option");
    });
});

priceRanges.forEach(input =>{ // atualiza o label ao arrastar o range
    const label = document.querySelector(`label[for='${input.id}']`);
    label.innerHTML = "Preços até: " + Number(input.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    input.addEventListener("change", ()=>{
        label.innerHTML = "Preços até: " + Number(input.value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    });
});

modal.addEventListener("click", (event)=>{
    if(event.target === modal){
        modal.style.display = 'none'; //oculta o modal apenas se o evento for acionado no fundo dele
    }
});


