//DOM ELEMENTS
const burger = document.querySelector('.burger');
const burgerSpan = document.querySelector('.burger span');
const burgerImg = document.querySelector('.burger img');
const menu = document.querySelector('.menu');
const cartCounter = document.querySelector('#cart-counter');
const cartPrice = document.querySelector('#cart-price');
const searchIco = document.querySelector('#search-ico');
const searchInput = document.querySelector('#search');
const searchLabel = document.querySelector('#search-label');
//INIT BASKET OBJ
let basket = {};

//FUNCTIONS
//CHECK BASKET FUNC
function checkBasket() {
    if (localStorage.getItem('basket') != null) {
        basket = JSON.parse(localStorage.getItem('basket'));
    }
}
//FUNC FOR CALC FULLPRICE AND COUNTS
function showBasketCounts() {
    let totalCount = 0;
    let sum = 0;
    for (let elem in basket) {
        for (let subElem in basket[elem]) {
            totalCount += basket[elem][subElem].counts;
            for (let good in catalog) {
                if (elem === catalog[good].id) {
                    if (catalog[good].discountedPrice != null) {
                        sum += basket[elem][subElem].counts * catalog[good].discountedPrice;
                    } else {
                        sum += basket[elem][subElem].counts * (catalog[good].price);
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
  for (let good in bestOffer.right) {
    if (basket.hasOwnProperty(bestOffer.right[good])) {
      return true;
    }
  }
}
//FUNC FOR CHECKING BASKET FOR AVAILABILITY LEFT BESTOFFERS GOODS
function checkBsktForLeft() {
  for (let good in bestOffer.left) {
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

