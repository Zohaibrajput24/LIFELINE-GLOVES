/* ============================================================
   LIFE LINE GLOVES — CONTACT FORM JS
   ============================================================ */

(function () {
  'use strict';

  /* ── FORM TABS ── */
  const formTabs = document.querySelectorAll('.form-tab');
  const formTypeInput = document.getElementById('form_type');
  formTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      formTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (formTypeInput) formTypeInput.value = tab.dataset.form;
    });
  });

  /* ── FORM VALIDATION & SUBMIT ── */
  const form = document.getElementById('contact-form');
  const successDiv = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  function showError(id, msg) {
    const el = document.getElementById(id + '-error');
    const input = document.getElementById(id);
    if (el) el.textContent = msg;
    if (input) input.classList.add('error');
  }
  function clearErrors() {
    document.querySelectorAll('.field-error').forEach((e) => (e.textContent = ''));
    document.querySelectorAll('input, textarea, select').forEach((el) => el.classList.remove('error'));
  }
  function validate() {
    let valid = true;
    const name = document.getElementById('name')?.value.trim();
    const company = document.getElementById('company')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    if (!name) { showError('name', 'Please enter your name.'); valid = false; }
    if (!company) { showError('company', 'Please enter your company name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Please enter a valid email address.'); valid = false; }
    if (!message) { showError('message', 'Please describe your requirements.'); valid = false; }
    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;

    // Collect data
    const data = {
      form_type: formTypeInput?.value || 'quote',
      name: document.getElementById('name')?.value.trim(),
      company: document.getElementById('company')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      phone: document.getElementById('phone')?.value.trim(),
      country: document.getElementById('country')?.value.trim(),
      quantity: document.getElementById('quantity')?.value.trim(),
      product: document.getElementById('product')?.value,
      message: document.getElementById('message')?.value.trim(),
    };

    // Show loading
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnSpinner) btnSpinner.style.display = 'inline';

    // Simulate submission (replace with real endpoint: Formspree/EmailJS/backend)
    setTimeout(() => {
      console.log('Inquiry submitted:', data);
      // Build mailto fallback
      const subject = encodeURIComponent(`[Life Line Gloves] ${data.form_type === 'sample' ? 'Sample' : 'Quote'} Request from ${data.company}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nCountry: ${data.country}\nProduct: ${data.product}\nQuantity: ${data.quantity}\n\nMessage:\n${data.message}`
      );
      // Open mailto as fallback
      window.location.href = `mailto:info@lifeline-gloves.com?subject=${subject}&body=${body}`;
      // Show success
      form.style.display = 'none';
      if (successDiv) successDiv.style.display = 'block';
    }, 900);
  });

  // Real-time validation clear
  ['name','company','email','message'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const err = document.getElementById(id + '-error');
        if (err) err.textContent = '';
      });
    }
  });

})();
