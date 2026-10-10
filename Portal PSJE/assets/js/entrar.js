// Portal PSJE — /portal-8f3k2/entrar.html
//
// ATENÇÃO — ISTO NÃO É AUTENTICAÇÃO REAL:
// Usuário e senha estão fixos aqui no JavaScript, que qualquer visitante
// pode ler abrindo "Ver código-fonte" no navegador. Esconder a URL desta
// página (ver README) reduz a chance de alguém achar por acaso, mas não
// substitui autenticação de verdade. Antes de publicar este site fora de
// um protótipo/apresentação, troque isto por um login no servidor.

document.addEventListener('DOMContentLoaded', function () {
  var ADMIN_USER = 'admin';
  var ADMIN_PASS = 'psje2026';

  var form = document.getElementById('loginForm');
  if (!form) return;

  form.querySelectorAll('input').forEach(function (el) {
    el.addEventListener('input', function () { el.closest('.field').classList.remove('has-error'); });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var user = document.getElementById('loginUser');
    var pass = document.getElementById('loginPass');
    var status = document.getElementById('loginStatus');
    var submitBtn = form.querySelector('button[type="submit"]');
    var valid = true;

    [user, pass].forEach(function (field) {
      var wrapper = field.closest('.field');
      var ok = field.value.trim() !== '';
      wrapper.classList.toggle('has-error', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      status.className = 'form-status error show';
      status.innerHTML = '<svg class="icon"><use href="#i-alert-circle"/></svg><span>Preencha usuário e senha para continuar.</span>';
      return;
    }

    if (user.value.trim() === ADMIN_USER && pass.value === ADMIN_PASS) {
      localStorage.setItem('psje_admin', '1');
      status.className = 'form-status success show';
      status.innerHTML = '<svg class="icon"><use href="#i-check-circle"/></svg><span>Login realizado. Entrando…</span>';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Entrando…';
      setTimeout(function () { window.location.href = '../eventos.html'; }, 700);
    } else {
      status.className = 'form-status error show';
      status.innerHTML = '<svg class="icon"><use href="#i-alert-circle"/></svg><span>Usuário ou senha incorretos.</span>';
    }
  });
});
