/* Portal PSJE — aviso de privacidade e armazenamento local */
(function () {
  'use strict';

  var STORAGE_KEY = 'psje-privacy-consent';

  function hasAccepted() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'accepted';
    } catch (error) {
      // Se o navegador bloquear o armazenamento, o aviso continua disponível.
      return false;
    }
  }

  function saveAcceptance() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch (error) {
      // O banner ainda será fechado nesta visita, mesmo sem persistência disponível.
    }
  }

  function showBanner() {
    if (hasAccepted() || document.getElementById('privacyCookieBanner')) return;

    var banner = document.createElement('aside');
    banner.id = 'privacyCookieBanner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-labelledby', 'privacyCookieTitle');
    banner.innerHTML =
      '<div class="cookie-banner-content">' +
        '<h2 id="privacyCookieTitle">Privacidade e armazenamento local</h2>' +
        '<p>Este portal utiliza o armazenamento local do navegador para lembrar sua preferência de tema e registrar que você confirmou este aviso. As solicitações enviadas pelo formulário são encaminhadas ao Google Forms.</p>' +
      '</div>' +
      '<button type="button" id="acceptPrivacyNotice">Entendi e aceito</button>';

    document.body.appendChild(banner);

    var acceptButton = document.getElementById('acceptPrivacyNotice');
    acceptButton.addEventListener('click', function () {
      saveAcceptance();
      banner.classList.add('is-hiding');
      banner.addEventListener('transitionend', function (event) {
        if (event.target === banner && event.propertyName === 'opacity') banner.remove();
      }, { once: true });
      // Fallback para navegadores que não disparem transitionend.
      window.setTimeout(function () {
        if (banner.isConnected) banner.remove();
      }, 400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
