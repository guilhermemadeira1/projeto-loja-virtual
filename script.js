
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


/*
fazer: trocar createElement por template tag

*/
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

async function renderProducts(){
    const products = await fetchProducts();
    console.log(products);

    products.forEach(prod =>{
        let name = prod['name'];
        let brand = prod['brand'];
        let category = prod['category'];
        let price = prod['price'];
        let image = prod['image'];
        let description = prod['description'];
        let rate = prod['rate'];

        createProduct(name, brand, category, price, image, description,rate);
    });
}
renderProducts();

function createProduct(name, brand, category, price, image, description, rate){
    if(!name){
        name = 'Nome indefinido';
    }
    if(!brand){
        brand = 'Indefinida';
    }
    if(!category){
        category = 'Indefinida';
    }
    if(!price){
        price = 'Indefinido';
    }
    if(!image){
        image = 'imagens/logo-home.jpg';
    }
    if(!description){
        description = 'Informações não foram passadas para este produtos.'
    }
    if(!rate){
        rate = 'Indisponível';
    }

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
    const categoryP  = document.createElement('p');
    const priceP  = document.createElement('p');

    productName.innerHTML = name;
    categoryP.innerHTML = 'Categoria: <strong>' + category + '</strong>';
    priceP.innerHTML = 'Preço: <strong>' + price.toLocaleString('pt-br',{currency: 'BRL', style: 'currency', }) + '</strong>';

    productDescr.appendChild(productName);
    productDescr.appendChild(categoryP);
    productDescr.appendChild(priceP);

    btnAdd.innerHTML = 'Adicionar';
    btnAdd.setAttribute('class', 'btn btn-add');
    btnDetails.innerHTML = 'Detalhes';

    btnDetails.addEventListener("click",()=>{
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
    
        img.src = image;
        close.id = 'close-button';
        close.innerHTML = 'close';
        close.classList.add('material-symbols-outlined');
        close.addEventListener("click",()=>{
            modal.style.display = 'none';
        });
        title.innerHTML = name;

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
        console.log(rate);
        pRate.innerHTML = '<strong>Avaliação</strong>: ';

        if(typeof rate === 'number' && rate > 0){
            for(let i = 0; i < rate; i++){
                pRate.innerHTML += '&#11088;';
            }
        }
        else{
            pRate.innerHTML += rate;
        }

        pCateg.innerHTML = `<strong>Categoria:</strong> ${category}`;
        pBrand.innerHTML = `<strong>Marca:</strong> ${brand}`;
        pPrice.innerHTML = `<strong>Preço:</strong> ${price.toLocaleString('pt-br', {currency: 'BRL', style: 'currency'})}`;
        pDescHeader.innerHTML = `<strong>Descrição: </strong>`;
        pDesc.innerHTML = description;
        const pList = [pRate, pBrand, pCateg, pPrice, pDescHeader, pDesc];
        pList.forEach(p =>{
            data.appendChild(p);
        });
        modal.appendChild(productDetails);
        
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

modal.addEventListener("click", (event)=>{
    console.log('modal clicado'); // não propaga o evento para o conteúdo do modal
    modal.style.display = 'none';
});

searchIcon.addEventListener("click",()=>{
    divSearchInput.style.left = '39%';
    divSearchInput.style.opacity = '100%';
    divSearchInput.style.width = '55%';
});



