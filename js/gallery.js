/* ============================================================
   LIFE LINE GLOVES — GALLERY + LIGHTBOX JS
   ============================================================ */
(function () {
  'use strict';

  /* ── LIGHTBOX ── */
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');

  let items = [];   // all currently-visible gallery items
  let current = 0;  // current index

  function getVisibleItems() {
    return Array.from(document.querySelectorAll('.gal-item:not([style*="display: none"]):not([style*="display:none"])'));
  }

  function openLightbox(index) {
    items = getVisibleItems();
    if (!items.length) return;
    current = Math.max(0, Math.min(index, items.length - 1));
    showImage(current);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showImage(idx) {
    const item = items[idx];
    if (!item) return;
    const img = item.querySelector('img');
    lbImg.src     = img.src;
    lbImg.alt     = img.alt;
    lbCaption.textContent = item.dataset.caption || img.alt || '';
    lbPrev.style.display = items.length > 1 ? 'flex' : 'none';
    lbNext.style.display = items.length > 1 ? 'flex' : 'none';
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    showImage(current);
  }
  function next() {
    current = (current + 1) % items.length;
    showImage(current);
  }

  // Wire up gallery items
  function bindItems() {
    document.querySelectorAll('.gal-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        // recalculate visible items and find real index
        items = getVisibleItems();
        const idx = items.indexOf(el);
        openLightbox(idx >= 0 ? idx : 0);
      });
    });
  }
  bindItems();

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', prev);
  if (lbNext)  lbNext.addEventListener('click', next);

  // Click outside image closes
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  /* ── FILTER BUTTONS (gallery page) ── */
  const filterBtns = document.querySelectorAll('.gal-filter-btn');
  const galleryItems = document.querySelectorAll('.gal-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach((item) => {
        const cat = item.dataset.category || 'all';
        const show = filter === 'all' || cat === filter;
        item.style.display = show ? '' : 'none';
        // Reset and re-trigger reveal for shown items
        if (show) {
          item.classList.add('visible');
          // handle "wide" class — only apply if 3-col grid is active
          if (window.innerWidth <= 768) {
            item.classList.remove('wide');
          }
        }
      });
    });
  });

})();
