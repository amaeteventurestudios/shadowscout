/* ===================================================
   ShadowScout — Landing Page JS
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── MOBILE NAV ──────────────────────────────────── */
  const hamburger   = document.getElementById('hamburgerBtn');
  const mobileMenu  = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      hamburger.querySelectorAll('span')[1].style.opacity  = isOpen ? '0' : '';
      hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });

    /* Close menu on link click */
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }

  /* ── NAV SCROLL EFFECT ───────────────────────────── */
  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      nav.style.borderBottomColor = '';
    }
  });

  /* ── EARLY ACCESS FORM ───────────────────────────── */
  const form      = document.getElementById('earlyAccessForm');
  const success   = document.getElementById('eaSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('eaEmail').value.trim();
      if (!email || !email.includes('@')) {
        document.getElementById('eaEmail').style.borderColor = '#ef4444';
        document.getElementById('eaEmail').focus();
        return;
      }
      /* Simulate submission */
      form.style.opacity = '0.5';
      form.style.pointerEvents = 'none';
      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
        /* Store in localStorage */
        const signups = JSON.parse(localStorage.getItem('ss_signups') || '[]');
        signups.push({ email, role: document.getElementById('eaRole').value, ts: Date.now() });
        localStorage.setItem('ss_signups', JSON.stringify(signups));
      }, 800);
    });

    document.getElementById('eaEmail').addEventListener('input', function() {
      this.style.borderColor = '';
    });
  }

  /* ── SCROLL ANIMATION ────────────────────────────── */
  const animEls = document.querySelectorAll(
    '.step-card, .feature-card, .user-card, .l2-stat-card, .pricing-card'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  animEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

  /* ── SMOOTH ANCHOR SCROLL ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── ACTIVE NAV LINK ON SCROLL ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const secObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--text-primary)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => secObserver.observe(s));

  /* ── PRICING TOGGLE ANIMATION ────────────────────── */
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('featured-card')) {
        card.style.borderColor = 'rgba(255,255,255,0.15)';
      }
    });
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('featured-card')) {
        card.style.borderColor = '';
      }
    });
  });

  /* ── CHECK IF ALREADY LOGGED IN ──────────────────── */
  const SESSION_KEY = 'ss_session';
  const raw = localStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (Date.now() < session.expires) {
        /* Show "Go to Dashboard" instead of "Request Access" */
        const ctas = document.querySelectorAll('a[href="#early-access"], a[href="login.html"]');
        ctas.forEach(cta => {
          if (cta.textContent.includes('Demo') || cta.textContent.includes('Sign')) {
            cta.textContent = '→ Go to Dashboard';
            cta.href = 'dashboard.html';
          }
        });
      }
    } catch {}
  }

  console.log('%c⚡ ShadowScout Landing', 'color:#4F8EF7;font-weight:bold;font-size:14px');
});
