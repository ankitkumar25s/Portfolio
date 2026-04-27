/* ===========================================
   PORTFOLIO JAVASCRIPT — Ankit Singh
   Typing Effect | Dark Mode | Animations
   Scroll Effects | Form Validation | etc.
   =========================================== */

// ============================================
// 1. AOS INIT (Scroll Animations)
// ============================================
AOS.init({
  duration: 800,
  easing: 'ease-out-quad',
  once: true,
  offset: 80,
});

// ============================================
// 2. DARK / LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const htmlEl      = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('portfolioTheme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
    themeIcon.title = 'Switch to Light Mode';
  } else {
    themeIcon.className = 'fas fa-moon';
    themeIcon.title = 'Switch to Dark Mode';
  }
}

// ============================================
// 3. TYPING EFFECT
// ============================================
const typedTextEl = document.getElementById('typedText');

const typedStrings = [
  'Web Developer 💻',
  'BCA Student 🎓',
  'UI Designer 🎨',
  'Problem Solver 🧠',
  'JavaScript Lover ⚡',
  'Learner & Builder 🚀',
];

let strIndex   = 0;
let charIndex  = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  const current = typedStrings[strIndex];

  if (isDeleting) {
    charIndex--;
    typedTextEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typedTextEl.textContent = current.substring(0, charIndex);
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    strIndex = (strIndex + 1) % typedStrings.length;
    speed = 400; // pause before next
  }

  typingTimeout = setTimeout(typeEffect, speed);
}

// Start typing effect
typeEffect();

// ============================================
// 4. NAVBAR SCROLL + ACTIVE LINK
// ============================================
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let currentSection = 'home';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Back to Top button
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// ============================================
// 5. HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksEl.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ============================================
// 6. SKILL BARS ANIMATION (on scroll)
// ============================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = el.getAttribute('data-width');
      el.style.width = width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ============================================
// 7. COUNTER ANIMATION
// ============================================
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let count    = 0;
      const step   = Math.ceil(target / 30);
      const timer  = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = count;
      }, 60);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ============================================
// 8. PROJECT FILTER
// ============================================
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        // Re-trigger animation
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================
// 9. CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear previous errors
  clearErrors();

  let valid = true;

  if (name.length < 2) {
    showError('nameError', 'Please enter your name (min 2 characters).');
    valid = false;
  }

  if (!isValidEmail(email)) {
    showError('emailError', 'Please enter a valid email address.');
    valid = false;
  }

  if (subject.length < 3) {
    showError('subjectError', 'Please enter a subject (min 3 characters).');
    valid = false;
  }

  if (message.length < 10) {
    showError('messageError', 'Please write a message (min 10 characters).');
    valid = false;
  }

  if (!valid) return;

  // Simulate sending
  submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
  submitBtn.disabled  = true;

  // Save to table API
  try {
    await fetch('tables/contact_messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, date: new Date().toISOString() }),
    });
  } catch (err) {
    // silently ignore if table doesn't exist
  }

  setTimeout(() => {
    contactForm.reset();
    formSuccess.classList.add('show');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled  = false;

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ['nameError','emailError','subjectError','messageError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// 10. BACK TO TOP
// ============================================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// 11. FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// 12. SMOOTH HOVER — NAVBAR LOGO PARTICLE EFFECT
// ============================================
// Slight scale effect on logo click
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('click', () => {
    navLogo.style.transform = 'scale(1.1)';
    setTimeout(() => { navLogo.style.transform = ''; }, 200);
  });
}

// ============================================
// 13. PROFILE IMAGE — CLICK TO UPLOAD (Optional)
// ============================================
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type  = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        profileImg.src = ev.target.result;
        // Also update about section image
        const aboutImg = document.querySelector('.about-img');
        if (aboutImg) aboutImg.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });
  profileImg.title = 'Click to change photo';
  profileImg.style.cursor = 'pointer';
}

// ============================================
// 14. SECTION REVEAL — Extra smoothness
// ============================================
const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

allSections.forEach(sec => {
  sec.style.opacity   = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  sectionObserver.observe(sec);
});

// ============================================
// 15. NAVBAR LINK SMOOTH HOVER UNDERLINE EFFECT
// ============================================
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.letterSpacing = '0.5px';
  });
  link.addEventListener('mouseleave', () => {
    link.style.letterSpacing = '';
  });
});

// ============================================
// 16. CONSOLE GREETING
// ============================================
console.log('%c👋 Hello Developer!', 'color: #6c63ff; font-size: 1.5rem; font-weight: bold;');
console.log('%cPortfolio built with ❤️ by Ankit Singh', 'color: #a0a0b8; font-size: 1rem;');
console.log('%cFeel free to explore the code!', 'color: #43e97b; font-size: 0.9rem;');
