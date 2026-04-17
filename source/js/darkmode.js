/**
 * Dark Mode Controller
 * - Time-based auto switching: 06:00-17:59 = light, 18:00-05:59 = dark
 * - Manual toggle button in sidebar
 * - Persists user preference in localStorage
 */

(function() {
  const STORAGE_KEY = 'lvc_dark_mode';
  const LIGHT_HOUR_START = 6;  // 06:00
  const LIGHT_HOUR_END = 18;   // 18:00 (excluded, so 18:00 starts dark)

  // Check if currently in light hours (06:00-17:59)
  function isLightHours() {
    const hour = new Date().getHours();
    return hour >= LIGHT_HOUR_START && hour < LIGHT_HOUR_END;
  }

  // Get initial mode: check localStorage first, then time-based
  function getInitialMode() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return stored === 'light' ? 'light' : 'dark';
    }
    // No preference stored, use time-based
    return isLightHours() ? 'light' : 'dark';
  }

  // Apply mode to page
  function applyMode(mode) {
    if (mode === 'dark') {
      document.body.classList.add('darkmode');
      document.body.classList.remove('darkmode--highlight');
    } else {
      document.body.classList.remove('darkmode');
    }
    updateButtonStyle(mode);
  }

  // Update button style based on mode
  function updateButtonStyle(mode) {
    const btn = document.getElementById('darkmode-toggle');
    if (!btn) return;

    if (mode === 'dark') {
      btn.style.background = '#3a3a3c';
      btn.style.color = '#e5e5e7';
      btn.style.borderColor = '#555';
    } else {
      btn.style.background = '#f0f0f0';
      btn.style.color = '#333';
      btn.style.borderColor = 'rgba(0,0,0,0.1)';
    }
  }

  // Toggle mode
  function toggleMode() {
    const currentMode = document.body.classList.contains('darkmode') ? 'dark' : 'light';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, newMode);
    applyMode(newMode);
    updateButtonText(newMode);
  }

  // Update toggle button text
  function updateButtonText(mode) {
    const btn = document.getElementById('darkmode-toggle');
    if (btn) {
      btn.textContent = mode === 'dark' ? '☀️ 浅色模式' : '🌙 深色模式';
      updateButtonStyle(mode);
    }
  }

  // Create and inject the toggle button
  function createToggleButton(mode) {
    // Try multiple selectors to find the right insertion point
    const sidebar = document.querySelector('.sidebar-inner .site-overview');
    if (!sidebar) return;

    // Check if button already exists
    if (document.getElementById('darkmode-toggle')) return;

    const btn = document.createElement('div');
    btn.id = 'darkmode-toggle';
    btn.className = 'darkmode-toggle-btn';
    btn.textContent = mode === 'dark' ? '☀️ 浅色模式' : '🌙 深色模式';
    btn.style.cssText = 'padding: 10px 12px; margin: 10px 0; text-align: center; cursor: pointer; border-radius: 6px; background: var(--btn-default-bg, #f0f0f0); color: var(--btn-default-color, #333); font-size: 14px; transition: all 0.3s ease; border: 1px solid rgba(0,0,0,0.1);';
    btn.onclick = toggleMode;

    sidebar.insertBefore(btn, sidebar.firstChild);
  }

  // Initialize
  function init() {
    const mode = getInitialMode();
    applyMode(mode);

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createToggleButton(mode);
      });
    } else {
      createToggleButton(mode);
    }

    // Check time every minute and auto-switch if needed
    setInterval(function() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        // No manual preference, auto-switch based on time
        const shouldBeLight = isLightHours();
        const currentIsDark = document.body.classList.contains('darkmode');
        if ((shouldBeLight && currentIsDark) || (!shouldBeLight && !currentIsDark)) {
          const newMode = shouldBeLight ? 'light' : 'dark';
          applyMode(newMode);
          updateButtonText(newMode);
        }
      }
    }, 60000); // Check every minute
  }

  init();
})();
