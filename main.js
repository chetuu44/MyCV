// ===== LOADER =====
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  const num    = document.getElementById('loaderNum');
  if (!loader) return;
  document.body.style.overflow = 'hidden';
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 12 + 4;
    if (p >= 100) {
      p = 100; clearInterval(iv);
      setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 400);
    }
    if (fill) fill.style.width = p + '%';
    if (num)  num.textContent  = Math.floor(p) + '%';
  }, 80);
});

// ===== CURSOR =====
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-card, .project-card, .fact-box, .repo-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursor || !cursorRing) return;
    cursor.style.width = '20px'; cursor.style.height = '20px';
    cursorRing.style.width = '60px'; cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursor || !cursorRing) return;
    cursor.style.width = '10px'; cursor.style.height = '10px';
    cursorRing.style.width = '38px'; cursorRing.style.height = '38px';
  });
});

// ===== PARTICLES =====
function createParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 3 + 1;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*8}s;`;
    c.appendChild(p);
  }
}
createParticles();

// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  const su = document.getElementById('scrollup');
  if (su) su.classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER =====
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}
function closeMobile() {
  if (hamburger)  hamburger.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeMobile = closeMobile;

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeBtn.querySelector('i').className = document.body.classList.contains('light') ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// ===== REVEAL ON SCROLL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 80);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== SKILL BARS =====
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.querySelectorAll('.skill-bar').forEach(b => { b.style.width = b.dataset.width + '%'; });
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

// ===== COUNTERS =====
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const isFloat  = String(target).includes('.');
  const start    = performance.now();
  const duration = 1800;
  function update(now) {
    const t      = Math.min((now - start) / duration, 1);
    const eased  = 1 - Math.pow(1 - t, 3);
    el.textContent = (isFloat ? (target * eased).toFixed(1) : Math.floor(target * eased)) + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.querySelectorAll('.counter').forEach(animateCounter); cntObs.unobserve(e.target); }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.hero-stats, .about-facts').forEach(el => cntObs.observe(el));

// ===== ROLES CYCLER =====
const roles = document.querySelectorAll('.role');
let curRole = 0;
if (roles.length > 0) {
  setInterval(() => {
    roles[curRole].classList.remove('active');
    roles[curRole].classList.add('out');
    const prev = curRole;
    setTimeout(() => roles[prev].classList.remove('out'), 500);
    curRole = (curRole + 1) % roles.length;
    roles[curRole].classList.add('active');
  }, 2600);
}

// ===== 3D TILT on project cards =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform   = `perspective(1000px) rotateY(${x*6}deg) rotateX(${-y*4}deg) scale(1.01)`;
    card.style.transition  = 'none';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform .5s ease';
  });
});

// ===== GITHUB API =====
// ⚠️ Update the username below if it is different from your actual GitHub username
async function loadGitHub() {
  const username = 'chetankumarparmar';
  try {
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    ]);
    if (uRes.ok) {
      const u = await uRes.json();
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      set('ghRepos',     u.public_repos ?? '—');
      set('ghFollowers', u.followers    ?? '—');
      set('ghFollowing', u.following    ?? '—');
    }
    if (rRes.ok) {
      const repos  = await rRes.json();
      const list   = document.getElementById('ghReposList');
      if (!list) return;
      list.innerHTML = '';
      const filtered = repos.filter(r => !r.fork).slice(0, 5);
      if (!filtered.length) {
        list.innerHTML = `<a href="https://github.com/${username}" target="_blank" class="repo-card"><div class="repo-card-name">Visit GitHub</div><div class="repo-card-desc">See all repositories on GitHub profile.</div></a>`;
        return;
      }
      filtered.forEach(repo => {
        const a = document.createElement('a');
        a.href = repo.html_url; a.target = '_blank'; a.className = 'repo-card';
        a.innerHTML = `
          <div class="repo-card-name">${repo.name}</div>
          <div class="repo-card-desc">${repo.description || 'No description provided.'}</div>
          <div class="repo-card-meta">
            ${repo.language ? `<span class="repo-card-lang">${repo.language}</span>` : ''}
            <span class="repo-card-stars">⭐ ${repo.stargazers_count}</span>
          </div>`;
        list.appendChild(a);
      });
    }
  } catch (e) {
    const list = document.getElementById('ghReposList');
    if (list) list.innerHTML = `<a href="https://github.com/${username}" target="_blank" class="repo-card"><div class="repo-card-name">GitHub Profile</div><div class="repo-card-desc">Visit to see all repositories and contributions.</div><div class="repo-card-meta"><span class="repo-card-lang">GitHub</span></div></a>`;
  }
}
loadGitHub();

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('.form-submit');
  const orig = btn.innerHTML;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#00e87a,#00c6ff)';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
  const f       = e.target;
  const name    = f.querySelector('input[type=text]').value;
  const email   = f.querySelector('input[type=email]').value;
  const inputs  = f.querySelectorAll('input[type=text]');
  const subject = inputs[1]?.value || 'Contact from Portfolio';
  const message = f.querySelector('textarea').value;
  window.open(`mailto:parmarchetan560@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message)}`);
}
window.handleSubmit = handleSubmit;

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-github)');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 220) cur = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : ''; });
});
