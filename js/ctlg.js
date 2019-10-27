const openFilters = document.querySelector('.show-filters');
const filterBlock = document.querySelector('.stupid');
const btnV = document.querySelector('.btn-v');
const btnX = document.querySelector('.btn-x');
const filters = document.querySelector('.filters .container');
openFilters.addEventListener('click', function () {
    if(btnX.classList.contains('hidden')){
        btnV.classList.add('hidden');
        btnX.classList.remove('hidden');
    } else{
        btnV.classList.remove('hidden');
        btnX.classList.add('hidden');
    }
    filterBlock.classList.toggle('visible');
});
filters.addEventListener('change', function(event){
    var target = event.target;
    if(target){
        target.style.backgroundColor = "#f7f7f7";
    }
});