"use strict";

//DOM Elements
var nike = document.querySelector('#nike');
var leftArrUp = document.querySelector('#up-arr-left');
var leftArrDown = document.querySelector('#down-arr-left');
var rightArrUp = document.querySelector('#up-arr-right');
var rightArrDown = document.querySelector('#down-arr-right');
var oldPrice = document.querySelector('#old-price');
var newPrice = document.querySelector("#new-price");
var rightItemsGoods = document.querySelector('#right-items-goods');
var leftItemsGoods = document.querySelector('#left-items-goods');
var bestOfferDiv = document.querySelector('#best-offer');
//variables for slides

var leftCurrent = 0;
var rightCurrent = 0; 
//variables for out

var leftOut = '';
var rightOut = ''; 
//loop for left-items-goods

for (var item in bestOffer.left) {
  for (var good in catalog) {
    if (catalog[good].id === bestOffer.left[item]) {
      leftOut += "<a href=\"item.html\" class=\"item\" data-action=\"".concat(catalog[good].id, "\">\n              <div class=\"item__img\">\n                  <img src=\"").concat(catalog[good].thumbnail, "\" alt=\"").concat(catalog[good].title, "\">");

      if (catalog[good].hasNew) {
        leftOut += "<span class=\"stick-new\">NEW</span>";
      }

      leftOut += "</div>\n              <p class=\"item__name\">".concat(catalog[good].title, "</p>\n              <div class=\"item__price\">");

      if (catalog[good].price != catalog[good].discountedPrice && catalog[good].discountedPrice != null) {
        leftOut += "<div class=\"item-price__old\"><span></span> \xA3".concat(catalog[good].price.toFixed(2), "</div>\n                  <div class=\"item-price__new\" id=\"item-price\">\xA3").concat(catalog[good].discountedPrice.toFixed(2), "</div>");
      } else if (catalog[good].discountedPrice == null) {
        leftOut += "<div class=\"item-price__new\" id=\"item-price\">\xA3".concat(catalog[good].price.toFixed(2), "</div>");
      } else {
        leftOut += "<div class=\"item-price__new\" id=\"item-price\">\xA3".concat(catalog[good].discountedPrice.toFixed(2), "</div>");
      }

      leftOut += "</div>\n          </a>";
    }
  }
} 
//loop for left-items-goods
for (var _item in bestOffer.right) {
  for (var _good in catalog) {
    if (catalog[_good].id === bestOffer.right[_item]) {
      rightOut += "<a href=\"item.html\" class=\"item\" data-action=\"".concat(catalog[_good].id, "\">\n              <div class=\"item__img\">\n                  <img src=\"").concat(catalog[_good].thumbnail, "\" alt=\"").concat(catalog[_good].title, "\">");

      if (catalog[_good].hasNew) {
        rightOut += "<span class=\"stick-new\">NEW</span>";
      }

      rightOut += "</div>\n              <p class=\"item__name\">".concat(catalog[_good].title, "</p>\n              <div class=\"item__price\">");

      if (catalog[_good].price != catalog[_good].discountedPrice && catalog[_good].discountedPrice != null) {
        rightOut += "<div class=\"item-price__old\"><span></span> \xA3".concat(catalog[_good].price.toFixed(2), "</div>\n                  <div class=\"item-price__new\" id=\"item-price\">\xA3").concat(catalog[_good].discountedPrice.toFixed(2), "</div>");
      } else if (catalog[_good].discountedPrice == null) {
        rightOut += "<div class=\"item-price__new\" id=\"item-price\">\xA3".concat(catalog[_good].price.toFixed(2), "</div>");
      } else {
        rightOut += "<div class=\"item-price__new\" id=\"item-price\">\xA3".concat(catalog[_good].discountedPrice.toFixed(2), "</div>");
      }

      rightOut += "</div>\n          </a>";
    }
  }
} 
//out
leftItemsGoods.innerHTML = leftOut;
rightItemsGoods.innerHTML = rightOut;

var leftSlides = document.querySelectorAll('.left-items__goods .item');
var rightSlides = document.querySelectorAll('.right-items__goods .item'); 
//FUNCTIONS
//clear all
function resetRight() {
  for (var i = 0; i < rightSlides.length; i++) {
    rightSlides[i].style.display = 'none';
    rightSlides[i].classList.remove('active-item-right');
  }
}
function resetLeft() {
  for (var i = 0; i < leftSlides.length; i++) {
    leftSlides[i].style.display = 'none';
    leftSlides[i].classList.remove('active-item-left');
  }
} 
//functions for first slide on load
function startSlideRight() {
  resetRight();
  rightSlides[0].classList.add('active-item-right');
  rightSlides[0].style.display = 'flex';
  findActiveRight();
}

function startSlideLeft() {
  resetLeft();
  leftSlides[0].classList.add('active-item-left');
  leftSlides[0].style.display = 'flex';
  findActiveLeft();
} 
//show prev slide
function slideUpRight() {
  resetRight();
  rightSlides[rightCurrent - 1].style.display = 'flex';
  rightSlides[rightCurrent - 1].classList.add('active-item-right');
  rightCurrent--;
  findActiveRight();
}

function slideUpLeft() {
  resetLeft();
  leftSlides[leftCurrent - 1].style.display = 'flex';
  leftSlides[leftCurrent - 1].classList.add('active-item-left');
  leftCurrent--;
  findActiveLeft();
} 
//show next slide
function slideDownRight() {
  resetRight();
  rightSlides[rightCurrent + 1].classList.add('active-item-right');
  rightSlides[rightCurrent + 1].style.display = 'flex';
  rightCurrent++;
  findActiveRight();
}

function slideDownLeft() {
  resetLeft();
  leftSlides[leftCurrent + 1].style.display = 'flex';
  leftSlides[leftCurrent + 1].classList.add('active-item-left');
  leftCurrent++;
  findActiveLeft();
} 
//find right good's price
function findActiveRight() {
  var activeRight = document.querySelector('.active-item-right');
  var itemPrice = activeRight.querySelector('#item-price').innerHTML;
  itemPrice = itemPrice.replace('£', '');
  return parseFloat(itemPrice);
} 
//find left good's price
function findActiveLeft() {
  var activeLeft = document.querySelector('.active-item-left');
  var itemPrice = activeLeft.querySelector('#item-price').innerHTML;
  itemPrice = itemPrice.replace('£', '');
  return parseFloat(itemPrice);
}
//calculate current best offer's goods
function calcSummary() {
  oldPrice.innerHTML = "£" + (findActiveLeft() + findActiveRight()).toFixed(2);
  newPrice.innerHTML = "£" + (findActiveLeft() + findActiveRight() - bestOffer.discount).toFixed(2);
} 
//EVENTS
//event for NIKE RED item
nike.addEventListener('click', function () {
  localStorage.setItem('good', nike.dataset.action);
}); 
//event for ADD TO BAG BEST OFFER
bestOfferDiv.addEventListener('click', function (e) {
  var btn = e.target.dataset.add;
  if (!btn) return;
  var leftItem = document.querySelector('.active-item-left').dataset.action;
  var rightItem = document.querySelector('.active-item-right').dataset.action;

  if (basket[rightItem] != undefined) {
    if (_.find(basket[rightItem], {
      size: "Default",
      color: "Default"
    })) {
      _.find(basket[rightItem], {
        size: "Default",
        color: "Default"
      }).counts++;
    } else {
      basket[rightItem].push({
        counts: 1,
        size: "Default",
        color: "Default"
      });
    }
  } else {
    basket[rightItem] = [{
      counts: 1,
      size: "Default",
      color: "Default"
    }];
  }

  if (basket[leftItem] != undefined) {
    if (_.find(basket[leftItem], {
      size: "Default",
      color: "Default"
    })) {
      _.find(basket[leftItem], {
        size: "Default",
        color: "Default"
      }).counts++;
    } else {
      basket[leftItem].push({
        counts: 1,
        size: "Default",
        color: "Default"
      });
    }
  } else {
    basket[leftItem] = [{
      counts: 1,
      size: "Default",
      color: "Default"
    }];
  }

  localStorage.setItem('basket', JSON.stringify(basket));
  showBasketCounts();
}); 
//events for right goods
//up arrow click
rightArrUp.addEventListener('click', function () {
  if (rightCurrent === 0) {
    rightCurrent = rightSlides.length;
  }

  slideUpRight();
  calcSummary();
}); 
//down arrow click

rightArrDown.addEventListener('click', function () {
  if (rightCurrent === rightSlides.length - 1) {
    rightCurrent = -1;
  }

  slideDownRight();
  calcSummary();
}); 
//events for left goods
//up arrow click

leftArrUp.addEventListener('click', function () {
  if (leftCurrent === 0) {
    leftCurrent = leftSlides.length;
  }

  slideUpLeft();
  calcSummary();
}); 
//down arrow click
leftArrDown.addEventListener('click', function () {
  if (leftCurrent === leftSlides.length - 1) {
    leftCurrent = -1;
  }

  slideDownLeft();
  calcSummary();
}); 
//RUN
startSlideRight();
startSlideLeft();
calcSummary();