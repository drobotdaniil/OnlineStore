const goodDiv = document.querySelector('#good');
const showItem = () => {
    let out = '';
    out += `<div class="good__preview">
                <div class="full-img">
                    <img src="${item.preview[0]}" alt="${item.title}">
                </div>
                <div class="small-img">
                    <img src="${item.preview[0]}" alt="${item.title}">
                    <img src="${item.preview[1]}" alt="${item.title}">
                    <img src="${item.preview[2]}" alt="${item.title}">
                </div>
            </div>
            <div class="good__info good-info">
                <h2 class="good-info__title">${item.title}</h2>
                <p class="good-info__desc">${item.description}</p>
                <p class="good-info__price">£${(item.discountedPrice).toFixed(2)}</p>
                <div class="good-info__size">
                    <span>Size:</span>
                    <input id="size1" type="radio" name="size" value="52">
                    <label for="size1">${item.sizes[0]}</label>
                    <input id="size2" type="radio" name="size" value="54">
                    <label for="size2">${item.sizes[1]}</label>
                    <input id="size3" type="radio" name="size" value="56">
                    <label for="size3">${item.sizes[2]}</label>
                </div>
                <div class="good-info__color">
                    <span>Color:</span>
                    <input id="color1" type="radio" name="color" value="black">
                    <label for="color1">${item.colors[0]}</label>
                    <input id="color2" type="radio" name="color" value="blue">
                    <label for="color2">${item.colors[0]}</label>
                </div>
                <button class="good-info__btn" id="add-to-bag" data-action="${item.id}">Add to bag</button>
            </div>`;
    goodDiv.innerHTML = out;
}
showItem();

const btnAddTo = document.querySelector('#add-to-bag');
btnAddTo.addEventListener('click', function (e) {
    let item = e.target.dataset.action;
    if (basket[item] != undefined) {
        basket[item]++;
    } else {
        basket[item] = 1;
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    showBasketCounts()
});
