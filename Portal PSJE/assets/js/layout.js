// Portal PSJE — cabeçalho e rodapé globais
//
// Por que gerar isso em JS, e não com fetch() + includes?
// Abrir o site direto do disco (file://) bloqueia fetch() por CORS —
// foi por isso que a versão anterior deste site duplicava o cabeçalho
// e o rodapé em cada arquivo .html (ver README). Montando o HTML aqui
// dentro do próprio JavaScript (em vez de buscar um arquivo externo),
// o site continua funcionando sem nenhum servidor, mas sem precisar
// repetir esse código em cada página.
//
// CUSTO REAL desta abordagem, para deixar bem claro: com JavaScript
// desligado no navegador, a página perde cabeçalho, menu e rodapé —
// só o <main> de cada página continua aparecendo. Isso é uma troca
// consciente (ver README), o preço de eliminar a repetição sem usar
// um servidor nem um processo de build.
//
// Como funciona: cada página HTML tem dois marcadores vazios,
// <div id="layout-top"></div> e <div id="layout-bottom"></div>, e
// declara qual página é no atributo data-page do <body>. Este script
// roda de forma síncrona (sem esperar DOMContentLoaded) porque sua
// própria tag <script> já vem depois dos dois marcadores no HTML —
// então, quando ele executa, os marcadores já existem no documento.

(function () {
  var NAV_ITEMS = [
    ['index.html', 'index', 'Início'],
    ['eventos.html', 'eventos', 'Eventos'],
    ['contato.html', 'contato', 'Contato'],
    ['doacoes.html', 'doacoes', 'Doações'],
    ['solicitacao.html', 'solicitacao', 'Solicitação']
  ];

  var currentPage = document.body.getAttribute('data-page') || '';

  function buildNavLinks() {
    return NAV_ITEMS.map(function (item) {
      var cls = item[1] === currentPage ? ' class="active"' : '';
      return '<a href="' + item[0] + '"' + cls + '>' + item[2] + '</a>';
    }).join('');
  }

  var LOGO_INNER =
    '<svg class="icon icon-28 logo-emblem"><use href="#i-emblem"/></svg>' +
    '<span class="logo-text"><span class="parish-tag">Paróquia</span><span class="parish-name">São João Evangelista</span></span>';

  var SPRITE =
    '<svg class="sprite"><defs>' +
    '<symbol id="i-emblem" viewBox="0 0 40 40"><g stroke-width="1.4"><line x1="20" y1="2" x2="20" y2="7"/><line x1="11" y1="6" x2="14" y2="10"/><line x1="29" y1="6" x2="26" y2="10"/></g><circle cx="20" cy="14" r="5" fill="currentColor" stroke="none"/><path d="M4 34 C10 30 15 30 20 33 C25 30 30 30 36 34 L36 36 C30 33 25 33 20 35 C15 33 10 33 4 36 Z"/><line x1="20" y1="33" x2="20" y2="35"/></symbol>' +
    '<symbol id="i-church" viewBox="0 0 24 24"><path d="M12 3v4"/><path d="M9 5h6"/><path d="M5 21V11l7-5 7 5v10"/><path d="M9 21v-6h6v6"/><circle cx="12" cy="10" r="1.5"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.5-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9z"/></symbol>' +
    '<symbol id="i-people" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><circle cx="16" cy="9.5" r="2.6"/><path d="M3 20c.8-4 3.3-6.5 6-6.5s5.2 2.5 6 6.5"/><path d="M14 14.2c2 .4 3.6 2.4 4 5.8" opacity=".7"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></symbol>' +
    '<symbol id="i-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>' +
    '<symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></symbol>' +
    '<symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5 5-5.5"/></symbol>' +
    '<symbol id="i-alert-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7.5" x2="12" y2="13"/><circle cx="12" cy="16.3" r="0.6" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.4"/></symbol>' +
    '<symbol id="i-wa" viewBox="0 0 24 24"><path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 19z"/><path d="M8.5 8.7c.2 3 2.8 5.6 5.8 5.8" stroke-width="2"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></symbol>' +
    '<symbol id="i-pix" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(45 12 12)"/></symbol>' +
    '<symbol id="i-card" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><line x1="2.5" y1="9.5" x2="21.5" y2="9.5"/></symbol>' +
    '<symbol id="i-bank" viewBox="0 0 24 24"><path d="M4 10l8-5 8 5"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="6" y1="10" x2="6" y2="17"/><line x1="12" y1="10" x2="12" y2="17"/><line x1="18" y1="10" x2="18" y2="17"/><line x1="4" y1="19" x2="20" y2="19"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.3"/><path d="M14.3 8.2h-1.6c-1 0-1.7.7-1.7 1.8v1.7h3l-.4 2.3h-2.6V21"/></symbol>' +
    '</defs></svg>';

  function topHtml() {
    return (
      SPRITE +
      '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>' +
      '<header class="site-header">' +
      '  <div class="wrap header-row">' +
      '    <button class="menu-toggle" id="openMobileNav" aria-label="Abrir menu" aria-expanded="false"><svg class="icon"><use href="#i-menu"/></svg></button>' +
      '    <a href="index.html" class="logo">' + LOGO_INNER + '</a>' +
      '    <nav class="main-nav">' + buildNavLinks() + '</nav>' +
      '  </div>' +
      '</header>' +
      '<div class="mobile-nav" id="mobileNav">' +
      '  <div class="mobile-nav-head">' +
      '    <a href="index.html" class="logo">' + LOGO_INNER + '</a>' +
      '    <button class="menu-toggle" id="closeMobileNav" aria-label="Fechar menu"><svg class="icon"><use href="#i-close"/></svg></button>' +
      '  </div>' +
      buildNavLinks() +
      '</div>'
    );
  }

  function bottomHtml() {
    return (
      '<footer class="site-footer">' +
      '  <div class="wrap">' +
      '    <div class="footer-grid">' +
      '      <div class="footer-brand">' +
      '        <a href="index.html" class="logo">' + LOGO_INNER + '</a>' +
      '        <p>Comunidade católica que celebra a fé, acolhe quem chega e serve ao próximo, sob a proteção de São João Evangelista.</p>' +
      '      </div>' +
      '      <div>' +
      '        <h5>Navegação</h5>' +
      '        <ul>' +
      '          <li><a href="index.html">Início</a></li>' +
      '          <li><a href="eventos.html">Eventos</a></li>' +
      '          <li><a href="contato.html">Contato</a></li>' +
      '          <li><a href="doacoes.html">Doações</a></li>' +
      '          <li><a href="solicitacao.html">Solicitação</a></li>' +
      '        </ul>' +
      '      </div>' +
      '      <div>' +
      '        <h5>Missas da semana</h5>' +
      '        <div class="footer-schedule">' +
      '          <div><span>Terça a sábado</span><span>19h</span></div>' +
      '          <div><span>Domingo</span><span>8h e 19h</span></div>' +
      '        </div>' +
      '      </div>' +
      '      <div>' +
      '        <h5>Contato</h5>' +
      '        <div class="contact-line"><svg class="icon icon-16"><use href="#i-pin"/></svg><span>Rua Exemplo, 123 — Bairro, Cidade/UF</span></div>' +
      '        <div class="contact-line"><svg class="icon icon-16"><use href="#i-mail"/></svg><span>secretaria@saojoaoevangelista.org.br</span></div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="footer-bottom">' +
      '      <span>&copy; <span id="year"></span> Paróquia São João Evangelista. Todos os direitos reservados.</span>' +
      '    </div>' +
      '  </div>' +
      '</footer>' +
      '<div class="floating-social" aria-label="Redes sociais da paróquia">' +
      '  <!-- EDITAR: colocar o link real do Instagram -->' +
      '  <a href="#" class="social-btn" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram — inserir link"><svg class="icon"><use href="#i-instagram"/></svg></a>' +
      '  <!-- EDITAR: colocar o link real do Facebook -->' +
      '  <a href="#" class="social-btn" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook — inserir link"><svg class="icon"><use href="#i-facebook"/></svg></a>' +
      '  <!-- EDITAR: colocar o link real do WhatsApp/canal -->' +
      '  <a href="#" class="social-btn" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp — inserir link"><svg class="icon"><use href="#i-wa"/></svg></a>' +
      '</div>'
    );
  }

  var topMarker = document.getElementById('layout-top');
  if (topMarker) topMarker.outerHTML = topHtml();

  var bottomMarker = document.getElementById('layout-bottom');
  if (bottomMarker) bottomMarker.outerHTML = bottomHtml();
})();
