// Portal PSJE — comportamento compartilhado entre todas as páginas públicas
document.addEventListener('DOMContentLoaded', function () {

  // ----- menu mobile -----
  var openBtn = document.getElementById('openMobileNav');
  var closeBtn = document.getElementById('closeMobileNav');
  var mobileNav = document.getElementById('mobileNav');

  if (openBtn && mobileNav) {
    openBtn.addEventListener('click', function () {
      mobileNav.classList.add('open');
      openBtn.setAttribute('aria-expanded', 'true');
    });
  }
  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- ano automático no rodapé -----
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // ----- botões flutuantes de redes sociais ainda não configurados -----
  // Enquanto o href continuar "#" (placeholder, ver comentários EDITAR no
  // HTML), o clique não deve fazer a página saltar para o topo.
  document.querySelectorAll('.social-btn').forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      if (btn.getAttribute('href') === '#') { ev.preventDefault(); }
    });
  });

  // ----- notícias da Home: "Leia mais" / "Ler menos" -----
  document.querySelectorAll('.news-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.news-row');
      if (!row) return;
      var expanded = row.classList.toggle('expanded');
      btn.textContent = expanded ? 'Ler menos' : 'Leia mais';
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
});
