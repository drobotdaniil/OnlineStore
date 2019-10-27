const burger = document.querySelector('.burger');
const burgerSpan = document.querySelector('.burger span');
const burgerImg = document.querySelector('.burger img');
const menu = document.querySelector('.menu');
const cartCounter = document.querySelector('#cart-counter');
const cartPrice = document.querySelector('#cart-price');

let basket = {};
const item = {
    id: '80d32566-d81c-4ba0-9edf-0eceda3b4360',
    dateAdded: '2017-01-01T13:26:14.000Z',
    title: 'Dark classic fit suit',
    description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
    discountedPrice: 180.6,
    price: 180.6,
    hasNew: false,
    category: 'men',
    fashion: 'Classical style',
    colors: ['Black', 'Blue'],
    sizes: ['UK 52', 'UK 54', 'UK 56'],
    thumbnail: 'img/catalog/good5.png', // replace with image extracted from item layout
    preview: ['img/item/full.png', 'img/item/small-img.png', 'img/item/small2.png'] // replace with paths to images extracted from item layout
};
burger.addEventListener('click', function () {
    if(burgerImg.classList.contains('hidden')){
        burgerSpan.classList.add('hidden');
        burgerImg.classList.remove('hidden');
    } else{
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
    let sum = 0;
    for (let key in basket) {
        sum += basket[key];
    }
    cartCounter.innerHTML = sum;
    if (Object.keys(basket).length != 0) {
        cartPrice.innerHTML = "£" + (sum * item.discountedPrice).toFixed(2);
    } else {
        cartPrice.innerHTML = "";
    }
}
checkBasket()
showBasketCounts()
