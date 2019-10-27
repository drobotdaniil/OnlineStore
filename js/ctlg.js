const openFilters = document.querySelector('.show-filters');
const filterBlock = document.querySelector('.stupid');
const btnV = document.querySelector('.btn-v');
const btnX = document.querySelector('.btn-x');
const filters = document.querySelector('.filters .container');
const catalogDiv = document.querySelector('#catalog-out');
openFilters.addEventListener('click', function () {
    if(btnX.classList.contains('hidden')){
        btnV.classList.add('hidden');
        btnX.classList.remove('hidden');
    } else{
        btnV.classList.remove('hidden');
        btnX.classList.add('hidden');
    }
    filterBlock.classList.toggle('visible');
});
filters.addEventListener('change', function(event){
    var target = event.target;
    if(target){
        target.style.backgroundColor = "#f7f7f7";
    }
});
//нужно починить цену
const showCatalog = () =>{
    let out = '';
    for(let i = 0; i <catalog.length; i++){
        out += `<a href="item.html" class="item">
        <div class="item__img">
            <img src="${catalog[i].thumbnail}" alt="${catalog[i].title}">
            <span class="stick-new">NEW</span>
        </div>
        <p class="item__name">${catalog[i].title}</p>
        <div class="item__price">
            <div class="item-price__old"><span></span> £120.00</div>
            <div class="item-price__new">£${(catalog[i].price).toFixed(2)}</div>
        </div>
    </a>`;
    }
    catalogDiv.innerHTML = out;
};
showCatalog();