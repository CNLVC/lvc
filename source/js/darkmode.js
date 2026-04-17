/**
 * Dark Mode Controller
 * - Time-based auto switching: 06:00-17:59 = light, 18:00-05:59 = dark
 * - Manual toggle button in sidebar (bottom)
 * - Persists user preference in localStorage
 */

(function() {
  const STORAGE_KEY = 'lvc_dark_mode';
  const LIGHT_HOUR_START = 6;
  const LIGHT_HOUR_END = 18;

  function isLightHours() {
    const hour = new Date().getHours();
    return hour >= LIGHT_HOUR_START && hour < LIGHT_HOUR_END;
  }

  function getInitialMode() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return stored === 'light' ? 'light' : 'dark';
    }
    return isLightHours() ? 'light' : 'dark';
  }

  function applyMode(mode) {
    if (mode === 'dark') {
      document.body.classList.add('darkmode');
      document.body.classList.remove('darkmode--highlight');
    } else {
      document.body.classList.remove('darkmode');
    }
    updateButtonStyle(mode);
  }

  function updateButtonStyle(mode) {
    const btn = document.getElementById('darkmode-toggle');
    if (!btn) return;
    if (mode === 'dark') {
      btn.style.background = '#3a3a3c';
      btn.style.color = '#e5e5e7';
      btn.style.borderColor = '#555';
    } else {
      btn.style.background = '#f0f0f0';
      btn.style.color = '#555';
      btn.style.borderColor = '#ddd';
    }
  }

  function toggleMode() {
    const currentMode = document.body.classList.contains('darkmode') ? 'dark' : 'light';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, newMode);
    applyMode(newMode);
    updateButtonText(newMode);
  }

  function updateButtonText(mode) {
    const btn = document.getElementById('darkmode-toggle');
    if (btn) {
      btn.textContent = mode === 'dark' ? '☀️' : '🌙';
      btn.title = mode === 'dark' ? '切换到浅色模式' : '切换到深色模式';
      updateButtonStyle(mode);
    }
  }

  // Create button and insert at BOTTOM of sidebar (homepage only)
  function createToggleButton(mode) {
    // Only show toggle button on homepage
    const path = window.location.pathname;
    const isHomepage = path === '/' || path === '/2026/' || path.match(/^\/\d{4}\/$/);
    if (!isHomepage) return;

    // Try multiple possible sidebar containers (for different page types)
    const selectors = [
      '.sidebar-inner .site-overview-wrap',
      '.sidebar-inner .sidebar-panel',
      '.sidebar-inner',
      '#sidebar .sidebar-inner'
    ];

    let container = null;
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) { container = el; break; }
    }
    if (!container) return;
    if (document.getElementById('darkmode-toggle')) return;

    const btn = document.createElement('div');
    btn.id = 'darkmode-toggle';
    btn.className = 'darkmode-toggle-btn';
    btn.textContent = mode === 'dark' ? '☀️' : '🌙';
    btn.title = mode === 'dark' ? '切换到浅色模式' : '切换到深色模式';
    btn.onclick = toggleMode;
    btn.style.cssText = 'width: 32px; height: 32px; line-height: 32px; margin: 8px auto; text-align: center; cursor: pointer; border-radius: 50%; font-size: 16px; transition: all 0.3s;';

    // Insert at the end (bottom) of the container
    container.appendChild(btn);
  }

  function init() {
    const mode = getInitialMode();

    // Apply mode immediately (before DOM ready)
    applyMode(mode);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createToggleButton(mode);
      });
    } else {
      createToggleButton(mode);
    }

    // Check time every minute for auto-switch
    setInterval(function() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        const shouldBeLight = isLightHours();
        const currentIsDark = document.body.classList.contains('darkmode');
        if ((shouldBeLight && currentIsDark) || (!shouldBeLight && !currentIsDark)) {
          const newMode = shouldBeLight ? 'light' : 'dark';
          applyMode(newMode);
          updateButtonText(newMode);
        }
      }
    }, 60000);
  }

  init();
})();
