"use strict";
(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) { return null }
      else return this.parentElement.closest(selector)
    };
  }(Element.prototype));
  
//DOM ELEMENTS
var burger = document.querySelector('.burger');
var burgerSpan = document.querySelector('.burger span');
var burgerImg = document.querySelector('.burger img');
var menu = document.querySelector('.menu');
var cartCounter = document.querySelector('#cart-counter');
var cartPrice = document.querySelector('#cart-price');
var searchIco = document.querySelector('#search-ico');
var searchInput = document.querySelector('#search');
var searchLabel = document.querySelector('#search-label'); 
//INIT BASKET OBJ
var basket = {}; 
//FUNCTIONS
//CHECK BASKET FUNC
function checkBasket() {
  if (localStorage.getItem('basket') != null) {
    basket = JSON.parse(localStorage.getItem('basket'));
  }
} 
//FUNC FOR CALC FULLPRICE AND COUNTS
function showBasketCounts() {
  var totalCount = 0;
  var sum = 0;

  for (var elem in basket) {
    for (var subElem in basket[elem]) {
      totalCount += basket[elem][subElem].counts;

      for (var good in catalog) {
        if (elem === catalog[good].id) {
          if (catalog[good].discountedPrice != null) {
            sum += basket[elem][subElem].counts * catalog[good].discountedPrice;
          } else {
            sum += basket[elem][subElem].counts * catalog[good].price;
          }
        }
      }
    }
  }
  if (checkBsktForRight() && checkBsktForLeft()) {
    sum = sum - bestOffer.discount;
  }
  if (Object.keys(basket).length != 0) {
    cartPrice.innerHTML = "£" + sum.toFixed(2);
  } else {
    cartPrice.innerHTML = "";
  }
  cartCounter.innerHTML = totalCount;
  return sum.toFixed(2);
}
 //FUNC FOR CHECKING BASKET FOR AVAILABILITY RIGHT BESTOFFERS GOODS
function checkBsktForRight() {
  for (var good in bestOffer.right) {
    if (basket.hasOwnProperty(bestOffer.right[good])) {
      return true;
    }
  }
} 
//FUNC FOR CHECKING BASKET FOR AVAILABILITY LEFT BESTOFFERS GOODS
function checkBsktForLeft() {
  for (var good in bestOffer.left) {
    if (basket.hasOwnProperty(bestOffer.left[good])) {
      return true;
    }
  }
} 
//EVENTS FOR BURGER AND SEARCH-ICO
burger.addEventListener('click', function () {
  if (burgerImg.classList.contains('hidden')) {
    burgerSpan.classList.add('hidden');
    burgerImg.classList.remove('hidden');
  } else {
    burgerSpan.classList.remove('hidden');
    burgerImg.classList.add('hidden');
  }

  menu.classList.toggle('visible');
});
searchIco.addEventListener('click', function () {
  searchInput.classList.toggle('hidden-search-input');
  searchLabel.classList.toggle('hidden-search-label');
}); 
//RUN
checkBasket();
showBasketCounts();