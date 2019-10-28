const burger = document.querySelector('.burger');
const burgerSpan = document.querySelector('.burger span');
const burgerImg = document.querySelector('.burger img');
const menu = document.querySelector('.menu');
const cartCounter = document.querySelector('#cart-counter');
const cartPrice = document.querySelector('#cart-price');

let basket = {};

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
function checkBasket() {
    if (localStorage.getItem('basket') != null) {
        basket = JSON.parse(localStorage.getItem('basket'));
    }
}
function showBasketCounts() {
    let counts = 0;
    let sum = 0;
    for (let item in basket) {
        counts += basket[item];
        for (let key in catalog) {
            if (item === catalog[key].id) {
                if (catalog[key].discountedPrice != null) {
                    sum += basket[item] * catalog[key].discountedPrice;
                } else {
                    sum += basket[item] * (catalog[key].price);
                }
            }
        }
    }
    if (Object.keys(basket).length != 0) {
        cartPrice.innerHTML = "£" + sum.toFixed(2);
    } else {
        cartPrice.innerHTML = "";
    }
    cartCounter.innerHTML = counts;
}
checkBasket()
showBasketCounts()
