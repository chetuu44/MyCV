/* ============ main.js — Chetan Kumar Portfolio ============ */

// ============ LOADER ============
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const num = document.getElementById('loaderNum');

  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    }
    fill.style.width = progress + '%';
    num.textContent = Math.floor(progress) + '%';
  }, 80);

  document.body.style.overflow = 'hidden';
});

// ============ CUSTOM CURSOR ============
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
const cursorText = document.getElementById('cursorText');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
  if (cursorText) {
    cursorText.style.left = mouseX + 'px';
    cursorText.style.top = mouseY + 'px';
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover states
document.querySelectorAll('a, button, .skill-card, .project-card, .fact-box, .repo-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursor || !cursorRing) return;
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorRing.style.width = '60px';
    cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursor || !cursorRing) return;
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorRing.style.width = '38px';
    cursorRing.style.height = '38px';
  });
});

// Project cards — "View" cursor text
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (cursorText) cursorText.style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    if (cursorText) cursorText.style.opacity = '0';
  });
});

// ============ PARTICLES ============
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ============ NAV SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  const scrollup = document.getElementById('scrollup');
  if (scrollup) scrollup.classList.toggle('visible', window.scrollY > 400);
});

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMobile() {
  if (hamburger) hamburger.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeMobile = closeMobile;

// ============ THEME TOGGLE ============
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = themeBtn.querySelector('i');
    icon.className = document.body.classList.contains('light') ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// ============ REVEAL ON SCROLL ============
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ============ SKILL BARS ============
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ============ COUNTER ANIMATION ============
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isFloat = String(target).includes('.');
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.hero-stats, .about-facts').forEach(el => counterObserver.observe(el));

// ============ ROLES CYCLER ============
const roles = document.querySelectorAll('.role');
let currentRole = 0;
if (roles.length > 0) {
  setInterval(() => {
    roles[currentRole].classList.remove('active');
    roles[currentRole].classList.add('out');
    const prev = currentRole;
    setTimeout(() => roles[prev].classList.remove('out'), 500);
    currentRole = (currentRole + 1) % roles.length;
    roles[currentRole].classList.add('active');
  }, 2400);
}

// ============ 3D TILT EFFECT ============
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});

// ============ MAGNETIC BUTTONS ============
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s ease';
  });
  el.addEventListener('mouseenter', () => {
    el.style.transition = 'none';
  });
});

// ============ ACTIVE NAV LINK ============
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-github)');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current;
    a.style.color = isActive ? 'var(--text)' : '';
  });
});

// ============ GITHUB API ============
async function loadGitHub() {
  const username = 'chetankumarparmar'; // Update this to your actual GitHub username
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    ]);

    if (userRes.ok) {
      const user = await userRes.json();
      const ghRepos = document.getElementById('ghRepos');
      const ghFollowers = document.getElementById('ghFollowers');
      const ghFollowing = document.getElementById('ghFollowing');
      if (ghRepos) ghRepos.textContent = user.public_repos || '—';
      if (ghFollowers) ghFollowers.textContent = user.followers || '—';
      if (ghFollowing) ghFollowing.textContent = user.following || '—';
    }

    if (reposRes.ok) {
      const repos = await reposRes.json();
      const list = document.getElementById('ghReposList');
      if (!list) return;

      list.innerHTML = '';
      const filtered = repos.filter(r => !r.fork).slice(0, 5);

      if (filtered.length === 0) {
        // Show placeholder cards if no repos found
        list.innerHTML = `
          <a href="https://github.com/${username}" target="_blank" class="repo-card">
            <div class="repo-card-name">Visit GitHub Profile</div>
            <div class="repo-card-desc">View all repositories and contributions on GitHub.</div>
            <div class="repo-card-meta"><span class="repo-card-lang">GitHub</span></div>
          </a>
        `;
        return;
      }

      filtered.forEach(repo => {
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.className = 'repo-card';
        card.innerHTML = `
          <div class="repo-card-name">${repo.name}</div>
          <div class="repo-card-desc">${repo.description || 'No description provided.'}</div>
          <div class="repo-card-meta">
            ${repo.language ? `<span class="repo-card-lang">${repo.language}</span>` : ''}
            <span class="repo-card-stars">⭐ ${repo.stargazers_count}</span>
          </div>
        `;
        list.appendChild(card);
      });
    }
  } catch (e) {
    // Silently fail — GitHub API might be rate limited
    const list = document.getElementById('ghReposList');
    if (list) {
      list.innerHTML = `
        <a href="https://github.com/${username}" target="_blank" class="repo-card">
          <div class="repo-card-name">GitHub Profile</div>
          <div class="repo-card-desc">Visit my GitHub profile to see all repositories and contributions.</div>
          <div class="repo-card-meta"><span class="repo-card-lang">GitHub</span></div>
        </a>
      `;
    }
    console.log('GitHub API not available:', e.message);
  }
}
loadGitHub();

// ============ CONTACT FORM ============
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const originalHTML = btn.innerHTML;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#00ff87';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    e.target.reset();
  }, 3000);

  const form = e.target;
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const inputs = form.querySelectorAll('input[type="text"]');
  const subject = inputs.length > 1 ? inputs[1].value : 'Contact from Portfolio';
  const message = form.querySelector('textarea').value;

  window.open(
    `mailto:parmarchetan560@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`
  );
}
window.handleSubmit = handleSubmit;

// ============ SMOOTH SCROLL OFFSET ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ============ TYPING EFFECT on hero tag ============
// Small scanline animation helper — ensure CSS animation is running
document.querySelectorAll('.about-img-scanlines').forEach(el => {
  el.style.animationPlayState = 'running';
});
