/* Portal PSJE — alternância entre tema claro e escuro */
(function () {
  'use strict';

  var STORAGE_KEY = 'psje-theme';
  var root = document.documentElement;

  function readTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      returan saved === 'dark' || saved === 'light' ? saved : 'light';
    } catch (error) {
      return 'light';
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var button = document.getElementById('themeToggle');
    if (!button) return;

    var darkActive = theme === 'dark';
    button.setAttribute('aria-pressed', darkActive ? 'true' : 'false');
    button.setAttribute('aria-label', darkActive ? 'Ativar tema claro' : 'Ativar tema escuro');
    button.setAttribute('title', darkActive ? 'Ativar tema claro' : 'Ativar tema escuro');
    button.innerHTML = darkActive
      ? '<span class="theme-toggle-icon" aria-hidden="true">☀</span><span class="theme-toggle-label">Tema claro</span>'
      : '<span class="theme-toggle-icon" aria-hidden="true">☾</span><span class="theme-toggle-label">Tema escuro</span>';
  }

  // Aplica a preferência salva antes de configurar o botão.
  var currentTheme = readTheme();
  applyTheme(currentTheme);

  function addToggle() {
    var header = document.querySelector('.site-header .header-row');
    if (!header || document.getElementById('themeToggle')) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.addEventListener('click', function () {
      currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      try { localStorage.setItem(STORAGE_KEY, currentTheme); } catch (error) { /* preferência não disponível */ }
    });

    header.appendChild(button);
    applyTheme(currentTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle);
  } else {
    addToggle();
  }
})();
