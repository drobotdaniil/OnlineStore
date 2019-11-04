//DOM ELEMENTS
const goodDiv = document.querySelector('#good');
//GET ITEM FROM LS AND SET IT IN ITEM
let item = localStorage.getItem('good');
//OUT VAR
let out = '';
//LOOP FOR CREATING GOOD
for (let key in catalog) {
    if (catalog[key].id == item) {
        out += `<div class="good__preview">
        <div class="full-img">
            <img src="${catalog[key].preview[0]}" alt="${catalog[key].title}" id="full-img">
        </div>
        <div class="small-img" id="small-img">
            <div class="dark"><img src="${catalog[key].preview[0]}" alt="${catalog[key].title}" data-first></div>
            <div><img src="${catalog[key].preview[1]}" alt="${catalog[key].title}" data-second></div>
            <div><img src="${catalog[key].preview[2]}" alt="${catalog[key].title}" data-third></div>
        </div>
        </div>
        <div class="good__info good-info">
        <h2 class="good-info__title">${catalog[key].title}</h2>
        <p class="good-info__desc">${catalog[key].description}</p>`;
        if (catalog[key].discountedPrice != null) {
            out += `<p class="good-info__price">£${(catalog[key].discountedPrice).toFixed(2)}</p>`;
        } else {
            out += `<p class="good-info__price">£${(catalog[key].price).toFixed(2)}</p>`;
        }
        if (catalog[key].sizes.length !== 0) {
            out += `<div class="good-info__size">
            <span>Size:</span>`;
            for (let i = 0; i < catalog[key].sizes.length; i++) {
                if (i == 0) {
                    out += `<input id="size${i}" type="radio" name="size"  value="${catalog[key].sizes[i]}" checked>
                    <label for="size${i}">${catalog[key].sizes[i]}</label>`;
                } else {
                    out += `<input id="size${i}" type="radio" name="size"  value="${catalog[key].sizes[i]}">
                    <label for="size${i}">${catalog[key].sizes[i]}</label>`;
                }
            }
            out += `</div>`;
        }
        if (catalog[key].colors.length !== 0) {
            out += ` <div class="good-info__color">
            <span>Color:</span>`;
            for (let i = 0; i < catalog[key].colors.length; i++) {
                if (i == 0) {
                    out += `<input id="color${i}" type="radio" name="color" value="${catalog[key].colors[i]}" checked>
                <label for="color${i}">${catalog[key].colors[i]}</label>`;
                } else {
                    out += `<input id="color${i}" type="radio" name="color" value="${catalog[key].colors[i]}">
                <label for="color${i}">${catalog[key].colors[i]}</label>`;
                }
            }
            out += `</div>`;
        }
        if (catalog[key].colors.length !== 0 && catalog[key].sizes.length !== 0) {
            out += `
            <button class="good-info__btn" id="add-to-bag" data-action="${catalog[key].id}">Add to bag</button>
        </div > `;
        } else {
            out += `
            <button class="good-info__btn" id="add-to-bag" data-action="${catalog[key].id}" disabled>Not available</button>
        </div > `;
        }
    }
}
goodDiv.innerHTML = out;
//DOM ELEMENTS
const btnAddTo = document.querySelector('#add-to-bag');
const smallImgDiv = document.querySelector('#small-img');
//EVENTS
//EVENT FOR SETTING GOOD WITH 'CHECKED' COLOR AND SIZE IN BASKET
btnAddTo.addEventListener('click', function (e) {
    const inputColor = document.querySelector('input[name="color"]:checked').value;
    const inputSize = document.querySelector('input[name="size"]:checked').value;
    let item = e.target.dataset.action;
    if (basket[item] != undefined) {
        if (_.find(basket[item], { size: inputSize, color: inputColor })) {
            _.find(basket[item], { size: inputSize, color: inputColor }).counts++
        } else {
            basket[item].push({ counts: 1, size: inputSize, color: inputColor });
        }
    } else {
        basket[item] = [{ counts: 1, size: inputSize, color: inputColor }];
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
    let activeElem = e.target.closest('div');
    if (activeElem) {
        activeElem.classList.add('dark');
    }
});
