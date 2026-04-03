/* ============================================================
   LIFE LINE GLOVES — MAIN JS (FIXED)
   ============================================================ */

(function () {
  'use strict';

  /* ── REVEAL SYSTEM ──
     Elements above the fold become visible immediately.
     Elements below fold animate in on scroll.
  ─────────────────────────────────────────────────────────── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');

    function checkEl(el) {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowH * 0.94) {
        el.classList.add('visible');
        return true;
      }
      return false;
    }

    // Immediately make all currently-visible elements show
    revealEls.forEach(checkEl);

    // IntersectionObserver for below-fold
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => {
      if (!el.classList.contains('visible')) io.observe(el);
    });

    // Scroll fallback
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          revealEls.forEach((el) => {
            if (!el.classList.contains('visible')) checkEl(el);
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── HEADER SCROLL STATE ── */
  const header = document.getElementById('site-header');
  function updateHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── HAMBURGER / MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── PRODUCT TAB FILTER ── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      const section = document.getElementById(target);
      if (section) {
        const tabBar = document.querySelector('.product-tabs-bar');
        const offset = tabBar ? tabBar.offsetHeight : 0;
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = section.getBoundingClientRect().top + window.scrollY - navH - offset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── FLOATING WHATSAPP BUTTON ── */
  if (!document.querySelector('.wa-float')) {
    const wa = document.createElement('a');
    wa.href = 'https://wa.me/923222229776?text=Hello%20Life%20Line%20Gloves%2C%20I%20would%20like%20to%20inquire%20about%20your%20PPE%20products.';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.className = 'wa-float';
    wa.setAttribute('aria-label', 'Chat on WhatsApp');
    wa.innerHTML = '&#128172;';
    document.body.appendChild(wa);
  }

  /* ── SMOOTH ANCHOR SCROLLING ── */
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.pathname.replace(/\/$/, '') !== window.location.pathname.replace(/\/$/, '')) return;
        const hash = url.hash;
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const tabBar = document.querySelector('.product-tabs-bar');
        const extraOffset = tabBar ? tabBar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - extraOffset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      } catch (_) {}
    });
  });

  /* ── PREFILL CONTACT FORM FROM URL PARAMS ── */
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get('product');
  const typeParam = params.get('type');
  if (productParam) {
    const sel = document.getElementById('product');
    if (sel) {
      for (const opt of sel.options) {
        if (opt.value === productParam) { opt.selected = true; break; }
      }
    }
  }
  if (typeParam === 'sample') {
    const sampleTab = document.querySelector('.form-tab[data-form="sample"]');
    if (sampleTab) sampleTab.click();
  }

  /* ── COUNTER ANIMATION ── */
  function animateCount(el, target, duration) {
    const original = el.textContent.trim();
    const suffix = original.replace(/[0-9]/g, '');
    let startTs = null;
    const step = (timestamp) => {
      if (!startTs) startTs = timestamp;
      const progress = Math.min((timestamp - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('.stat-num, .about-stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const raw = e.target.textContent.replace(/[^0-9]/g, '');
        const num = parseInt(raw, 10);
        if (!isNaN(num) && num > 0) animateCount(e.target, num, 1600);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  statEls.forEach((el) => counterObserver.observe(el));

  /* ── INIT on DOM ready AND on window load ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
  window.addEventListener('load', initReveal);

})();
