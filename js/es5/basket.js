"use strict";
//DOM ELEMENTS
var basketDiv = document.querySelector('#basketDiv');
var fullPrice = document.querySelector('#full-price');
var summaryBlock = document.querySelector("#summary-price");
var discountPrice = document.querySelector('#discount-price');
var emptyBtn = document.querySelector("#empty-btn");
var buyBtn = document.querySelector('#buy-btn'); 
//FUNCTIONS
//FUNC FOR SHOWING GOODS FROM BASKET OBJ

function showBasket() {
  var out = '';

  if (Object.keys(basket).length == 0) {
    out += '<div class="empty-info">Your shopping bag is empty. Use Catalog to add new items</div>';
    summaryBlock.style.display = "none";
  } else {
    for (var elem in basket) {
      for (var subElem in basket[elem]) {
        for (var good in catalog) {
          if (elem === catalog[good].id) {
            out += "<div class=\"basket__item basket-item\">\n                        <div class=\"basket-item__img\">\n                            <img src=\"".concat(catalog[good].thumbnail, "\" alt=\"").concat(catalog[good].title, "\">");

            if (catalog[good].hasNew) {
              out += "<div class=\"stick-new\">NEW</div>";
            }

            out += "</div>\n                    <div class=\"basket-item__desc basket-item-desc\">\n                        <h3 class=\"basket-item-desc__title\">\n                            ".concat(catalog[good].title, "\n                        </h3>\n                        <h2 class=\"basket-item__price\">");

            if (catalog[good].discountedPrice != null) {
              out += "\xA3".concat(catalog[good].discountedPrice.toFixed(2));
            } else {
              out += "\xA3".concat(catalog[good].price.toFixed(2));
            }

            out += "</h2>\n                        <p class=\"basket-item-desc__color\">\n                            Color: <span id=\"color\">".concat(basket[elem][subElem].color, "</span>\n                        </p>\n                        <p class=\"basket-item-desc__size\">\n                        Size: <span id=\"size\">").concat(basket[elem][subElem].size, "</span>\n                        </p>\n                        <div class=\"basket-item-desc__quantity\">\n                            Quantity:\n                            <button class=\"quantity-minus\" data-actminus=\"").concat(catalog[good].id, "\">&ndash;</button>\n                            <span class=\"quantity\">").concat(basket[elem][subElem].counts, "</span>  \n                            <button class=\"quantity-plus\" data-actplus=\"").concat(catalog[good].id, "\">+</button>\n                        </div>\n                        <button class=\"basket-item-desc__remove\" data-delete=\"").concat(catalog[good].id, "\">Remove item</button>\n                    </div>\n                    </div>");
          }
        }
      }
    }
    if (checkBsktForLeft() && checkBsktForRight()) {
      discountPrice.classList.remove('hidden');
    } else {
      discountPrice.classList.add('hidden');
    }

    summaryBlock.style.display = "block";
    fullPrice.innerHTML = "£" + showBasketCounts();
  }
  basketDiv.innerHTML = out;
} 
//FUNC FOR BASKETDIV EVENT, JUST FOR AWOIDING DUPLICATION
function setShow() {
  localStorage.setItem('basket', JSON.stringify(basket));
  showBasketCounts();
  showBasket();
} //RUN
showBasket();
//EVENTS
//EVENT FOR PLUS/MINUS/DELETE NEEDED GOOD
basketDiv.addEventListener('click', function (e) {
  var targetPlus = e.target.dataset.actplus;
  var targetMinus = e.target.dataset.actminus;
  var targetDelete = e.target.dataset.delete;
  var currentBasketItem = e.target.closest('.basket-item');
  if (!currentBasketItem) return;
  var colorSpan = currentBasketItem.querySelector('#color').innerHTML;
  var sizeSpan = currentBasketItem.querySelector('#size').innerHTML;

  if (targetPlus) {
    _.find(basket[targetPlus], {
      size: sizeSpan,
      color: colorSpan
    }).counts++;
    setShow();
  } else if (targetMinus) {
    if (_.find(basket[targetMinus], {
      size: sizeSpan,
      color: colorSpan
    }).counts > 1) {
      _.find(basket[targetMinus], {
        size: sizeSpan,
        color: colorSpan
      }).counts--;
    } else {
      basket[targetMinus] = basket[targetMinus].filter(function (item) {
        return !(item.color === colorSpan && item.size === sizeSpan);
      });
      if (basket[targetMinus].length === 0) delete basket[targetMinus];
    }
    setShow();
  } else if (targetDelete) {
    basket[targetDelete] = basket[targetDelete].filter(function (item) {
      return !(item.color === colorSpan && item.size === sizeSpan);
    });
    if (basket[targetDelete].length === 0) delete basket[targetDelete];
    setShow();
  }
}); 
//EVENT FOR MAKING EMPTY BASKET
emptyBtn.addEventListener('click', function () {
  for (var key in basket) {
    delete basket[key];
    localStorage.setItem('basket', JSON.stringify(basket));
  }
  showBasket();
  showBasketCounts();
  window.scrollTo(pageXOffset, 0);
}); 
//EVENT FOR CHECKOUT BTN
buyBtn.addEventListener('click', function () {
  for (var key in basket) {
    delete basket[key];
    localStorage.setItem('basket', JSON.stringify(basket));
  }
  showBasket();
  showBasketCounts();
  basketDiv.innerHTML = '<div class="empty-info">Thank you for your purchase</div>';
  window.scrollTo(pageXOffset, 0);
});