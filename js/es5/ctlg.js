"use strict";

// DOM Elements
var filtersBar = document.querySelector('#filters-bar');
var filtersBarH3 = document.querySelector('#filters-bar h3');
var btnOpen = document.querySelector('#btn-open');
var btnClose = document.querySelector('#btn-close');
var filtersDiv = document.querySelector('#filters');
var catalogDiv = document.querySelector('#catalog-out');
var hrAfterFB = document.querySelector(' .filters-bar + .hr'); 
//HTML FOR BLOCK BETWEEN CATALOG GOODS

var saleDiv = "<div class=\"sale-adv\">\n                    <h3>Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags</h3> \n                    <p>This offer is valid in-store and online. Prices displayed reflect this additional discount. This\n                    offer ends at 11:59 GMT on March 1st 2019</p>\n                </div>"; //SORT-FILTER FOR CATALOG ARR

var filteredGoods = _.sortBy(catalog, ['dateAdded']).reverse().filter(function (item) {
  return item.category === "women" && item.fashion === "Casual style";
}); 
//FUNCTIONS    
// FUNCTION FOR SHOWING CATALOG GOODS


var showCatalog = function showCatalog() {
  var out = '';

  for (var i = 0; i < filteredGoods.length; i++) {
    out += "<a href=\"item.html\" class=\"item\" data-action=\"".concat(filteredGoods[i].id, "\">\n        <div class=\"item__img\">\n            <img src=\"").concat(filteredGoods[i].thumbnail, "\" alt=\"").concat(filteredGoods[i].title, "\">");

    if (filteredGoods[i].hasNew) {
      out += "<span class=\"stick-new\">NEW</span>";
    }

    out += "</div>\n        <p class=\"item__name\">".concat(filteredGoods[i].title, "</p>\n        <div class=\"item__price\">");

    if (filteredGoods[i].price != filteredGoods[i].discountedPrice && filteredGoods[i].discountedPrice != null) {
      out += "<div class=\"item-price__old\"><span></span> \xA3".concat(filteredGoods[i].price.toFixed(2), "</div>\n            <div class=\"item-price__new\">\xA3").concat(filteredGoods[i].discountedPrice.toFixed(2), "</div>");
    } else if (filteredGoods[i].discountedPrice == null) {
      out += "<div class=\"item-price__new\">\xA3".concat(filteredGoods[i].price.toFixed(2), "</div>");
    } else {
      out += "<div class=\"item-price__new\">\xA3".concat(filteredGoods[i].discountedPrice.toFixed(2), "</div>");
    }

    out += "</div>\n    </a>";

    if (i == 1) {
      out += "<div id=\"mobile\" class=\"mobile\"></div>";
    }

    if (i == 2) {
      out += "<div id=\"laptop\" class=\"laptop\"></div>";
    }

    if (i == 3) {
      out += "<div id=\"desctop\" class=\"desctop\"></div>";
    }
  }

  catalogDiv.innerHTML = out;
}; 
//FUNC FOR FILTERSBAR


function showFiltersBarTitles() {
  var titlesArr = [];
  var checkedInputs = document.querySelectorAll('input:checked');

  for (var i = 0; i < checkedInputs.length; i++) {
    if (checkedInputs[i].defaultValue == "Not selected") {
      titlesArr.push(" " + checkedInputs[i].closest('div').title);
    } else {
      titlesArr.push("<span class='active-filter'> " + checkedInputs[i].defaultValue + "</span>");
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

var mobileDiv = document.querySelector('#mobile');
var laptopDiv = document.querySelector('#laptop');
var desctopDiv = document.querySelector('#desctop');
 //RUN SALE

showSaleAdv(); 
//EVENTS 
//EVENT FOR SETTING CLICKED GOOD's ID IN LOCALSTORAGE 

catalogDiv.addEventListener('click', function (e) {
  if (!e.target.closest('a')) return;
  var item = e.target.closest('a').dataset.action;

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
  var filtersItem = e.target.closest('div[current]');
  var filterTitle = filtersItem.querySelector('.filters-item__title');
  var selected = filtersItem.querySelector('.filters-item__selected');
  var checked = filtersItem.querySelector('input:checked');
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