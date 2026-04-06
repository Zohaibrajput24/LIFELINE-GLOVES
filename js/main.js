/* Life Line Gloves — Main JS */
(function(){
'use strict';

/* ══ SCROLL REVEAL ══
   Adds .is-visible to .sr / .sr-left / .sr-right / .sr-scale
   CSS fallback shows everything after 2.4s anyway.          */
function initReveal(){
  var sel = '.sr,.sr-left,.sr-right,.sr-scale';
  var els = document.querySelectorAll(sel);
  if(!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  },{threshold:0.12,rootMargin:'0px 0px -30px 0px'});
  els.forEach(function(el){ io.observe(el); });
}

/* ══ COUNTER ANIMATION ══ */
function runCount(el){
  var target = parseInt(el.dataset.target,10);
  if(!target||el.dataset.counted) return;
  el.dataset.counted = '1';
  var dur=1600, start=null;
  (function step(ts){
    if(!start) start=ts;
    var p=Math.min((ts-start)/dur,1), e=1-Math.pow(1-p,3);
    el.textContent=Math.floor(e*target);
    if(p<1) requestAnimationFrame(step); else el.textContent=target;
  })(performance.now());
}
function initCounters(){
  var els = document.querySelectorAll('.hsb-num,.js-count,.wn-n,.sb-num,.stat-big');
  if(!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ runCount(e.target); io.unobserve(e.target); } });
  },{threshold:0.6});
  els.forEach(function(el){ io.observe(el); });
}

/* ══ HEADER ══ */
var hdr=document.getElementById('hdr');
function upHdr(){ if(hdr) hdr.classList.toggle('scrolled',window.scrollY>50); }
window.addEventListener('scroll',upHdr,{passive:true});
upHdr();

/* ══ MOBILE NAV ══ */
var hbg=document.getElementById('hbg'), nav=document.getElementById('nav');
if(hbg&&nav){
  hbg.addEventListener('click',function(){
    var o=nav.classList.toggle('open');
    hbg.classList.toggle('open',o);
    document.body.style.overflow=o?'hidden':'';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){ nav.classList.remove('open'); hbg.classList.remove('open'); document.body.style.overflow=''; });
  });
}

/* ══ PRODUCT TABS ══ */
document.querySelectorAll('.tab-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var sec=document.getElementById(btn.dataset.t);
    if(sec){
      var nH=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||72;
      var tH=(document.querySelector('.tab-bar')||{offsetHeight:0}).offsetHeight;
      window.scrollTo({top:sec.getBoundingClientRect().top+scrollY-nH-tH-6,behavior:'smooth'});
    }
  });
});

/* ══ SMOOTH HASH SCROLL ══ */
document.querySelectorAll('a[href*="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    try{
      var u=new URL(a.href,location.href);
      if(u.pathname.replace(/\/$/,'')!==location.pathname.replace(/\/$/,'')) return;
      if(!u.hash||u.hash==='#') return;
      var t=document.querySelector(u.hash); if(!t) return;
      e.preventDefault();
      var nH=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||72;
      window.scrollTo({top:t.getBoundingClientRect().top+scrollY-nH-12,behavior:'smooth'});
    }catch(_){}
  });
});

/* ══ WHATSAPP FLOAT ══ */
if(!document.querySelector('.wa-float')){
  var wa=document.createElement('a');
  wa.href='https://wa.me/923222229776?text=Hello%20Life%20Line%20Gloves';
  wa.target='_blank'; wa.rel='noopener noreferrer';
  wa.className='wa-float'; wa.setAttribute('aria-label','WhatsApp');
  wa.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10 9.9 9.9 0 01-5-1.3L2 22l1.3-5A9.9 9.9 0 012 12 10 10 0 0112 2z" stroke="currentColor" stroke-width="2"/><path d="M9 11c.4 1 1.2 2.2 2.2 3.1 1 1 2.1 1.7 3.1 1.9l1-1.3 1.7.9c-.4 1.2-1.5 1.6-2.5 1.6C11.8 17.2 7 12.4 7 9.5c0-1 .4-2.1 1.6-2.5L9.5 8 9 11z" fill="currentColor"/></svg>';
  document.body.appendChild(wa);
}

/* ══ INIT ══ */
function init(){ initReveal(); initCounters(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
else init();
window.addEventListener('load',init);

})();
