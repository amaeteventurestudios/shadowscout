/* ===================================================
   ShadowScout — Auth System (localStorage)
   No backend — credentials checked client-side
   =================================================== */

const VALID_CREDENTIALS = [
  { username: 'shadow', password: 'scout' },
  { username: 'demo',   password: 'demo'  },
];

const SESSION_KEY = 'ss_session';

/* ── LOGIN PAGE LOGIC ──────────────────────────────────────── */
if (document.getElementById('loginForm')) {

  const form       = document.getElementById('loginForm');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');
  const loginBtn   = document.getElementById('loginBtn');
  const loginError = document.getElementById('loginError');
  const togglePw   = document.getElementById('togglePw');
  const toggleIcon = document.getElementById('togglePwIcon');
  const useDemoBtn = document.getElementById('useDemoBtn');

  /* Redirect if already logged in */
  if (sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY)) {
    window.location.href = 'dashboard.html';
  }

  /* Toggle password visibility */
  togglePw.addEventListener('click', () => {
    const isHidden = passwordEl.type === 'password';
    passwordEl.type = isHidden ? 'text' : 'password';
    toggleIcon.className = isHidden ? 'fas fa-eye-slash' : 'fas fa-eye';
  });

  /* Fill demo credentials */
  useDemoBtn.addEventListener('click', () => {
    usernameEl.value = 'shadow';
    passwordEl.value = 'scout';
    usernameEl.classList.remove('error');
    passwordEl.classList.remove('error');
    loginError.classList.remove('show');
    usernameEl.focus();
    /* Small highlight animation */
    [usernameEl, passwordEl].forEach(el => {
      el.style.transition = 'background 0.3s';
      el.style.background = 'rgba(232,93,4,0.08)';
      setTimeout(() => { el.style.background = ''; }, 600);
    });
  });

  /* Form submission */
  form.addEventListener('submit', e => {
    e.preventDefault();
    attemptLogin();
  });

  /* Also allow Enter key */
  [usernameEl, passwordEl].forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') attemptLogin();
    });
    el.addEventListener('input', () => {
      el.classList.remove('error');
      loginError.classList.remove('show');
    });
  });

  function attemptLogin() {
    const username = usernameEl.value.trim().toLowerCase();
    const password = passwordEl.value;

    if (!username || !password) {
      showError('Please enter your username and password.');
      if (!username) usernameEl.classList.add('error');
      if (!password) passwordEl.classList.add('error');
      return;
    }

    /* Show loading state */
    loginBtn.classList.add('loading');

    setTimeout(() => {
      const match = VALID_CREDENTIALS.find(
        c => c.username === username && c.password === password
      );

      if (match) {
        /* Store session */
        const session = {
          username: match.username,
          loginTime: Date.now(),
          expires: Date.now() + (8 * 60 * 60 * 1000) /* 8 hours */
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        /* Show success overlay */
        showSuccessAndRedirect(match.username);
      } else {
        loginBtn.classList.remove('loading');
        showError('Invalid username or password. Try the demo credentials below.');
        usernameEl.classList.add('error');
        passwordEl.classList.add('error');
        passwordEl.value = '';
        usernameEl.focus();
      }
    }, 900); /* Simulated delay */
  }

  function showError(msg) {
    const errorEl = document.getElementById('loginErrorMsg');
    errorEl.textContent = msg;
    loginError.classList.add('show');
  }

  function showSuccessAndRedirect(username) {
    /* Build success overlay */
    const overlay = document.createElement('div');
    overlay.className = 'login-success-overlay';
    overlay.innerHTML = `
      <div class="success-icon"><i class="fas fa-check-circle"></i></div>
      <div class="success-text">Welcome back, ${username}.</div>
      <div class="success-sub">Loading Signal Board…</div>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add('active');
      });
    });

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1400);
  }
}

/* ── GUARD: protect dashboard ──────────────────────────────── */
function requireAuth() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    window.location.href = 'login.html';
    return false;
  }
  try {
    const session = JSON.parse(raw);
    if (Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = 'login.html';
      return false;
    }
    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
    return false;
  }
}

/* ── LOGOUT ────────────────────────────────────────────────── */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

/* ── GET CURRENT USER ──────────────────────────────────────── */
function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
