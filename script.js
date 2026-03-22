document.addEventListener('DOMContentLoaded', function () {

  // ═══ NAV TOGGLE ═══
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ═══ DROPDOWN (desktop) ═══
  document.querySelectorAll('.dropdown').forEach(function (d) {
    var btn = d.querySelector('.dropdown-toggle');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        d.classList.toggle('open');
      });
    }
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown.open').forEach(function (d) { d.classList.remove('open'); });
  });

  // ═══ SCROLL REVEAL ═══
  var reveals = document.querySelectorAll('.reveal');

  // Immediately show everything above the fold
  reveals.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('in-view');
    }
  });

  // Observe the rest for scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(function (el) {
      if (!el.classList.contains('in-view')) {
        io.observe(el);
      }
    });
  } else {
    // No IntersectionObserver support — reveal everything
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ═══ TAB CONTROLS ═══
  document.querySelectorAll('.tab-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var shell = btn.closest('.tab-shell');
      if (!shell) return;
      shell.querySelectorAll('.tab-button').forEach(function (b) { b.classList.remove('active'); });
      shell.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = shell.querySelector('#' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // ═══ FORM SUBMISSIONS ═══
  document.querySelectorAll('.js-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var endpoint = form.dataset.endpoint;
      var status = form.querySelector('.form-status');
      var submitBtn = form.querySelector('button[type="submit"]');

      if (!endpoint) {
        if (status) status.textContent = 'Form endpoint not configured.';
        return;
      }

      var data = {};
      new FormData(form).forEach(function (val, key) { data[key] = val; });

      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending\u2026';
      }
      if (status) status.textContent = '';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (res.ok) {
            if (status) {
              status.textContent = 'Received \u2014 we\u2019ll be in touch within 48 hours.';
              status.style.color = '#45d483';
            }
            form.reset();
          } else {
            res.json().catch(function () { return {}; }).then(function (err) {
              if (status) {
                status.textContent = err.error || 'Something went wrong. Please try again.';
                status.style.color = '#ff6b6b';
              }
            });
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Network error. Please try again.';
            status.style.color = '#ff6b6b';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  });

});
