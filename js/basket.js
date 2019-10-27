const basketDiv = document.querySelector('#basketDiv');
const fullPrice = document.querySelector('#full-price');
console.log()
function showBasket() {
    let out = '';
    let sum = 0;
    if (Object.keys(basket).length == 0) {
        out += 'Empty bag';
    } else {
        for (let key in basket) {
            if (key == item.id) {
                test = item;
            }
            out +=
                `<div class="basket__item basket-item">
                    <div class="basket-item__img">
                        <img src="${test.thumbnail}" alt="${test.title}">`;
            if (test.hasNew) {
                out += `<div class="stick-new">NEW</div>`;
            }
            out += `  
                    </div>
                    <div class="basket-item__desc basket-item-desc">
                        <h3 class="basket-item-desc__title">
                            ${test.title}
                        </h3>
                        <h2 class="basket-item__price">
                            £${test.discountedPrice}
                        </h2>
                        <p class="basket-item-desc__color">
                            Color: ${test.colors[0]}
                        </p>
                        <p class="basket-item-desc__size">
                            Size: ${test.sizes[0]}
                        </p>
                        <div class="basket-item-desc__quantity">
                            Quantity:
                            <button class="quantity-minus" data-actminus="${test.id}">&ndash;</button>
                            <span class="quantity">${basket[key]}</span>
                            <button class="quantity-plus" data-actplus="${test.id}">+</button>
                        </div>
                        <button class="basket-item-desc__remove" data-delete="${test.id}">Remove item</button>
                    </div>
                </div>`;
                sum += basket[key]* item.discountedPrice;
        }
    }
    fullPrice.innerHTML = "£" + sum.toFixed(2);
    basketDiv.innerHTML = out;
}
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
checkBasket();
showBasket();