// Portal PSJE — página de solicitação
//
// ATENÇÃO — INTEGRAÇÃO COM BACKEND:
// Este é um site estático (HTML/CSS/JS puro), sem servidor. O formulário
// abaixo valida os campos e mostra uma confirmação visual, mas não envia
// e-mail de verdade. Para que as solicitações cheguem à secretaria, troque
// a função "enviarSolicitacao" por uma chamada a um serviço como Formspree,
// EmailJS ou Google Forms / Apps Script.

// Portal PSJE — página de solicitação integrada com o Google Forms
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('solicitacaoForm');
  if (!form) return;

  var status = document.getElementById('solicitacaoStatus');
  var successPanel = document.getElementById('formSuccess');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^[\d\s()+-]{8,}$/;

  // URL final de resposta do seu Google Forms
  var GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeauGeqHAnOIkAwRLLTHCwMO6XseiA-Q7EYbPqFp8wLJbahKA/viewform?usp=header';

  function markField(el, ok) {
    var wrapper = el.closest('.field');
    wrapper.classList.toggle('has-error', !ok);
    return ok;
  }

  form.querySelectorAll('input, select, textarea').forEach(function (el) {
    el.addEventListener('input', function () { el.closest('.field').classList.remove('has-error'); });
    el.addEventListener('change', function () { el.closest('.field').classList.remove('has-error'); });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var nome = document.getElementById('solNome');
    var contato = document.getElementById('solContato');
    var setor = document.getElementById('solSetor');
    var mensagem = document.getElementById('solMensagem');

    var valid = true;
    valid = markField(nome, nome.value.trim().length >= 3) && valid;
    valid = markField(contato, emailPattern.test(contato.value.trim()) || phonePattern.test(contato.value.trim())) && valid;
    valid = markField(setor, setor.value !== '') && valid;
    valid = markField(mensagem, mensagem.value.trim().length >= 10) && valid;

    if (!valid) {
      status.className = 'form-status error show';
      status.innerHTML = '<svg class="icon"><use href="#i-alert-circle"/></svg><span>Verifique os campos destacados antes de enviar.</span>';
      return;
    }

    var setorTexto = setor.options[setor.selectedIndex].textContent;
    var submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = 'A enviar...';

    // Monta os dados para o Google Forms usando os IDs identificados
    var formData = new FormData();
    formData.append('entry.92951713', nome.value.trim());      // Nome completo
    formData.append('entry.2121745194', contato.value.trim()); // E-mail ou celular
    formData.append('entry.974784037', setorTexto);           // Enviar para (Setor)
    formData.append('entry.432932561', mensagem.value.trim()); // Mensagem

    // Envio assíncrono para o Google Forms sem redirecionar a página
    fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // Evita o bloqueio de política CORS
      body: formData
    })
    .then(function () {
      status.classList.remove('show');
      form.classList.add('hidden');
      if (successPanel) {
        successPanel.querySelector('[data-setor-nome]').textContent = setorTexto;
        successPanel.classList.add('visible');
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus();
      }
    })
    .catch(function () {
      status.className = 'form-status error show';
      status.innerHTML = '<svg class="icon"><use href="#i-alert-circle"/></svg><span>Ocorreu um erro ao enviar. Tente novamente mais tarde.</span>';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitação';
    });
  });
});