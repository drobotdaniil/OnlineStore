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
        for (let item in basket) {
            for (let key in catalog) {
                if (catalog[key].id == item) {
                    out += `<div class="basket__item basket-item">
                        <div class="basket-item__img">
                            <img src="${catalog[key].thumbnail}" alt="${catalog[key].title}">`;
                    if (catalog[key].hasNew) {
                        out += `<div class="stick-new">NEW</div>`;
                    }
                    out += `</div>
                    <div class="basket-item__desc basket-item-desc">
                        <h3 class="basket-item-desc__title">
                            ${catalog[key].title}
                        </h3>
                        <h2 class="basket-item__price">`;
                    if (catalog[key].discountedPrice != null) {
                        out += `£${(catalog[key].discountedPrice).toFixed(2)}`;
                    } else {
                        out += `£${(catalog[key].price).toFixed(2)}`;
                    }
                    out += `</h2>
                        <p class="basket-item-desc__color">
                            Color: ${catalog[key].colors[0]}
                        </p>
                        <p class="basket-item-desc__size">
                        Size: ${catalog[key].sizes[0]}
                        </p>
                        <div class="basket-item-desc__quantity">
                            Quantity:
                            <button class="quantity-minus" data-actminus="${catalog[key].id}">&ndash;</button>
                            <span class="quantity">${basket[item]}</span>  
                            <button class="quantity-plus" data-actplus="${catalog[key].id}">+</button>
                        </div>
                        <button class="basket-item-desc__remove" data-delete="${catalog[key].id}">Remove item</button>
                    </div>
                    </div>`;
                    if (catalog[key].discountedPrice != null) {
                        sum += basket[item] * catalog[key].discountedPrice;
                    } else {
                        sum += basket[item] * (catalog[key].price);
                    }
                    summaryBlock.style.display = "block";
                    fullPrice.innerHTML = "£" + sum.toFixed(2);
                }
            }
        }
    }
    basketDiv.innerHTML = out;
}
showBasket()
basketDiv.addEventListener('click', function (e) {
    let targetPlus = e.target.dataset.actplus;
    let targetMinus = e.target.dataset.actminus;
    let targetDelete = e.target.dataset.delete;
    if (targetPlus) {
        basket[targetPlus]++;
        localStorage.setItem('basket', JSON.stringify(basket));
        showBasketCounts();
        showBasket();
    } else if (targetMinus) {
        if (basket[targetMinus] > 1) basket[targetMinus]--;
        else {
            delete basket[targetMinus];
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        showBasketCounts();
        showBasket();
    } else if (targetDelete) {
        delete basket[targetDelete];
        localStorage.setItem('basket', JSON.stringify(basket));
        showBasketCounts();
        showBasket();
    }
});
emptyBtn.addEventListener('click', function () {
    for (let key in basket) {
        delete basket[key];
        localStorage.setItem('basket', JSON.stringify(basket));
    }
    showBasket();
    checkBasket();
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
// checkBasket();
// showBasket();