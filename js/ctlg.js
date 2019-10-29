const openFilters = document.querySelector('.show-filters');
const filterBlock = document.querySelector('.stupid');
const btnV = document.querySelector('.btn-v');
const btnX = document.querySelector('.btn-x');
const filters = document.querySelector('.filters .container');
const catalogDiv = document.querySelector('#catalog-out');

const filteredGoods = 
    _.sortBy(catalog, ['dateAdded'])
    .reverse()
    .filter(item => item.category === "women" && item.fashion === "Casual style");

openFilters.addEventListener('click', function () {
    if (btnX.classList.contains('hidden')) {
        btnV.classList.add('hidden');
        btnX.classList.remove('hidden');
    } else {
        btnV.classList.remove('hidden');
        btnX.classList.add('hidden');
    }
    filterBlock.classList.toggle('visible');
});
filters.addEventListener('change', function (event) {
    var target = event.target;
    if (target) {
        target.style.backgroundColor = "#f7f7f7";
    }
});

const showCatalog = () => {
    let out = '';
    for (let i = 0; i < filteredGoods.length; i++) {
        out += `<a href="item.html" class="item" data-action="${filteredGoods[i].id}">
        <div class="item__img">
            <img src="${filteredGoods[i].thumbnail}" alt="${filteredGoods[i].title}">`;
        if (filteredGoods[i].hasNew) {
            out += `<span class="stick-new">NEW</span>`;
        }
        out += `</div>
        <p class="item__name">${filteredGoods[i].title}</p>
        <div class="item__price">`;
        if (filteredGoods[i].price != filteredGoods[i].discountedPrice && filteredGoods[i].discountedPrice != null) {
            out += `<div class="item-price__old"><span></span> £${(filteredGoods[i].price).toFixed(2)}</div>
            <div class="item-price__new">£${(filteredGoods[i].discountedPrice).toFixed(2)}</div>`;
        } else if (filteredGoods[i].discountedPrice == null) {
            out += `<div class="item-price__new">£${(filteredGoods[i].price).toFixed(2)}</div>`;
        } else {
            out += `<div class="item-price__new">£${(filteredGoods[i].discountedPrice).toFixed(2)}</div>`;
        }
        out += `</div>
    </a>`;
    if(i == 3){
        out += `<div class="sale-adv">
        <h3>Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags</h3>
        <p>This offer is valid in-store and online. Prices displayed reflect this additional discount. This
            offer ends at 11:59 GMT on March 1st 2019</p>
        </div>`;
    }
    }
    catalogDiv.innerHTML = out;
};
showCatalog();

catalogDiv.addEventListener('click', function (e) {
    if (!e.target.closest('a')) return;

    let item = e.target.closest('a').dataset.action;

    if (item) {
        localStorage.setItem('good', item);
    }
});