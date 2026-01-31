document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.animateDelay || '0s';
        // apply delay if provided
        if (delay && delay !== '0s') {
          el.style.animationDelay = delay;
        }
        el.classList.remove('scroll-hidden');
        el.classList.add('animate-fade-in-up');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  els.forEach(el => {
    // if not already hidden, ensure hidden state
    if (!el.classList.contains('scroll-hidden')) el.classList.add('scroll-hidden');
    observer.observe(el);
  });
});
