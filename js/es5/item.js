"use strict";
//DOM ELEMENTS
var goodDiv = document.querySelector('#good'); 
//GET ITEM FROM LS AND SET IT IN ITEM

var item = localStorage.getItem('good'); 
//OUT VAR

var out = ''; 
//LOOP FOR CREATING GOOD

for (var key in catalog) {
  if (catalog[key].id == item) {
    out += "<div class=\"good__preview\">\n        <div class=\"full-img\">\n            <img src=\"".concat(catalog[key].preview[0], "\" alt=\"").concat(catalog[key].title, "\" id=\"full-img\">\n        </div>\n        <div class=\"small-img\" id=\"small-img\">\n            <div class=\"dark\"><img src=\"").concat(catalog[key].preview[0], "\" alt=\"").concat(catalog[key].title, "\" data-first></div>\n            <div><img src=\"").concat(catalog[key].preview[1], "\" alt=\"").concat(catalog[key].title, "\" data-second></div>\n            <div><img src=\"").concat(catalog[key].preview[2], "\" alt=\"").concat(catalog[key].title, "\" data-third></div>\n        </div>\n        </div>\n        <div class=\"good__info good-info\">\n        <h2 class=\"good-info__title\">").concat(catalog[key].title, "</h2>\n        <p class=\"good-info__desc\">").concat(catalog[key].description, "</p>");

    if (catalog[key].discountedPrice != null) {
      out += "<p class=\"good-info__price\">\xA3".concat(catalog[key].discountedPrice.toFixed(2), "</p>");
    } else {
      out += "<p class=\"good-info__price\">\xA3".concat(catalog[key].price.toFixed(2), "</p>");
    }

    if (catalog[key].sizes.length !== 0) {
      out += "<div class=\"good-info__size\">\n            <span>Size:</span>";

      for (var i = 0; i < catalog[key].sizes.length; i++) {
        if (i == 0) {
          out += "<input id=\"size".concat(i, "\" type=\"radio\" name=\"size\"  value=\"").concat(catalog[key].sizes[i], "\" checked>\n                    <label for=\"size").concat(i, "\">").concat(catalog[key].sizes[i], "</label>");
        } else {
          out += "<input id=\"size".concat(i, "\" type=\"radio\" name=\"size\"  value=\"").concat(catalog[key].sizes[i], "\">\n                    <label for=\"size").concat(i, "\">").concat(catalog[key].sizes[i], "</label>");
        }
      }

      out += "</div>";
    }

    if (catalog[key].colors.length !== 0) {
      out += " <div class=\"good-info__color\">\n            <span>Color:</span>";

      for (var _i = 0; _i < catalog[key].colors.length; _i++) {
        if (_i == 0) {
          out += "<input id=\"color".concat(_i, "\" type=\"radio\" name=\"color\" value=\"").concat(catalog[key].colors[_i], "\" checked>\n                <label for=\"color").concat(_i, "\">").concat(catalog[key].colors[_i], "</label>");
        } else {
          out += "<input id=\"color".concat(_i, "\" type=\"radio\" name=\"color\" value=\"").concat(catalog[key].colors[_i], "\">\n                <label for=\"color").concat(_i, "\">").concat(catalog[key].colors[_i], "</label>");
        }
      }

      out += "</div>";
    }

    if (catalog[key].colors.length !== 0 && catalog[key].sizes.length !== 0) {
      out += "\n            <button class=\"good-info__btn\" id=\"add-to-bag\" data-action=\"".concat(catalog[key].id, "\">Add to bag</button>\n        </div > ");
    } else {
      out += "\n            <button class=\"good-info__btn\" id=\"add-to-bag\" data-action=\"".concat(catalog[key].id, "\" disabled>Not available</button>\n        </div > ");
    }
  }
}

goodDiv.innerHTML = out; 
//DOM ELEMENTS

var btnAddTo = document.querySelector('#add-to-bag');
var smallImgDiv = document.querySelector('#small-img'); 
//EVENTS
//EVENT FOR SETTING GOOD WITH 'CHECKED' COLOR AND SIZE IN BASKET

btnAddTo.addEventListener('click', function (e) {
  var inputColor = document.querySelector('input[name="color"]:checked').value;
  var inputSize = document.querySelector('input[name="size"]:checked').value;
  var item = e.target.dataset.action;

  if (basket[item] != undefined) {
    if (_.find(basket[item], {
      size: inputSize,
      color: inputColor
    })) {
      _.find(basket[item], {
        size: inputSize,
        color: inputColor
      }).counts++;
    } else {
      basket[item].push({
        counts: 1,
        size: inputSize,
        color: inputColor
      });
    }
  } else {
    basket[item] = [{
      counts: 1,
      size: inputSize,
      color: inputColor
    }];
  }

  localStorage.setItem('basket', JSON.stringify(basket));
  showBasketCounts();
}); 
//EVENT FOR PHOTO SWITCHER
smallImgDiv.addEventListener('click', function (e) {
  smallImgDiv.querySelector('.dark').classList.remove('dark');

  if (e.target.querySelector('img')) {
    document.getElementById("full-img").src = e.target.querySelector('img').src;
  } else {
    document.getElementById("full-img").src = e.target.src;
  }

  var activeElem = e.target.closest('div');

  if (activeElem) {
    activeElem.classList.add('dark');
  }
});