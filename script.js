/*branch: feat-menu-navegacao*/

const menuMobile = document.querySelector("#menu-mobile");
const searchIcon =  document.querySelector("#search-icon");
const divSearchInput = document.querySelector("#div-search");

const aside = document.querySelector("#aside");

const priceRangeMobileDiv = document.querySelector("#price-range-mobile-div");
const priceRanges = document.querySelectorAll(".price-range-input");
const priceRangeMobile = document.querySelector("#price-range-mobile");
const priceRangeDesktop = document.querySelector("#price-range-desktop");

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

priceRangeMobileDiv.style.height = menuMobile.getBoundingClientRect().height + 'px'; // ajusta o pricemobilediv para ficar da altura do menu

window.addEventListener("load", ()=>{
    if(window.innerWidth <= 620){
        aside.classList.add("hidden");
    }
})

window.addEventListener("resize", ()=>{
    console.log(window.innerWidth)
    priceRangeMobileDiv.style.height = menuMobile.getBoundingClientRect().height + 'px';

    if(window.innerWidth > 620){
        aside.classList.remove("hidden");
    }
    else{
        aside.classList.add("hidden");
    }
} );

window.addEventListener("scroll", ()=>{
    const headerBottomPosition = document.querySelector("header").getBoundingClientRect().bottom;

    if(headerBottomPosition <= 0){
        aside.style.top = '0px';
    }
    else{
        aside.style.top = headerBottomPosition + 'px';
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

function normalizeDefaultValues(product){
    if(objectHasInvalidValues(product)){
        const invalidKeys = getInvalidKeyList(product);
        invalidKeys.forEach(key=>{
            switch(key){
                case 'name': 
                    product.name = 'Nome indisponível'; 
                    break;
                case 'image': 
                    product.image = defaultProductImg; 
                    break;
                case 'description': 
                    product.description = 'Informações não foram passadas para este produto.'; 
                    break;
                case 'rate': 
                    product.rate = 0; 
                    break;
                default:
                    product[key] = 'Indisponível'
            }                
        });
    }
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
    console.log(priceRange)
    const checkedCategoryList = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(categ=> categ.value.toLowerCase());
    const productSection =  document.querySelector("section.product-section");
    const allProducts = await fetchProducts();
    const filteredProducts = [];

    let countResultSet = 0;
    let filterPrice = 0;

    productSection.innerHTML = ''; //remove os produtos renderizados anteriormente

    if(priceRange.value && !isNaN(priceRange.value)){
        filterPrice = Number(priceRange.value); // adiciona o valor do último range não vazio
        console.log(priceRange.value);
    }
    console.log(checkedCategoryList);

    allProducts.forEach(prod =>{
        normalizeDefaultValues(prod);
        const price  = Number(prod.price);

        if(checkedCategoryList.length > 0){
            if(!prod.category || !checkedCategoryList.includes(prod.category.toLowerCase()))
                return; // interrompe a iteração antes de renderizar o produto
        }
      
        if(isNaN(prod.price)) 
            return;

        if(price > filterPrice)
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
    const modal = document.querySelector('.modal');
    const productDetails = document.createElement('div');
    const info = document.createElement('div');
    const header = document.createElement('div');
    const data = document.createElement('div');
    const options = document.createElement('div');

    const title = document.createElement('h3');
    const img = document.createElement('img');
    const close = document.createElement('span');
        
    modal.style.display = 'flex'; // exibe o modal
        
    if(modal.hasChildNodes()){
        modal.innerHTML = '';  //limpa abas de detalhes aberta anteriormente no modal
    }

    img.src = product.image;
    close.id = 'close-button';
    close.innerHTML = 'close';
    close.classList.add('material-symbols-outlined');
    close.addEventListener("click",()=>{
        modal.style.display = 'none';
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

    if(typeof product.rate === 'number' && product.rate > 0){
        for(let i = 0; i < product.rate; i++){
            pRate.innerHTML += '&#11088;';
        }
    }
    else{
        pRate.innerHTML += 'Indisponível';
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
    let {name, brand, category, price, image, description, rate} = product; // converte objeto em variáveis individuais
    if(!name){
        name = 'Nome indisponível';
    }
    if(!brand){
        brand = 'Indisponível';
    }
    if(!category){
        category = 'Indisponível';
    }
    if(!price){
        price = 'Indisponível';
    }
    if(!image){
        image = defaultProductImg;
    }
    if(!description){
        description = 'Informações não foram passadas para este produtos.'
    }
    if(!rate){
        rate = 0;
    }

    const productSection = document.querySelector('section.product-section');
    const productArticle = document.createElement('article');
    const productImg = document.createElement('img');
    const productDescr = document.createElement('div');
    const optionsDiv  = document.createElement('div');
    const btnAdd = document.createElement('button');
    const btnDetails = document.createElement('button');

    productArticle.setAttribute('class', 'product');
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

    productArticle.appendChild(productImg);
    productArticle.appendChild(productDescr);
    productSection.appendChild(productArticle);
};


hamburgerButton.addEventListener("click", ()=>{
    navigationLinksDiv.classList.toggle("navigation-links-div-open");
    if(navigationLinksDiv.classList.contains("navigation-links-div-open")){
         hamburgerButton.innerHTML = 'close';
    }
    else{
         hamburgerButton.innerHTML = 'menu';
    }
});

filterButtons.forEach(btn =>{
    btn.addEventListener("click",(event)=>{
        event.preventDefault(); // impede que a página seja recarregada ao enviar dados do formalario de filtragem
        filterProducts();
    });
});


filterIcon.addEventListener("click",()=>{
    const priceMobileDiv = document.querySelector("#price-range-mobile-div");
    const menuMobile = document.querySelector("#menu-mobile");
    const priceMobileDivHeight = priceMobileDiv.getBoundingClientRect().height;
    const menuHeight = menuMobile.getBoundingClientRect().height;

    priceMobileDiv.classList.toggle("price-range-mobile-div-open");

    if(priceMobileDiv.classList.contains("price-range-mobile-div-open")){
        filterIcon.innerHTML = 'filter_alt_off';
        priceMobileDiv.style.height = (menuHeight + priceMobileDivHeight) + "px"; // altura do range + altura do menu
    }
    else{
        filterIcon.innerHTML = 'filter_alt';
        priceMobileDiv.style.height =  menuHeight + "px"; // altura do menu azul escuro
    }
});

categoryOptionsMobile.forEach(opt =>{
    opt.addEventListener("click",()=>{
        const checkbox = opt.querySelector("input[type='checkbox']");
        const isChecked = checkbox.checked;

        checkbox.addEventListener("click",()=>{
            if(checkbox.checked){
                opt.classList.add("checked-option");
            }
            else{
                opt.classList.remove("checked-option");
            }
        });
        opt.querySelector("input[type='checkbox']") = !isChecked;

        
        console.log(checkbox.checked);      
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

    label.innerHTML = "Preços até: R$" + input.value + ",00";

    input.addEventListener("change", ()=>{
        label.innerHTML = "Preços até: R$" + input.value + ",00";
    });
});

modal.addEventListener("click", (event)=>{
    if(event.target === modal){
        modal.style.display = 'none'; //oculta o modal apeans se o evento for acionado no fundo dele
    }
});

searchIcon.addEventListener("click",()=>{
    divSearchInput.style.left = '39%';
    divSearchInput.style.opacity = '100%';
    divSearchInput.style.width = '55%';
});



