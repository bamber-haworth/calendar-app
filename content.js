(function () {
  'use strict';

  const STAKEHOLDER_URL = 'https://metaverse-sherpa-no-hct7.bolt.host';
  const MODAL_ID = 'crux-modal';

  function createModal() {
    const overlay = document.createElement('div');
    overlay.id = MODAL_ID;
    overlay.innerHTML = `
      <style>
        #${MODAL_ID} {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.55);
          font-family: 'Google Sans', Roboto, Arial, sans-serif;
        }
        #${MODAL_ID} .mr-card {
          background: #fff; border-radius: 12px; padding: 36px 40px 32px;
          max-width: 480px; width: 90vw; box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        }
        #${MODAL_ID} .mr-title { font-size: 20px; font-weight: 600; color: #202124; margin: 0 0 6px; }
        #${MODAL_ID} .mr-sub  { font-size: 14px; color: #5f6368; margin: 0 0 28px; }
        #${MODAL_ID} .mr-options { display: flex; flex-direction: column; gap: 12px; }
        #${MODAL_ID} .mr-btn {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px;
          border: 1.5px solid #dadce0; border-radius: 8px; background: #fff;
          cursor: pointer; text-align: left; width: 100%;
          transition: border-color 0.15s, background 0.15s;
        }
        #${MODAL_ID} .mr-btn:hover { border-color: #1a73e8; background: #f0f4ff; }
        #${MODAL_ID} .mr-btn-icon  { font-size: 22px; flex-shrink: 0; width: 32px; text-align: center; }
        #${MODAL_ID} .mr-btn-label { font-size: 15px; font-weight: 500; color: #202124; }
        #${MODAL_ID} .mr-btn-desc  { font-size: 12px; color: #5f6368; margin-top: 2px; }

        #${MODAL_ID} .mr-iframe-view {
          display: none; flex-direction: column; height: 85vh; width: 90vw;
          max-width: 900px; background: #fff; border-radius: 12px;
          overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        }
        #${MODAL_ID} .mr-iframe-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; border-bottom: 1px solid #dadce0; flex-shrink: 0;
        }
        #${MODAL_ID} .mr-iframe-header span { font-size: 15px; font-weight: 600; color: #202124; }
        #${MODAL_ID} .mr-back {
          background: none; border: none; cursor: pointer; color: #1a73e8;
          font-size: 14px; font-weight: 500; padding: 6px 10px; border-radius: 4px;
        }
        #${MODAL_ID} .mr-back:hover { background: #f0f4ff; }
        #${MODAL_ID} .mr-iframe-wrap { flex: 1; position: relative; }
        #${MODAL_ID} .mr-iframe-wrap iframe { width: 100%; height: 100%; border: none; display: block; }
        #${MODAL_ID} .mr-fallback {
          display: none; flex-direction: column; align-items: center;
          justify-content: center; height: 100%; gap: 16px; padding: 40px; text-align: center;
        }
        #${MODAL_ID} .mr-fallback p { color: #5f6368; font-size: 14px; margin: 0; }
        #${MODAL_ID} .mr-open-btn {
          display: inline-block; background: #1a73e8; color: #fff; border: none;
          border-radius: 6px; padding: 10px 20px; font-size: 14px; font-weight: 500;
          cursor: pointer; text-decoration: none;
        }
        #${MODAL_ID} .mr-open-btn:hover { background: #1557b0; }
      </style>

      <div class="mr-card" id="mr-card">
        <p class="mr-title">What do you need?</p>
        <p class="mr-sub">Choose a meeting type to get started.</p>
        <div class="mr-options">
          <button class="mr-btn" data-type="stakeholder">
            <span class="mr-btn-icon">✅</span>
            <div><div class="mr-btn-label">Stakeholder Approval</div><div class="mr-btn-desc">Requires sign-off before scheduling</div></div>
          </button>
          <button class="mr-btn" data-type="team">
            <span class="mr-btn-icon">👥</span>
            <div><div class="mr-btn-label">Team Meeting</div><div class="mr-btn-desc">Internal team sync or standup</div></div>
          </button>
          <button class="mr-btn" data-type="client">
            <span class="mr-btn-icon">🤝</span>
            <div><div class="mr-btn-label">Client Meeting</div><div class="mr-btn-desc">External meeting with a client</div></div>
          </button>
          <button class="mr-btn" data-type="other">
            <span class="mr-btn-icon">📅</span>
            <div><div class="mr-btn-label">Other</div><div class="mr-btn-desc">Continue to Google Calendar as normal</div></div>
          </button>
        </div>
      </div>

      <div class="mr-iframe-view" id="mr-iframe-view">
        <div class="mr-iframe-header">
          <span>Stakeholder Approval</span>
          <button class="mr-back" id="mr-back">← Back</button>
        </div>
        <div class="mr-iframe-wrap" id="mr-iframe-wrap">
          <iframe id="mr-iframe" src="" sandbox="allow-scripts allow-forms allow-same-origin allow-popups"></iframe>
          <div class="mr-fallback" id="mr-fallback">
            <p>This page can't be embedded directly.<br>Open it in a new tab to continue.</p>
            <a class="mr-open-btn" href="${STAKEHOLDER_URL}" target="_blank" rel="noopener">Open Approval Form</a>
          </div>
        </div>
      </div>
    `;
    return overlay;
  }

  function removeModal() {
    const el = document.getElementById(MODAL_ID);
    if (el) el.remove();
  }

  function showModal() {
    if (document.getElementById(MODAL_ID)) return;
    const modal = createModal();
    document.body.appendChild(modal);

    const card      = document.getElementById('mr-card');
    const iframeView = document.getElementById('mr-iframe-view');
    const backBtn   = document.getElementById('mr-back');
    const iframe    = document.getElementById('mr-iframe');
    const fallback  = document.getElementById('mr-fallback');

    card.querySelectorAll('.mr-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.type === 'stakeholder') {
          card.style.display = 'none';
          iframeView.style.display = 'flex';
          iframe.src = STAKEHOLDER_URL;

          const t = setTimeout(() => {
            fallback.style.display = 'flex';
            iframe.style.display = 'none';
          }, 6000);

          iframe.addEventListener('load', () => {
            clearTimeout(t);
            fallback.style.display = 'none';
            iframe.style.display = 'block';
          }, { once: true });
        } else {
          removeModal();
        }
      });
    });

    backBtn.addEventListener('click', () => {
      iframe.src = '';
      iframeView.style.display = 'none';
      card.style.display = 'block';
    });

    modal.addEventListener('click', e => { if (e.target === modal) removeModal(); });
  }

  let lastUrl = location.href;
  let pending = false;

  function onUrlChange() {
    const url = location.href;
    if (url === lastUrl) return;
    lastUrl = url;
    if (isNewEvent(url)) {
      if (!pending) { pending = true; setTimeout(() => { showModal(); pending = false; }, 300); }
    } else {
      removeModal();
    }
  }

  function isNewEvent(url) {
    return url.includes('/eventedit') || url.includes('action=TEMPLATE');
  }

  const _push = history.pushState.bind(history);
  history.pushState = (...a) => { _push(...a); onUrlChange(); };
  const _replace = history.replaceState.bind(history);
  history.replaceState = (...a) => { _replace(...a); onUrlChange(); };

  window.addEventListener('popstate', onUrlChange);
  setInterval(onUrlChange, 500);

  if (isNewEvent(location.href)) setTimeout(showModal, 500);
})();