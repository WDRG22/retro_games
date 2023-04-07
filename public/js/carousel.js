export default function initializeCarousel(){
    
    const carousel = document.querySelector('.games-carousel');
    const section = document.querySelector('.game-section');
    const right = document.querySelector('.right');
    const left = document.querySelector('.left');    
    
    right.addEventListener('click', function (e) {
        carousel.scrollLeft += section.clientWidth;
    });
    
    left.addEventListener('click', function () {
        carousel.scrollLeft -= section.clientWidth;
    });
}