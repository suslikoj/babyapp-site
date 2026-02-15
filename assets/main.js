// Burger menu
(function () {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    const isOpen = !mobileNav.hasAttribute('hidden');
    if (isOpen) {
      mobileNav.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.removeAttribute('hidden');
      burger.setAttribute('aria-expanded', 'true');
    }
  });

  mobileNav.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Footer year
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/**
 * Brevo submit UX (TESTEŘI):
 * - submit -> hidden iframe (no redirect)
 * - show thank-you
 * - reset back
 */
function brevoSubmit() {
  const btn = document.getElementById('brevoBtn');
  const thanks = document.getElementById('brevoThanks');
  const emailInput = document.getElementById('EMAIL_BETA'); // doporučené unikátní ID
  const betaSection = document.getElementById('beta');

  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.85';
    btn.style.cursor = 'not-allowed';
    btn.dataset.originalText = btn.dataset.originalText || btn.textContent.trim();
    btn.textContent = 'Odesílám…';
  }

  window.setTimeout(() => {
    if (thanks) {
      thanks.hidden = false;
      thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (btn) btn.textContent = 'Hotovo ✅';
  }, 500);

  window.setTimeout(() => {
    if (betaSection) {
      betaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.replaceState(null, '', '#beta'); } catch (e) {}
    }

    window.setTimeout(() => {
      if (thanks) thanks.hidden = true;

      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.cursor = '';
        btn.textContent = btn.dataset.originalText || 'ODEBÍRAT';
      }

      if (emailInput) emailInput.value = '';
    }, 900);
  }, 4500);

  return true;
}

/**
 * Brevo submit UX (NOVINKY):
 */
function brevoNewsSubmit() {
  const form = document.getElementById('sib-form-news');
  const thanks = document.getElementById('brevoNewsThanks');

  if (!form || !thanks) return true;

  setTimeout(() => {
    form.style.display = 'none';
    thanks.hidden = false;

    setTimeout(() => {
      thanks.hidden = true;
      form.reset();
      form.style.display = 'block';
    }, 4500);
  }, 800);

  return true;
}

