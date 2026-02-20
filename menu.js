// Mobile menu toggle with scroll position handling
let scrollPosition = 0;

function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  
  const isOpening = !mobileMenu.classList.contains('active');
  
  if (isOpening) {
    // Opening menu - save scroll position
    scrollPosition = window.pageYOffset;
    body.style.top = `-${scrollPosition}px`;
  } else {
    // Closing menu - restore scroll position
    body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }
  
  mobileMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  hamburger.classList.toggle('active');
  body.classList.toggle('menu-open');
}
