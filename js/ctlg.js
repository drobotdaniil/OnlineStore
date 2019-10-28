const openFilters = document.querySelector('.show-filters');
const filterBlock = document.querySelector('.stupid');
const btnV = document.querySelector('.btn-v');
const btnX = document.querySelector('.btn-x');
const filters = document.querySelector('.filters .container');
const catalogDiv = document.querySelector('#catalog-out');

// let good = {};

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
    for (let i = 0; i < catalog.length; i++) {
        out += `<a href="item.html" class="item" data-action="${catalog[i].id}">
        <div class="item__img">
            <img src="${catalog[i].thumbnail}" alt="${catalog[i].title}">`;
        if (catalog[i].hasNew) {
            out += `<span class="stick-new">NEW</span>`;
        }
        out += `</div>
        <p class="item__name">${catalog[i].title}</p>
        <div class="item__price">`;
        if (catalog[i].price != catalog[i].discountedPrice && catalog[i].discountedPrice != null) {
            out += `<div class="item-price__old"><span></span> £${(catalog[i].price).toFixed(2)}</div>
            <div class="item-price__new">£${(catalog[i].discountedPrice).toFixed(2)}</div>`;
        } else if (catalog[i].discountedPrice == null) {
            out += `<div class="item-price__new">£${(catalog[i].price).toFixed(2)}</div>`;
        } else {
            out += `<div class="item-price__new">£${(catalog[i].discountedPrice).toFixed(2)}</div>`;
        }
        out += `</div>
    </a>`;
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