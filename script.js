// ═══ NAV TOGGLE ═══
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

// ═══ DROPDOWN (desktop) ═══
document.querySelectorAll('.dropdown').forEach(d => {
  const btn = d.querySelector('.dropdown-toggle');
  if (btn) {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      d.classList.toggle('open');
    });
  }
});
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
});

// ═══ SCROLL REVEAL ═══
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  reveals.forEach(el => io.observe(el));
}

// ═══ TAB CONTROLS ═══
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const shell = btn.closest('.tab-shell');
    if (!shell) return;
    shell.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    shell.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = shell.querySelector('#' + btn.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// ═══ FORM SUBMISSIONS ═══
document.querySelectorAll('.js-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const endpoint = form.dataset.endpoint;
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!endpoint) {
      if (status) status.textContent = 'Form endpoint not configured.';
      return;
    }

    // Collect form data
    const data = {};
    new FormData(form).forEach((val, key) => { data[key] = val; });

    // Disable button
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    if (status) status.textContent = '';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        if (status) status.textContent = 'Received — we'll be in touch within 48 hours.';
        status.style.color = '#45d483';
        form.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        if (status) status.textContent = err.error || 'Something went wrong. Please try again.';
        status.style.color = '#ff6b6b';
      }
    } catch (err) {
      if (status) status.textContent = 'Network error. Please try again.';
      status.style.color = '#ff6b6b';
    }

    // Re-enable button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
