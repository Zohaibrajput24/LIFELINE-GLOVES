(function(){
'use strict';
var tabs = document.querySelectorAll('.ftab');
var ftype = document.getElementById('ftype');
tabs.forEach(function(t){
  t.addEventListener('click',function(){
    tabs.forEach(function(x){ x.classList.remove('active'); });
    t.classList.add('active');
    if(ftype) ftype.value = t.dataset.form;
  });
});
var form = document.getElementById('cform');
var succ = document.getElementById('fsuccess');
var sbtn = document.getElementById('sbtn');
if(!form) return;
function showErr(id,msg){
  var e=document.getElementById('e-'+id); if(e) e.textContent=msg;
  var i=document.getElementById(id); if(i) i.classList.add('err');
}
function clearAll(){
  document.querySelectorAll('.ferr').forEach(function(e){ e.textContent=''; });
  document.querySelectorAll('.err').forEach(function(e){ e.classList.remove('err'); });
}
form.addEventListener('submit',function(e){
  e.preventDefault(); clearAll();
  var ok=true;
  var n=document.getElementById('fname'), nm=n?n.value.trim():'';
  var c=document.getElementById('fcompany'), co=c?c.value.trim():'';
  var em=document.getElementById('femail'), eml=em?em.value.trim():'';
  var mg=document.getElementById('fmsg'), msg=mg?mg.value.trim():'';
  if(!nm){ showErr('fname','Please enter your name.'); ok=false; }
  if(!co){ showErr('fcompany','Please enter your company.'); ok=false; }
  if(!eml||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eml)){ showErr('femail','Valid email required.'); ok=false; }
  if(!msg){ showErr('fmsg','Please describe your requirements.'); ok=false; }
  if(!ok) return;
  sbtn.disabled=true; sbtn.textContent='Sending…';
  setTimeout(function(){
    var sub=encodeURIComponent('[Life Line Gloves] Inquiry from '+co);
    var bod=encodeURIComponent('Name: '+nm+'\nCompany: '+co+'\nEmail: '+eml+'\nMessage: '+msg);
    window.location.href='mailto:info@lifeline-gloves.com?subject='+sub+'&body='+bod;
    form.style.display='none';
    if(succ) succ.style.display='block';
  },900);
});
['fname','fcompany','femail','fmsg'].forEach(function(id){
  var el=document.getElementById(id);
  if(el) el.addEventListener('input',function(){
    el.classList.remove('err');
    var e=document.getElementById('e-'+id); if(e) e.textContent='';
  });
});
})();