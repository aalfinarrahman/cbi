// Toggle mobile menu
document.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();
  initSmoothScroll();
  initScrollSpy();
});

// includes loader dihapus; kita inisialisasi langsung karena header/footer inline

function initMenuToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }
}

function initSmoothScroll() {
  const menu = document.querySelector('.menu');
  const links = document.querySelectorAll('.menu a[href^="/#"], a[href^="/#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = (link.getAttribute('href') || '');
      const id = href.replace('/#', '');
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (menu && menu.classList.contains('open')) menu.classList.remove('open');
      }
    });
  });
}

function initScrollSpy() {
  const sectionIds = ['beranda','proses','tentang','layanan','kontak'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.menu a[href^="/#"]'));
  if (!sections.length || !navLinks.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const href = a.getAttribute('href') || '';
          const targetId = href.replace('/#', '');
          a.classList.toggle('active', targetId === id);
        });
      }
    });
  }, { root: null, threshold: 0.5 });
  sections.forEach(sec => observer.observe(sec));
}