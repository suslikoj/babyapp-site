// Burger menu
(function () {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  if (burger && mobileNav) {
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

    // Close mobile menu on link click
    mobileNav.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', () => {
        mobileNav.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// Footer year
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/**
 * Brevo submit UX:
 * - Form posts into hidden iframe => no redirect/blank page
 * - Show thank-you box
 * - After a moment: scroll back to section and reset
 */
function brevoSubmit() {
  const btn = document.getElementById('brevoBtn');
  const thanks = document.getElementById('brevoThanks');
  const emailInput = document.getElementById('EMAIL');
  const betaSection = document.getElementById('beta');

  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.85';
    btn.style.cursor = 'not-allowed';
    btn.dataset.originalText = btn.dataset.originalText || btn.textContent.trim();
    btn.textContent = 'Odesílám…';
  }

  // Show thanks shortly after submit (submit already happening in background)
  window.setTimeout(() => {
    if (thanks) {
      thanks.hidden = false;
      thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (btn) btn.textContent = 'Hotovo ✅';
  }, 500);

  // Auto “return” (scroll back) + reset UI
  window.setTimeout(() => {
    // Scroll back to the beta section (feels like "back to page")
    if (betaSection) {
      betaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // keep URL clean
      try { history.replaceState(null, '', '#beta'); } catch (e) {}
    }

    // Hide thank-you after returning
    window.setTimeout(() => {
      if (thanks) thanks.hidden = true;

      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.cursor = '';
        btn.textContent = btn.dataset.originalText || 'ODEBÍRAT';
      }

      // Optional: clear email field (looks "completed")
      if (emailInput) emailInput.value = '';
    }, 900);
  }, 4500);

  // IMPORTANT: return true so the form actually submits into the iframe
  return true;
}
