// DOM Elements
const filtersBar = document.querySelector('#filters-bar');
const filtersBarH3 = document.querySelector('#filters-bar h3');
const btnOpen = document.querySelector('#btn-open');
const btnClose = document.querySelector('#btn-close');
const filtersDiv = document.querySelector('#filters');
const catalogDiv = document.querySelector('#catalog-out');
const hrAfterFB = document.querySelector(' .filters-bar + .hr');

//HTML FOR BLOCK BETWEEN CATALOG GOODS
const saleDiv = `<div class="sale-adv">
                    <h3>Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags</h3> 
                    <p>This offer is valid in-store and online. Prices displayed reflect this additional discount. This
                    offer ends at 11:59 GMT on March 1st 2019</p>
                </div>`;
//SORT-FILTER FOR CATALOG ARR
const filteredGoods =
  _.sortBy(catalog, ['dateAdded'])
    .reverse()
    .filter(item => item.category === "women" && item.fashion === "Casual style");

//FUNCTIONS    
// FUNCTION FOR SHOWING CATALOG GOODS
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
//FUNC FOR FILTERSBAR
function showFiltersBarTitles() {
  let titlesArr = [];
  let checkedInputs = document.querySelectorAll('input:checked');
  for (let i = 0; i < checkedInputs.length; i++) {
    if (checkedInputs[i].defaultValue == "Not selected") {
      titlesArr.push(" " + checkedInputs[i].closest('div').title)
    }
    else {
      titlesArr.push("<span class='active-filter'> " + checkedInputs[i].defaultValue + "</span>")
    }
  }
  return titlesArr;
}
//FUNCT FOR SALE ADV
function showSaleAdv() {
  if (window.innerWidth >= 1024) {
    laptopDiv.style.display = "none";
    mobileDiv.style.display = "none";
    desctopDiv.style.display = "block";
    desctopDiv.innerHTML = saleDiv;
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
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
//RUN
showCatalog();
//DOM ELMS FOR SALE BLOCK
const mobileDiv = document.querySelector('#mobile');
const laptopDiv = document.querySelector('#laptop');
const desctopDiv = document.querySelector('#desctop');
//RUN SALE
showSaleAdv();
//EVENTS 
//EVENT FOR SETTING CLICKED GOOD's ID IN LOCALSTORAGE 
catalogDiv.addEventListener('click', function (e) {
  if (!e.target.closest('a')) return;
  let item = e.target.closest('a').dataset.action;
  if (item) {
    localStorage.setItem('good', item);
  }
});
//EVENT FOR WINDOW, DURING RESIZING IT WILL TURN ON showSaleAdv
window.addEventListener('resize', function () {
  showSaleAdv();
});
//EVENT FOR FILTERS BAR ABOVE FILTERS
filtersBar.addEventListener('click', function () {
  filtersDiv.classList.toggle('visible');
  hrAfterFB.classList.toggle('visible');
  btnClose.classList.toggle('visible');
  btnOpen.classList.toggle('hidden');
});
//EVENT FOR FILTERS, IF U CHECK SOME FILTER IN 'CHECKED', IT WILL BE PAINTED AND UPDATE FILTERBAR ABOBE FILTERS(LAPTOP)
filtersDiv.addEventListener('click', function (e) {
  const filtersItem = e.target.closest('div[current]');
  const filterTitle = filtersItem.querySelector('.filters-item__title');
  const selected = filtersItem.querySelector('.filters-item__selected');
  let checked = filtersItem.querySelector('input:checked');
  filtersItem.classList.add('filters__item-bg-dark');
  filtersItem.classList.remove('filters__item-bg-white');
  filterTitle.classList.add('filter-selected');
  selected.innerHTML = checked.value;
  if (checked.value == "Not selected") {
    selected.innerHTML = "";
    filtersItem.classList.remove('filters__item-bg-dark');
    filtersItem.classList.add('filters__item-bg-white');
    filterTitle.classList.remove('filter-selected');
  }
  filtersBarH3.innerHTML = showFiltersBarTitles();
});

