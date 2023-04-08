export default function initializeCarousel(){
    
    const carousel = document.querySelector('.games-carousel');
    const gameSection = document.querySelector('.game-section');
    const rightButton = document.querySelector('.right');
    const leftButton = document.querySelector('.left'); 

    const carouselWidth = carousel.scrollWidth;
    const gameSectionWidth = gameSection.clientWidth;

    let scrollPosition = 0 

    // Updates carousel scroll position to display each game 
    // based on arrow click or key press
    function updateScrollPosition(delta){
        scrollPosition += delta
        
        if(scrollPosition < 0){
            scrollPosition = carouselWidth - gameSectionWidth
        }
        else if (scrollPosition + gameSectionWidth > carouselWidth){
            scrollPosition = 0
        }

        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        })
    }
    
    // Listeners for arrow button clicks and keydowns
    rightButton.addEventListener('click', () =>  {
        updateScrollPosition(gameSectionWidth);
    });
    
    leftButton.addEventListener('click', () => {
        updateScrollPosition(-gameSectionWidth);
    });

    document.addEventListener('keydown', (event) => {
        event.preventDefault()
        if (event.code == 'ArrowRight'){
            updateScrollPosition(gameSectionWidth);
        }
        else if (event.code == 'ArrowLeft'){
            updateScrollPosition(-gameSectionWidth);
        }
    });
}