const nike = document.querySelector('#nike');
nike.addEventListener('click', function (e) {
    localStorage.setItem('good', nike.dataset.action);
});