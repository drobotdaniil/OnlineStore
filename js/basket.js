const basketDiv = document.querySelector('#basketDiv');
const fullPrice = document.querySelector('#full-price');
const summaryBlock = document.querySelector("#summary-price");
const emptyBtn = document.querySelector("#empty-btn");
const buyBtn = document.querySelector('#buy-btn');

function showBasket() {
    let out = '';
    let sum = 0;
    if (Object.keys(basket).length == 0) {
        out += '<div class="empty-info">Your shopping bag is empty. Use Catalog to add new items</div>';
        summaryBlock.style.display = "none";
    }
    else {
        for (let elem in basket) {
            for (let subElem in basket[elem]) {
                for (let good in catalog) {
                    if (elem === catalog[good].id) {
                        out += `<div class="basket__item basket-item">
                        <div class="basket-item__img">
                            <img src="${catalog[good].thumbnail}" alt="${catalog[good].title}">`;
                        if (catalog[good].hasNew) {
                            out += `<div class="stick-new">NEW</div>`;
                        }
                        out += `</div>
                    <div class="basket-item__desc basket-item-desc">
                        <h3 class="basket-item-desc__title">
                            ${catalog[good].title}
                        </h3>
                        <h2 class="basket-item__price">`;
                        if (catalog[good].discountedPrice != null) {
                            out += `£${(catalog[good].discountedPrice).toFixed(2)}`;
                        } else {
                            out += `£${(catalog[good].price).toFixed(2)}`;
                        }
                        out += `</h2>
                        <p class="basket-item-desc__color">
                            Color: <span id="color">${basket[elem][subElem].color}</span>
                        </p>
                        <p class="basket-item-desc__size">
                        Size: <span id="size">${basket[elem][subElem].size}</span>
                        </p>
                        <div class="basket-item-desc__quantity">
                            Quantity:
                            <button class="quantity-minus" data-actminus="${catalog[good].id}">&ndash;</button>
                            <span class="quantity">${basket[elem][subElem].counts}</span>  
                            <button class="quantity-plus" data-actplus="${catalog[good].id}">+</button>
                        </div>
                        <button class="basket-item-desc__remove" data-delete="${catalog[good].id}">Remove item</button>
                    </div>
                    </div>`;
                    }
                }
            }
        }
        summaryBlock.style.display = "block";
        fullPrice.innerHTML = "£" + showBasketCounts();
    }
    basketDiv.innerHTML = out;
}
showBasket();
basketDiv.addEventListener('click', function (e) {
    let targetPlus = e.target.dataset.actplus;
    let targetMinus = e.target.dataset.actminus;
    let targetDelete = e.target.dataset.delete;
    let currentBasketItem = e.target.closest('.basket-item');
    if(!currentBasketItem) return;
    let colorSpan = currentBasketItem.querySelector('#color').innerHTML;
    let sizeSpan = currentBasketItem.querySelector('#size').innerHTML;
    if (targetPlus) {
        _.find(basket[targetPlus], { size: sizeSpan, color: colorSpan }).counts++;
        setShow();
    } else if (targetMinus) {
        if (_.find(basket[targetMinus], { size: sizeSpan, color: colorSpan }).counts > 1) {
            _.find(basket[targetMinus], { size: sizeSpan, color: colorSpan }).counts--;
        } else {
            basket[targetMinus] = basket[targetMinus].filter(item => {
                return !(item.color === colorSpan && item.size === sizeSpan);
            });
            if (basket[targetMinus].length === 0) delete basket[targetMinus];
        }
        setShow();
    } else if (targetDelete) {
        basket[targetDelete] = basket[targetDelete].filter(item => {
            return !(item.color === colorSpan && item.size === sizeSpan);
        });
        if (basket[targetDelete].length === 0) delete basket[targetDelete];
        setShow();
    }
});
function setShow() {
    localStorage.setItem('basket', JSON.stringify(basket));
    showBasketCounts();
    showBasket();
}
emptyBtn.addEventListener('click', function () {
    for (let key in basket) {
        delete basket[key];
        localStorage.setItem('basket', JSON.stringify(basket));
    }
    showBasket();
    // checkBasket();
    showBasketCounts();
    window.scrollTo(pageXOffset, 0);
});
buyBtn.addEventListener('click', function () {
    for (let key in basket) {
        delete basket[key];
        localStorage.setItem('basket', JSON.stringify(basket));
    }
    showBasket();
    showBasketCounts();
    basketDiv.innerHTML = '<div class="empty-info">Thank you for your purchase</div>';
    window.scrollTo(pageXOffset, 0);
});