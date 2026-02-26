// Mobile menu toggle with scroll position handling
let scrollPosition = 0;

function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  
  const isOpening = !mobileMenu.classList.contains('active');
  
  if (isOpening) {
    scrollPosition = window.pageYOffset;
    body.style.top = `-${scrollPosition}px`;
  } else {
    body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }
  
  mobileMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  hamburger.classList.toggle('active');
  body.classList.toggle('menu-open');
}

// Demos dropdown — click toggle (works alongside CSS hover)
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-dropdown-toggle');
  var dropdown = document.querySelector('.nav-dropdown');
  if (toggle && dropdown) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
});
