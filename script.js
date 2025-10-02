// ===== CONFIG =====
const GITHUB_USERNAME = "chauhanvishvanshu";
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Initialize EmailJS if keys provided
if (
  window.emailjs &&
  EMAILJS_PUBLIC_KEY &&
  EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY"
) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ===== NAVBAR TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.setAttribute("aria-haspopup", "true");
  menuToggle.setAttribute("aria-expanded", "false");

  const openNav = () => {
    navLinks.classList.add("show");
    menuToggle.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
  };
  const closeNav = () => {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.contains("show") ? closeNav() : openNav();
  });

  navLinks.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => setTimeout(closeNav, 120));
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && e.target !== menuToggle) closeNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

// ===== PARTICLES =====
const particlesContainer = document.querySelector(".particles-container");
const particlesCount = 32;
if (particlesContainer) {
  const isSmall = window.matchMedia("(max-width:768px)").matches;
  const baseCount = isSmall
    ? Math.max(8, Math.floor(particlesCount / 4))
    : particlesCount;
  const count = prefersReducedMotion
    ? Math.max(6, Math.floor(baseCount / 3))
    : baseCount;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 10 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 20 + 12}s`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    if (prefersReducedMotion) {
      particle.style.animation = "none";
      particle.style.opacity = 0.35;
    }
    particlesContainer.appendChild(particle);
  }
}

// ===== PROJECT CARD INTERACTIONS =====
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  if (!card.querySelectorAll(".streak").length) {
    for (let i = 0; i < 3; i++) {
      const streak = document.createElement("div");
      streak.classList.add("streak");
      card.appendChild(streak);
    }
  }

  if (prefersReducedMotion) {
    return;
  }

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;
    card.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    card.querySelectorAll(".streak").forEach((s, idx) => {
      const offset = (idx - 1) * 6;
      s.style.transform = `rotate(${10 + offset}deg) translateX(${(x / rect.width) * 200 - 100}%)`;
      s.style.opacity = "0.8";
    });
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.querySelectorAll(".streak").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "0";
    });
  });
});

// ===== LOADER FADE =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) setTimeout(() => loader.classList.add("hidden"), 800);
});

// ===== TIMELINE =====
const dots = document.querySelectorAll(".timeline .dot");
const sections = document.querySelectorAll("section[id]");
const sectionMap = {};
sections.forEach((sec) => (sectionMap[sec.id] = sec));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const dot = [...dots].find((d) => d.dataset.target === entry.target.id);
      if (dot) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          dots.forEach((d) => d.classList.remove("active"));
          dot.classList.add("active");
        }
      }
    });
  },
  { threshold: [0.5, 0.75] },
);

sections.forEach((sec) => io.observe(sec));

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = dot.dataset.target
      ? document.getElementById(dot.dataset.target)
      : null;
    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== MAGNETIC ELEMENTS =====
const magneticElements = document.querySelectorAll(".magnetic");
if (!prefersReducedMotion) {
  magneticElements.forEach((el) => {
    const strength = 12;
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
}

// ===== NAV ACTIVE LINK DETECTION =====
const navLinksEls = document.querySelectorAll(".nav-links a");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = [...navLinksEls].find(
        (a) => a.getAttribute("href") === `#${entry.target.id}`,
      );
      if (link)
        entry.isIntersecting
          ? link.classList.add("active")
          : link.classList.remove("active");
    });
  },
  { threshold: 0.6 },
);
sections.forEach((sec) => navObserver.observe(sec));

// ===== HOLO AVATAR TILT =====
const holo = document.querySelector(".holo-avatar");
if (holo && !prefersReducedMotion) {
  holo.addEventListener("mousemove", (e) => {
    const r = holo.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    holo.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  holo.addEventListener(
    "mouseleave",
    () => (holo.style.transform = "rotateX(0) rotateY(0)"),
  );
}

// ===== COMMAND PALETTE =====
const cmdk = document.getElementById("command-palette");
const cmdkInput = document.getElementById("cmdk-input");
const cmdkResults = document.getElementById("cmdk-results");
const cmdkBtn = document.getElementById("cmdk-btn");

const paletteItems = [
  { label: "About", target: "#about" },
  { label: "Projects", target: "#projects" },
  { label: "Experience", target: "#experience" },
  { label: "Skills", target: "#skills" },
  { label: "Stats", target: "#stats" },
  { label: "Spotlight", target: "#spotlight" },
  { label: "Connect", target: "#connect" },
  { label: "Contact", target: "#contact" },
];

function openPalette() {
  cmdk?.classList.add("show");
  cmdk?.setAttribute("aria-hidden", "false");
  cmdkInput.value = "";
  renderResults(paletteItems);
  setTimeout(() => cmdkInput?.focus(), 50);
}
function closePalette() {
  cmdk?.classList.remove("show");
  cmdk?.setAttribute("aria-hidden", "true");
}
function renderResults(items) {
  cmdkResults.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.label;
    li.addEventListener("click", () => {
      document
        .querySelector(item.target)
        ?.scrollIntoView({ behavior: "smooth" });
      closePalette();
    });
    cmdkResults.appendChild(li);
  });
}
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
    e.preventDefault();
    cmdk?.classList.contains("show") ? closePalette() : openPalette();
  } else if (e.key === "Escape") closePalette();
});
cmdkInput?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  renderResults(paletteItems.filter((i) => i.label.toLowerCase().includes(q)));
});
cmdkBtn?.addEventListener("click", openPalette);
cmdk?.addEventListener("click", (e) => {
  if (e.target === cmdk) closePalette();
});

// ===== CONTACT FORM (EMAILJS) =====
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending...";
    const payload = {
      from_name: document.getElementById("name").value,
      reply_to: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
    try {
      // basic validation
      if (!window.emailjs || EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY") {
        await new Promise((r) => setTimeout(r, 700));
        statusEl.textContent =
          "✅ (Demo) Message prepared. Configure EmailJS to send.";
        form.reset();
        return;
      }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
      statusEl.textContent = "Sending via EmailJS...";
      statusEl.textContent = "✅ Message sent successfully!";
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = "❌ Failed to send. Please try again later.";
    }
  });
}

// ===== GITHUB STATS =====
async function loadGitHubStats(username) {
  if (!username) return;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const user = await userRes.json();
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );
    const repos = await reposRes.json();
    const stars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;
    document.getElementById("gh-repos").textContent = user.public_repos ?? "--";
    document.getElementById("gh-followers").textContent =
      user.followers ?? "--";
    document.getElementById("gh-stars").textContent = stars ?? "--";
  } catch (e) {
    console.warn("GitHub API error", e);
  }
}
loadGitHubStats(GITHUB_USERNAME);

// ===== SKILL BARS =====
document.querySelectorAll(".skill-progress").forEach((bar) => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const level = parseInt(el.style.getPropertyValue("--level")) || 0;
          el.style.width = `${level}%`;
          let current = 0;
          const increment = Math.max(1, Math.round(level / 30));
          const percentEl = el.querySelector(".skill-percent");
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
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );
  observer.observe(bar);
});

const revealTargets = document.querySelectorAll("[data-reveal]");
if (revealTargets.length) {
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }
}
