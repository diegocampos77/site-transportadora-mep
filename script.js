const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(
  '.section-heading, .service-card, .adv-item, .proof-copy, .proof-item, .cert-card, .client-logo, .social-contact'
);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealElements.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
    revealObserver.observe(element);
  });
}

document.querySelectorAll('.contact-form').forEach((contactForm) => {
  const requiredFields = contactForm.querySelectorAll('[required]');

  const validateField = (field) => {
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
    let errorMessage = '';

    if (!field.value.trim()) {
      errorMessage = 'Preencha este campo antes de enviar.';
    } else if (field.type === 'email' && !field.validity.valid) {
      errorMessage = 'Informe um endereço de e-mail válido.';
    }

    errorElement.textContent = errorMessage;
    errorElement.hidden = !errorMessage;
    field.setAttribute('aria-invalid', String(Boolean(errorMessage)));
    return !errorMessage;
  };

  requiredFields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
  });

  contactForm.addEventListener('submit', (event) => {
    const invalidFields = [...requiredFields].filter((field) => !validateField(field));

    if (invalidFields.length) {
      event.preventDefault();
      invalidFields[0].focus();
    }
  });
});

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
