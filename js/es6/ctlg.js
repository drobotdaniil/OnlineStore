// DOM Elements
const filtersBar = document.querySelector('#filters-bar');
const filtersBarH3 = document.querySelector('#filters-bar h3');
const btnOpen = document.querySelector('#btn-open');
const btnClose = document.querySelector('#btn-close');
const filtersDiv = document.querySelector('#filters');
const catalogDiv = document.querySelector('#catalog-out');
const hrAfterFB = document.querySelector(' .filters-bar + .hr');
const showMore = document.querySelector('#show-more');

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
    .filter(item => item.category === "women");

//FUNCTIONS    
// FUNCTION FOR SHOWING CATALOG GOODS

let goodsLength = 7;

const showCatalog = (goods) => {
  let out = '';
  for (let i = 0; i < goods.length; i++) {
    out += `<a href="item.html" class="item" data-action="${goods[i].id}">
        <div class="item__img">
            <img src="${goods[i].thumbnail}" alt="${goods[i].title}">`;
    if (goods[i].hasNew) {
      out += `<span class="stick-new">NEW</span>`;
    }
    out += `</div>
        <p class="item__name">${goods[i].title}</p>
        <div class="item__price">`;
    if (goods[i].price != goods[i].discountedPrice && goods[i].discountedPrice != null) {
      out += `<div class="item-price__old"><span></span> £${(goods[i].price).toFixed(2)}</div>
            <div class="item-price__new">£${(goods[i].discountedPrice).toFixed(2)}</div>`;
    } else if (goods[i].discountedPrice == null) {
      out += `<div class="item-price__new">£${(goods[i].price).toFixed(2)}</div>`;
    } else {
      out += `<div class="item-price__new">£${(goods[i].discountedPrice).toFixed(2)}</div>`;
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
    if (i == goodsLength) {
      break;
    }
  }
  catalogDiv.innerHTML = out;
  showSaleAdv()
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
  let mobileDiv = document.querySelector('#mobile');
  // console.log(mobileDiv)
  let laptopDiv = document.querySelector('#laptop');
  // console.log(laptopDiv)
  let desctopDiv = document.querySelector('#desctop');
  // console.log(desctopDiv)
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
showCatalog(filteredGoods);
//DOM ELMS FOR SALE BLOCK

//RUN SALE
// showSaleAdv();
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
//EVENT FOR FILTERS, IF U CHECK SOME FILTER IN 'CHECKED', IT WILL BE PAINTED AND UPDATE FILTERBAR ABOVE FILTERS(LAPTOP)
filtersDiv.addEventListener('click', function (e) {

  // if(e.target.tagName === 'INPUT'){
  //   e.stopPropagation();
  // }
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
  filter();
});
//event for show more
showMore.addEventListener('click', function(){
  goodsLength = filteredGoods;
  showCatalog(filteredGoods);
  showMore.style.display = "none";
});




function filter() {
  const filterFashion = document.querySelector('.filters-item__radio[title="Fashion"]');
  const filterColor = document.querySelector('.filters-item__radio[title="Color"]');
  const filterSize = document.querySelector('.filters-item__radio[title="Size"]');
  const checkedFashion = filterFashion.querySelector('input:checked').value;
  const checkedColor = filterColor.querySelector('input:checked').value;
  const checkedSize = filterSize.querySelector('input:checked').value;

  let newGoods = Object.assign(filteredGoods);
  if (checkedFashion === "Not selected") {
    newGoods = newGoods;
  } else {
    newGoods = newGoods.filter(item => item.fashion === checkedFashion);
  }
  if (checkedColor === "Not selected") {
    newGoods = newGoods;
  } else {
    newGoods = newGoods.filter(item => item.colors.indexOf(checkedColor) != -1);
  }
  if (checkedSize === "Not selected") {
    newGoods = newGoods;
  } else {
    newGoods = newGoods.filter(item => item.sizes.indexOf(checkedSize) != -1);
  }
  showCatalog(newGoods)
}