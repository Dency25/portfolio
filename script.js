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
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

function fullJsonHtml() {
  const keys = Object.keys(profile);
  const lines = keys.map((k, i) => renderJsonLine(k, profile[k], i === keys.length - 1));
  return `{\n${lines.join('\n')}\n}`;
}

const jsonBlock = document.getElementById('jsonBlock');
const statusRow = document.getElementById('statusRow');

function showFinalState() {
  jsonBlock.innerHTML = fullJsonHtml();
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

  setTimeout(typeNextLine, 400);
}

if (prefersReducedMotion) {
  showFinalState();
} else {
  typeJson();
}

// ====================================================
// Sticky nav background intensifies on scroll
// ====================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    nav.style.borderBottomColor = 'var(--border)';
  } else {
    nav.style.borderBottomColor = 'var(--border-soft)';
  }
}, { passive: true });
