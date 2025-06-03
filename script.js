
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const sliderCards = document.querySelectorAll('.slider-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  let cardWidth = sliderCards[0].offsetWidth + 20; 
  let cardsToShow = calculateCardsToShow();
  let maxIndex = sliderCards.length - cardsToShow;
  
 
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  

  window.addEventListener('resize', function() {
    cardWidth = sliderCards[0].offsetWidth + 20;
    cardsToShow = calculateCardsToShow();
    maxIndex = sliderCards.length - cardsToShow;
    updateSliderPosition();
    updateDots();
  });
  
 
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
      updateDots();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
      updateDots();
    }
  });
  
  function goToSlide(index) {
    currentIndex = index;
    updateSliderPosition();
    updateDots();
  }
  
  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function calculateCardsToShow() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold && currentIndex < maxIndex) {
      
      currentIndex++;
      updateSliderPosition();
      updateDots();
    } else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
      
      currentIndex--;
      updateSliderPosition();
      updateDots();
}
}
});