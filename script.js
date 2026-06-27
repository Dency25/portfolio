const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

// ====================================================
// Preloader — boot sequence
// ====================================================
const preloader = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloaderFill');
const preloaderPct = document.getElementById('preloaderPct');

function finishLoad() {
  preloader.classList.add('done');
  document.body.classList.add('loaded');
}

if (prefersReducedMotion) {
  finishLoad();
} else {
  let pct = 0;
  const target = 100;
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    pct = Math.min(target, Math.round((elapsed / duration) * target));
    preloaderFill.style.width = pct + '%';
    preloaderPct.textContent = pct;
    if (pct < target) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(finishLoad, 180);
    }
  }
  requestAnimationFrame(tick);
}

// ====================================================
// Custom cursor (desktop, fine pointer only)
// ====================================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (hasFinePointer && !prefersReducedMotion) {
  document.body.classList.add('cursor-ready');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .work-card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
  });
}

// ====================================================
// Magnetic buttons
// ====================================================
if (hasFinePointer && !prefersReducedMotion) {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

// ====================================================
// Tilt on project cards
// ====================================================
if (hasFinePointer && !prefersReducedMotion) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-py * 6).toFixed(2);
      const rotateY = (px * 8).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ====================================================
// Scroll progress bar
// ====================================================
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ====================================================
// Scroll-reveal via IntersectionObserver
// ====================================================
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ====================================================
// About photo fallback (shows placeholder if profile.jpg is missing)
// ====================================================
const aboutPhoto = document.getElementById('aboutPhoto');
if (aboutPhoto) {
  aboutPhoto.addEventListener('error', () => {
    aboutPhoto.closest('.about-photo').classList.add('img-missing');
  });
}

// ====================================================
// Stats count-up
// ====================================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';

  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1300;
  let start = null;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach((el) => statObserver.observe(el));
} else {
  statNumbers.forEach((el) => {
    el.textContent = el.dataset.target + (el.dataset.suffix || '');
  });
}

// ====================================================
// Mobile nav toggle
// ====================================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ====================================================
// Hero "API response" typing effect
// ====================================================
const profile = {
  name: 'Dency Desai',
  role: 'Full Stack Developer',
  stack: ['Node.js', 'Express', 'TypeScript', 'Angular'],
  location: 'Surat, Gujarat, IN',
  experience: '2+ years',
  status: 'open_to_work'
};

function renderJsonLine(key, value, isLast) {
  const formattedValue = Array.isArray(value)
    ? `[${value.map((v) => `<span class="json-string">"${v}"</span>`).join(', ')}]`
    : `<span class="json-string">"${value}"</span>`;
  return `  <span class="json-key">"${key}"</span>: ${formattedValue}${isLast ? '' : ','}`;
}

const jsonBlock = document.getElementById('jsonBlock');
const statusRow = document.getElementById('statusRow');

function showFinalState() {
  const keys = Object.keys(profile);
  const lines = keys.map((k, i) => renderJsonLine(k, profile[k], i === keys.length - 1));
  jsonBlock.innerHTML = `{\n${lines.join('\n')}\n}`;
  statusRow.classList.add('show');
}

function typeJson() {
  const keys = Object.keys(profile);
  let lineIndex = 0;
  let html = '{\n';

  function typeNextLine() {
    if (lineIndex >= keys.length) {
      jsonBlock.innerHTML = html + '\n}';
      statusRow.classList.add('show');
      return;
    }
    const key = keys[lineIndex];
    const line = renderJsonLine(key, profile[key], lineIndex === keys.length - 1);
    html += line + '\n';
    jsonBlock.innerHTML = html + '<span class="json-cursor"></span>}';
    lineIndex += 1;
    setTimeout(typeNextLine, 180);
  }

  setTimeout(typeNextLine, 1300);
}

if (prefersReducedMotion) {
  showFinalState();
} else {
  typeJson();
}
