const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = siteNav ? siteNav.querySelectorAll('a') : [];
const faqItems = document.querySelectorAll('.faq-item');
const yearNode = document.getElementById('year');
const form = document.getElementById('booking-form');
const feedback = document.getElementById('form-feedback');
const header = document.querySelector('.header');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.classList.toggle('active');
    siteNav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      siteNav.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    faqItems.forEach((entry) => entry.classList.remove('open'));

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = (data.get('name') || 'there').toString().trim().split(' ')[0];
    feedback.textContent = `Thanks ${firstName}, your request has been received. Obsidian Detailing will follow up with availability and the best package for your vehicle.`;
    form.reset();
  });
}

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 16) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
