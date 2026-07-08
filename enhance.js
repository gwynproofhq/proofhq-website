(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STAGGER = '.hero>.wrap, .phero>.wrap, .steps, .grid';
  var BLOCKS  = '.sec-head, .evtable, .ladder, .band .inner, .split, .principles, .benefits, .wrap>.card, .final>.wrap';
  var all = document.querySelectorAll(STAGGER + ', ' + BLOCKS);

  // Pre-stagger the evidence-table rows and their status pills.
  document.querySelectorAll('.evtable').forEach(function (ev) {
    ev.querySelectorAll('.row').forEach(function (r, i) {
      r.style.transitionDelay = (i * 90) + 'ms';
      var s = r.querySelector('.status');
      if (s) s.style.transitionDelay = (i * 90 + 240) + 'ms';
    });
  });

  if (reduce || !('IntersectionObserver' in window)) {
    all.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      if (el.matches(STAGGER)) {
        [].forEach.call(el.children, function (c, i) { c.style.transitionDelay = (i * 70) + 'ms'; });
      }
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  all.forEach(function (t) { io.observe(t); });
})();
