document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section, footer');

  const toggleDrawer = (open) => {
    drawer.classList.toggle('open', open);
    drawerOverlay.classList.toggle('show', open);
    burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  burgerBtn.addEventListener('click', () => {
    toggleDrawer(!drawer.classList.contains('open'));
  });
  
  [drawerOverlay, drawerClose].forEach(el => el.addEventListener('click', () => toggleDrawer(false)));

  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-scroll');
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toggleDrawer(false);
    });
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--solid', window.scrollY > 40);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-scroll') === id);
          });
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((section) => observer.observe(section));

  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  const sticker = document.getElementById('badgeSticker');

  if (isDesktop && sticker) {
    sticker.classList.add('is-desktop');

    let dragging = false;
    let offsetX = 0, offsetY = 0;
    let posX = 0, posY = 0;

    sticker.addEventListener('mousedown', (e) => {
      dragging = true;
      offsetX = e.clientX - posX;
      offsetY = e.clientY - posY;
      sticker.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      posX = e.clientX - offsetX;
      posY = e.clientY - offsetY;
      sticker.style.transform = `translate(${posX}px, ${posY}px) rotate(-8deg)`;
    });

    window.addEventListener('mouseup', () => {
      dragging = false;
      sticker.classList.remove('is-dragging');
    });
  }

  const masonryItems = document.querySelectorAll('.masonry-item');
  masonryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const angle = (Math.random() * 2.5 + 2) * direction;
      item.style.setProperty('--tilt-angle', `${angle}deg`);
    });
    item.addEventListener('mouseleave', () => {
      setTimeout(() => {
        item.style.removeProperty('--tilt-angle');
      }, 600);
    });
  });
});