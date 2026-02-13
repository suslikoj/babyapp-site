const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

function setMobile(open){
  if (!burger || !mobileNav) return;
  burger.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
}

if (burger && mobileNav){
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    setMobile(open);
  });

  mobileNav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => setMobile(false));
  });
}
