let carousel = document.querySelector('.games-carousel');
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let section = document.querySelector('.game-section');


right.addEventListener('click', function (e) {
    carousel.scrollLeft += section.clientWidth;
    console.log('click')
});

left.addEventListener('click', function () {
    carousel.scrollLeft -= section.clientWidth;
    console.log('click')
});