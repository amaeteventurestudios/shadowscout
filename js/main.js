/* ===================================================
   ShadowScout JS
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SIDEBAR NAV SWITCHING ─────────────────────── */
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ── PLAYER CARD CLICK → MODAL ─────────────────── */
  const playerData = {
    'TD': { name: 'T. Diallo',     full: 'Thierno Diallo',   club: 'Caen',         role: 'Ball-Winning 6', age: 24, score: 8.4, xG: '—',    duel: '71%', press: '9.2', reason: 'Leads Ligue 2 in ball recoveries per 90 (8.4). Exceptional press participation rate over last 8 matches.', color: '#3b82f6', img: 'images/players/td.jpg' },
    'YL': { name: 'Y. Lefebvre',   full: 'Yanis Lefebvre',   club: 'Rodez',        role: 'Ball-Winning 6', age: 22, score: 7.9, xG: '—',    duel: '68%', press: '8.6', reason: 'U23 flagged. High pressing sequences initiated — ranks 3rd among DMs in Ligue 2 this cycle.', color: '#6366f1', img: 'images/players/yl.jpg' },
    'HS': { name: 'H. Sagna',      full: 'Hamidou Sagna',    club: 'Laval',        role: 'Ball-Winning 6', age: 26, score: 7.6, xG: '—',    duel: '65%', press: '7.9', reason: 'Duel win rate rising over last 4 matches. Reliable in the press and transition block.', color: '#8b5cf6', img: 'images/players/hs.jpg' },
    'EK': { name: 'E. Kroupi',     full: 'Eli Kroupi',       club: 'Grenoble',     role: 'Progressive 8',  age: 21, score: 9.1, xG: '0.12', duel: '61%', press: '7.8', reason: 'Highest progressive carry distance in Ligue 2 this month. Pass completion 91% — dominant vertical link profile.', color: '#10b981', img: 'images/players/ek.jpg' },
    'NL': { name: 'N. Lebreton',   full: 'Noé Lebreton',     club: 'Pau',          role: 'Progressive 8',  age: 23, score: 8.7, xG: '0.09', duel: '58%', press: '7.5', reason: 'Vertical pass receiver with growing final third influence. 3rd in box arrivals from CM position.', color: '#059669', img: 'images/players/nl.jpg' },
    'MT': { name: 'M. Tourraine',  full: 'Marc Tourraine',   club: 'Valenciennes', role: 'Progressive 8',  age: 25, score: 8.2, xG: '0.08', duel: '55%', press: '7.2', reason: 'Progressive carry trigger. Ball retention under pressure above 88%.', color: '#34d399', img: 'images/players/mt.jpg' },
    'LD': { name: 'L. Diarra',     full: 'Lamine Diarra',    club: 'Metz',         role: 'Aerial CB',       age: 27, score: 8.6, xG: '—',    duel: '79%', press: '—',   reason: 'Aerial duel win rate 79% — crossed the review threshold this cycle. Dominant in set piece zones.', color: '#f59e0b', img: 'images/players/ld.jpg' },
    'CV': { name: 'C. Vidal',      full: 'Carlos Vidal',     club: 'Saint-Étienne',role: 'Aerial CB',       age: 29, score: 8.1, xG: '—',    duel: '74%', press: '—',   reason: 'Physical aerial presence. High clearance + first contact success rate over last 6 matches.', color: '#d97706', img: 'images/players/cv.jpg' },
    'MC': { name: 'M. Camara',     full: 'Moussa Camara',    club: 'Troyes',       role: 'Aerial CB',       age: 24, score: 7.8, xG: '—',    duel: '72%', press: '—',   reason: 'Rising aerial threat. U23 profile. Dominant in aerial zones both defensively and at set pieces.', color: '#b45309', img: 'images/players/mc.jpg' },
    'ST': { name: 'S. Traoré',     full: 'Sidi Traoré',      club: 'Dunkerque',    role: 'Att. Fullback',   age: 23, score: 8.3, xG: '0.15', duel: '60%', press: '—',   reason: 'Crosses into box and final third entries above threshold. Attacking fullback with carry trigger tag.', color: '#06b6d4', img: 'images/players/st.jpg' },
    'BP': { name: 'B. Perrin',     full: 'Baptiste Perrin',  club: 'Auxerre',      role: 'Att. Fullback',   age: 22, score: 7.9, xG: '0.11', duel: '57%', press: '—',   reason: 'U23. Rising signal this cycle — increased attacking output over last 4 matches.', color: '#0891b2', img: 'images/players/bp.jpg' },
    'LO': { name: 'L. Ouattara',   full: 'Lassana Ouattara', club: 'Annecy',       role: 'Att. Fullback',   age: 21, score: 7.5, xG: '0.09', duel: '54%', press: '—',   reason: 'Young fullback with vertical link profile. On watch for progressive carry numbers.', color: '#0e7490', img: 'images/players/lo.jpg' },
    'AK': { name: 'A. Konaté',     full: 'Abdou Konaté',     club: 'Bastia',       role: 'Box-Threat FWD',  age: 22, score: 9.3, xG: '0.52', duel: '58%', press: '—',   reason: 'xG per 90 leading Ligue 2 forwards this cycle. Box entry rate and shot conversion trending sharply upward.', color: '#ef4444', img: 'images/players/ak.jpg' },
    'JN': { name: 'J. Njo Lea',    full: 'Jordan Njo Lea',   club: 'Amiens',       role: 'Box-Threat FWD',  age: 24, score: 8.8, xG: '0.48', duel: '55%', press: '—',   reason: 'Box-hunter profile confirmed. Aerial + ground threat in the box. Finishing rate improved 3 cycles running.', color: '#dc2626', img: 'images/players/jn.jpg' },
    'ML': { name: 'M. Larbi',      full: 'Mehdi Larbi',      club: 'Quevilly',     role: 'Box-Threat FWD',  age: 26, score: 8.0, xG: '0.41', duel: '52%', press: '—',   reason: 'Carry trigger + box hunter tags active. Progressive movement toward goal consistent last 6 matches.', color: '#b91c1c', img: 'images/players/ml.jpg' },
  };

  /* Create modal */
  const modalHTML = `
    <div class="modal-overlay" id="playerModal">
      <div class="modal-card">
        <div class="modal-header">
          <div style="display:flex;align-items:center;gap:12px">
            <div class="modal-player-avatar" id="modalAvatar"><img id="modalAvatarImg" src="" alt=""></div>
            <div>
              <div class="modal-title" id="modalName"></div>
              <div class="modal-subtitle" id="modalSub"></div>
            </div>
          </div>
          <button class="modal-close" id="modalClose"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-stats">
          <div class="modal-stat">
            <div class="modal-stat-val" id="mScore"></div>
            <span class="modal-stat-label">Signal Score</span>
          </div>
          <div class="modal-stat">
            <div class="modal-stat-val" id="mDuel"></div>
            <span class="modal-stat-label">Duel Win %</span>
          </div>
          <div class="modal-stat">
            <div class="modal-stat-val" id="mXG"></div>
            <span class="modal-stat-label">xG / 90</span>
          </div>
        </div>
        <div class="modal-reason" id="modalReason"></div>
        <div class="modal-actions">
          <button class="modal-btn modal-btn-primary" id="modalWatch">
            <i class="fas fa-star"></i> Add to Watchlist
          </button>
          <button class="modal-btn modal-btn-secondary" id="modalProfile">
            <i class="fas fa-user"></i> Full Profile
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal        = document.getElementById('playerModal');
  const modalClose   = document.getElementById('modalClose');
  const modalName    = document.getElementById('modalName');
  const modalSub     = document.getElementById('modalSub');
  const modalAvatar  = document.getElementById('modalAvatar');
  const modalAvatarImg = document.getElementById('modalAvatarImg');
  const modalReason  = document.getElementById('modalReason');
  const mScore       = document.getElementById('mScore');
  const mDuel        = document.getElementById('mDuel');
  const mXG          = document.getElementById('mXG');
  const modalWatch   = document.getElementById('modalWatch');

  function openModal(initials) {
    const p = playerData[initials];
    if (!p) return;
    modalName.textContent   = p.full;
    modalSub.textContent    = `${p.club} · ${p.role} · Age ${p.age}`;
    // Use photo if available
    if (p.img) {
      modalAvatarImg.src = p.img;
      modalAvatarImg.alt = p.full;
      modalAvatarImg.style.display = 'block';
      modalAvatar.style.background = 'transparent';
    } else {
      modalAvatarImg.style.display = 'none';
      modalAvatar.textContent = initials;
      modalAvatar.style.background = p.color;
    }
    modalAvatar.style.borderColor = p.color;
    modalAvatar.style.boxShadow = `0 0 0 2px ${p.color}55`;
    modalReason.textContent = p.reason;
    mScore.textContent      = p.score;
    mDuel.textContent       = p.duel;
    mXG.textContent         = p.xG;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Attach to player rows
  document.querySelectorAll('.role-player').forEach(row => {
    row.addEventListener('click', () => {
      const av = row.querySelector('.player-avatar');
      if (av) openModal(av.dataset.initials);
    });
  });

  // Attach to review list
  document.querySelectorAll('.review-item').forEach(row => {
    row.addEventListener('click', () => {
      const playerKey = row.dataset.player;
      if (playerKey && playerData[playerKey]) {
        openModal(playerKey);
        return;
      }
      const nameEl = row.querySelector('.review-name');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      const found = Object.entries(playerData).find(([k,v]) =>
        v.full === name || v.name === name ||
        name.includes(v.name.split('.')[1]?.trim() || '')
      );
      if (found) openModal(found[0]);
    });
  });

  // Watchlist button in modal
  modalWatch.addEventListener('click', () => {
    closeModal();
    showToast('success', `<i class="fas fa-star"></i> Added to Watchlist`);
  });

  document.getElementById('modalProfile').addEventListener('click', () => {
    closeModal();
    showToast('info', `<i class="fas fa-user"></i> Full profile coming soon`);
  });


  /* ── TOAST SYSTEM ──────────────────────────────── */
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  function showToast(type, html, duration = 3000) {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = html;
    toastContainer.appendChild(t);
    setTimeout(() => {
      t.classList.add('fade-out');
      setTimeout(() => t.remove(), 300);
    }, duration);
  }


  /* ── ACTION BUTTONS ────────────────────────────── */
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.querySelector('span')?.textContent || btn.textContent.trim();
      if (text.includes('Brief')) {
        showToast('success', '<i class="fas fa-download" style="color:var(--green)"></i> Downloading March 2026 Brief…');
      } else if (text.includes('CSV')) {
        showToast('success', '<i class="fas fa-file-csv" style="color:var(--green)"></i> Exporting player CSV…');
      } else if (text.includes('Watchlist')) {
        showToast('info', '<i class="fas fa-star" style="color:var(--amber)"></i> Opening Watchlist…');
      }
    });
  });

  document.querySelector('.btn-download-brief').addEventListener('click', () => {
    showToast('success', '<i class="fas fa-download" style="color:var(--green)"></i> Downloading latest brief…');
  });

  /* ── TAG ITEM CLICK ────────────────────────────── */
  document.querySelectorAll('.tag-item').forEach(tag => {
    tag.addEventListener('click', () => {
      const name = tag.querySelector('.tag-name').textContent;
      showToast('info', `<i class="fas fa-tags" style="color:var(--accent)"></i> Filtering by: ${name}`);
    });
  });

  /* ── MOVER ITEMS ───────────────────────────────── */
  document.querySelectorAll('.mover-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.mover-name').textContent;
      const isRising = item.classList.contains('rising-mover');
      const icon = isRising
        ? '<i class="fas fa-arrow-up" style="color:var(--green)"></i>'
        : '<i class="fas fa-arrow-down" style="color:var(--red)"></i>';
      showToast('info', `${icon} ${name} — signal detail coming soon`);
    });
  });

  /* ── TAG BAR ANIMATION ON LOAD ─────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.tag-bar-fill').forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0%';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bar.style.width = targetWidth;
            });
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const tagsPanel = document.querySelector('.tags-panel');
  if (tagsPanel) observer.observe(tagsPanel);


  /* ── SEARCH BAR (keyboard shortcut) ───────────── */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-bar input').focus();
    }
  });

  /* ── LIVE SIGNAL PULSE ─────────────────────────── */
  // Randomly update one score every 8 seconds to simulate live data
  const scores = document.querySelectorAll('.player-score');
  setInterval(() => {
    const el = scores[Math.floor(Math.random() * scores.length)];
    if (!el) return;
    const current = parseFloat(el.textContent);
    if (isNaN(current)) return;
    const delta = (Math.random() * 0.2 - 0.1).toFixed(1);
    const next  = Math.min(10, Math.max(5, current + parseFloat(delta))).toFixed(1);
    el.style.transition = 'color 0.4s, transform 0.2s';
    el.style.transform  = 'scale(1.15)';
    el.style.color = parseFloat(delta) > 0 ? 'var(--green)' : 'var(--red)';
    setTimeout(() => {
      el.textContent  = next;
      el.style.transform = 'scale(1)';
    }, 150);
    setTimeout(() => {
      el.style.color = '';
    }, 600);
  }, 8000);


  /* ── PANEL VIEW ALL ────────────────────────────── */
  document.querySelector('.panel-action-btn')?.addEventListener('click', () => {
    showToast('info', '<i class="fas fa-running" style="color:var(--accent)"></i> Full player list coming soon');
  });

  /* ── ALERT CARDS CLICK ─────────────────────────── */
  document.querySelectorAll('.alert-card').forEach(card => {
    card.addEventListener('click', () => {
      const label = card.querySelector('.alert-label').textContent;
      showToast('info', `<i class="fas fa-bolt" style="color:var(--accent)"></i> ${label}`);
    });
  });

  /* ── CYCLE LABEL CLICK ─────────────────────────── */
  document.querySelector('.cycle-label')?.addEventListener('click', () => {
    showToast('info', '<i class="far fa-clock" style="color:var(--accent)"></i> March 2026 Signal Cycle — active');
  });

  /* ── STATUS PILLS HOVER ────────────────────────── */
  document.querySelectorAll('.status-pill').forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.addEventListener('click', () => {
      const num  = pill.querySelector('strong').textContent;
      const label = pill.querySelector('span:last-child').textContent;
      showToast('info', `<i class="fas fa-info-circle" style="color:var(--accent)"></i> ${num} ${label}`);
    });
  });

  console.log('%c⚡ ShadowScout loaded', 'color:#4F8EF7;font-weight:bold;font-size:14px');
  console.log('%cLigue 2 Signal Board — March 2026 Cycle', 'color:#7b92b0;font-size:11px');
});
