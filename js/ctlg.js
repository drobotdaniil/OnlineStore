const filtersBar = document.querySelector('#filters-bar');
const filterBlock = document.querySelector('.stupid');
const btnV = document.querySelector('.btn-v');
const btnX = document.querySelector('.btn-x');
const filters = document.querySelector('.filters .container');
const catalogDiv = document.querySelector('#catalog-out');

const saleDiv = `<div class="sale-adv">
                    <h3>Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags</h3> 
                    <p>This offer is valid in-store and online. Prices displayed reflect this additional discount. This
                    offer ends at 11:59 GMT on March 1st 2019</p>
                </div>`;

const filteredGoods =
    _.sortBy(catalog, ['dateAdded'])
        .reverse()
        .filter(item => item.category === "women" && item.fashion === "Casual style");

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
        if (i == 1) {
            out += `<div id="mobile" class="mobile"></div>`;
        }
        if (i == 2) {
            out += `<div id="laptop" class="laptop"></div>`;
        }
        if (i == 3) {
            out += `<div id="desctop" class="desctop"></div>`;
        }
    }
    catalogDiv.innerHTML = out;
};
showCatalog();

const mobileDiv = document.querySelector('#mobile');
const laptopDiv = document.querySelector('#laptop');
const desctopDiv = document.querySelector('#desctop');

showSaleAdv();
catalogDiv.addEventListener('click', function (e) {
    if (!e.target.closest('a')) return;

    let item = e.target.closest('a').dataset.action;

    if (item) {
        localStorage.setItem('good', item);
    }
});
window.addEventListener('resize', function () {
    showSaleAdv();
});
// openFilters.addEventListener('click', function () {
//     if (btnX.classList.contains('hidden')) {
//         btnV.classList.add('hidden');
//         btnX.classList.remove('hidden');
//     } else {
//         btnV.classList.remove('hidden');
//         btnX.classList.add('hidden');
//     }
//     filterBlock.classList.toggle('visible');
// });
// filters.addEventListener('change', function (event) {
//     var target = event.target;
//     if (target) {
//         target.style.backgroundColor = "#f7f7f7";
//     }
// });
filtersBar.addEventListener('click', function () {
    filtersDiv.classList.toggle('visible');
});
function showSaleAdv() {
    if (screen.width >= 1024) {
        laptopDiv.style.display = "none";
        mobileDiv.style.display = "none";
        desctopDiv.style.display = "block";
        desctopDiv.innerHTML = saleDiv;
    } else if (screen.width >= 768 && screen.width <= 1024) {
        desctopDiv.style.display = "none";
        mobileDiv.style.display = "none";
        laptopDiv.style.display = "block";
        laptopDiv.innerHTML = saleDiv;
    } else {
        desctopDiv.style.display = "none";
        laptopDiv.style.display = "none";
        mobileDiv.style.display = "block";
        mobileDiv.innerHTML = saleDiv;
    }
}
const filtersDiv = document.querySelector('.filters');

filtersDiv.addEventListener('click', function (e) {

    const filtersItem = e.target.closest('div[current]');
    const filterTitle = filtersItem.querySelector('.filters-item__title');
    const selected = filtersItem.querySelector('.filters-item__selected');
    let checked = filtersItem.querySelector('input:checked');
    filtersItem.style.background = "#e5e5e5";
    filterTitle.classList.add('filter-selected');
    selected.innerHTML = checked.value;
    if (checked.value == "Not selected") {
        selected.innerHTML = "";
        filtersItem.style.background = "#ffffff";
        filterTitle.classList.remove('filter-selected');
    }
})