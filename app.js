const carousel = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let scrollPos = 0;

// Add event listeners to the container div
carousel.addEventListener('scroll', handleScroll);
prevButton.addEventListener('click', scrollPrev);
nextButton.addEventListener('click', scrollNext);

function handleScroll() {
  scrollPos = carousel.scrollLeft;
}

function scrollPrev() {
  carousel.scrollTo({
    left: scrollPos - 350,
    behavior: 'smooth'
  });
}

function scrollNext() {
  carousel.scrollTo({
    left: scrollPos + 350,
    behavior: 'smooth'
  });
}
