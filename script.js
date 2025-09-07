// ===== CONFIG ===== 
const GITHUB_USERNAME = 'chauhanvishvanshu'; // set to your GitHub handle
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // <--- replace
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';         // <--- replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';       // <--- replace

// Initialize EmailJS (if keys provided)
if (window.emailjs && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ===== NAVBAR (improved accessibility + scroll lock) =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.setAttribute('aria-haspopup', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');

  const openNav = () => {
    navLinks.classList.add('show');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  // Toggle
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains('show')) closeNav(); else openNav();
  });

  // Close when clicking nav links (mobile)
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      setTimeout(closeNav, 120);
    });
  });

  // Close when clicking outside nav
  document.addEventListener('click', (ev) => {
    if (!navLinks.classList.contains('show')) return;
    if (!navLinks.contains(ev.target) && ev.target !== menuToggle) {
      closeNav();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && navLinks.classList.contains('show')) closeNav();
  });
}

// ===== Floating particles =====
const particlesContainer = document.querySelector('.particles-container');
const particlesCount = 40;
if (particlesContainer) {
  const isSmall = window.matchMedia && window.matchMedia('(max-width:768px)').matches;
  const count = isSmall ? Math.max(8, Math.floor(particlesCount/4)) : particlesCount;

  for(let i=0;i<count;i++){
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random()*10+4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random()*100}%`;
    particle.style.top = `${Math.random()*100}%`;
    const duration = Math.random()*20+12;
    const delay = Math.random()*20;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particlesContainer.appendChild(particle);
  }
}

// ===== Project card interactions (3 streaks + tilt) =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  if (!card.querySelectorAll('.streak').length) {
    for(let i=0;i<3;i++){
      const streak = document.createElement('div');
      streak.classList.add('streak');
      card.appendChild(streak);
    }
  }

  // mouse tilt on hover (desktop)
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY)/centerY)*8;
    const rotateY = ((x - centerX)/centerX)*8;
    card.style.transform = `translateY(-8px) scale(1.02) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

    const streaks = card.querySelectorAll('.streak');
    streaks.forEach((s, idx) => {
      const offset = (idx-1) * 6;
      s.style.transform = `rotate(${10+offset}deg) translateX(${(x/rect.width)*200-100}%)`;
      s.style.opacity = '0.8';
    });
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.querySelectorAll('.streak').forEach(s => { s.style.transform=''; s.style.opacity = '0'; });
  });
});

// ===== Loader fade =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 1100);
});

// ===== Timeline activation =====
const dots = document.querySelectorAll('.timeline .dot');
const sections = document.querySelectorAll('section[id]');
const sectionMap = {};
sections.forEach(sec => { sectionMap[sec.id] = sec; });

const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    const id = entry.target.id;
    const dot = [...dots].find(d=>d.dataset.target === id);
    if (dot) {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      }
    }
  });
}, { threshold: [0.5, 0.75] });
sections.forEach(sec => io.observe(sec));

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const id = dot.dataset.target;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Magnetic elements =====
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(el => {
  const strength = 12;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width/2;
    const relY = e.clientY - rect.top - rect.height/2;
    el.style.transform = `translate(${(relX/rect.width)*strength}px, ${(relY/rect.height)*strength}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

// ===== HUD nav active link detection =====
const navLinksEls = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = [...navLinksEls].find(a => a.getAttribute('href') === `#${id}`);
    if (link) {
      if (entry.isIntersecting) link.classList.add('active'); else link.classList.remove('active');
    }
  });
}, { threshold: 0.6 });
sections.forEach(sec => navObserver.observe(sec));

// ===== Holo avatar tilt =====
const holo = document.querySelector('.holo-avatar');
if (holo) {
  holo.addEventListener('mousemove', (e) => {
    const r = holo.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    holo.style.transform = `rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg)`;
  });
  holo.addEventListener('mouseleave', () => holo.style.transform = 'rotateX(0) rotateY(0)');
}

// ===== Command palette (Ctrl/Cmd + K) =====
const cmdk = document.getElementById('command-palette');
const cmdkInput = document.getElementById('cmdk-input');
const cmdkResults = document.getElementById('cmdk-results');
const cmdkBtn = document.getElementById('cmdk-btn');

const paletteItems = [
  { label: 'About', target: '#about' },
  { label: 'Projects', target: '#projects' },
  { label: 'Skills', target: '#skills' },
  { label: 'Stats', target: '#stats' },
  { label: 'Connect', target: '#connect' },
  { label: 'Contact', target: '#contact' },
];

function openPalette() {
  if (!cmdk) return;
  cmdk.classList.add('show'); cmdk.setAttribute('aria-hidden','false');
  cmdkInput.value = ''; renderResults(paletteItems);
  setTimeout(()=> cmdkInput.focus(), 50);
}
function closePalette() {
  if (!cmdk) return;
  cmdk.classList.remove('show'); cmdk.setAttribute('aria-hidden','true');
}
function renderResults(items) {
  if (!cmdkResults) return;
  cmdkResults.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.label;
    li.addEventListener('click', ()=> { document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' }); closePalette(); });
    cmdkResults.appendChild(li);
  });
}

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault(); if (cmdk && cmdk.classList.contains('show')) closePalette(); else openPalette();
  } else if (e.key === 'Escape') { closePalette(); }
});
cmdkInput?.addEventListener('input', (e)=> {
  const q = e.target.value.toLowerCase().trim();
  const filtered = paletteItems.filter(i => i.label.toLowerCase().includes(q));
  renderResults(filtered);
});
cmdkBtn?.addEventListener('click', openPalette);
cmdk?.addEventListener('click', (e)=> { if (e.target === cmdk) closePalette(); });

// ===== Contact form (EmailJS) =====
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    const payload = {
      from_name: document.getElementById('name').value,
      reply_to: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };
    try {
      if (!window.emailjs || EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
        await new Promise(r => setTimeout(r, 700));
        statusEl.textContent = '✅ (Demo) Message prepared. Configure EmailJS to send.';
        form.reset();
        return;
      }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
      statusEl.textContent = '✅ Message sent successfully!';
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = '❌ Failed to send. Please try again later.';
    }
  });
}

// ===== GitHub API Live Stats =====
async function loadGitHubStats(username) {
  if (!username) return;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('GitHub user fetch failed');
    const user = await userRes.json();
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposRes.json();
    const stars = Array.isArray(repos) ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) : 0;
    document.getElementById('gh-repos').textContent = user.public_repos ?? '--';
    document.getElementById('gh-followers').textContent = user.followers ?? '--';
    document.getElementById('gh-stars').textContent = stars ?? '--';
  } catch (e) {
    console.warn('GitHub API error', e);
  }
}
loadGitHubStats(GITHUB_USERNAME);

// ===== Animate skill bars with counting numbers =====
const skillBars = document.querySelectorAll('.skill-progress');

if (skillBars.length) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const levelStr = el.style.getPropertyValue('--level').trim();
        const level = parseInt(levelStr) || 0;
        const percentEl = el.querySelector('.skill-percent');

        // Animate width
        el.style.width = `${level}%`;

        // Animate number count
        let current = 0;
        const steps = 30;
        const increment = Math.max(1, Math.round(level / steps));
        const timer = setInterval(() => {
          current += increment;
          if (current >= level) {
            current = level;
            clearInterval(timer);
          }
          if (percentEl) {
            percentEl.textContent = current + "%";
            percentEl.style.opacity = 1;
            percentEl.style.transform = "translateY(0)";
          }
        }, 30);

        observer.unobserve(el); // run only once
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));
}
