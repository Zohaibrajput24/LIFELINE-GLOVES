/* ============================================================
   LIFE LINE GLOVES — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  /* ── SCROLL: header + reveal ── */
  const header = document.getElementById('site-header');
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });

  /* ── HAMBURGER / MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close on link click
    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── PRODUCT TAB FILTER (products page) ── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      const section = document.getElementById(target);
      if (section) {
        const offset = document.querySelector('.product-tabs-bar')?.offsetHeight || 0;
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = section.getBoundingClientRect().top + window.scrollY - navH - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── FLOATING WHATSAPP BUTTON ── */
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/923222229776?text=Hello%20Life%20Line%20Gloves%2C%20I%20would%20like%20to%20inquire%20about%20your%20PPE%20products.';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.className = 'wa-float';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '💬';
  document.body.appendChild(wa);

  /* ── SMOOTH ANCHOR SCROLLING ── */
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const hash = url.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const extraOffset = document.querySelector('.product-tabs-bar') ? 60 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - extraOffset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
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
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const val = Math.floor(progress * target);
      const suffix = el.dataset.suffix || '';
      el.textContent = val + suffix;
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
        if (!isNaN(num) && num > 0) {
          animateCount(e.target, num, 1400);
        }
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach((el) => counterObserver.observe(el));

})();
