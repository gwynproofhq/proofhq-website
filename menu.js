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

// Close mobile menu when any link inside it is clicked
document.addEventListener('DOMContentLoaded', function() {
  var mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = link.getAttribute('href');
        // If the menu is open, close it first
        if (mobileMenu.classList.contains('active')) {
          // For anchor links on the same page, close menu then scroll
          if (href && href.startsWith('#')) {
            e.preventDefault();
            toggleMobileMenu();
            // Small delay to let body position reset before scrolling
            setTimeout(function() {
              var target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }, 350);
          } else {
            // For normal page links, just close the menu
            toggleMobileMenu();
          }
        }
      });
    });
  }
});

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
