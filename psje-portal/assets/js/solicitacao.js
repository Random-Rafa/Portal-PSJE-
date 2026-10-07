// Portal PSJE — página de solicitação
//
// ATENÇÃO — INTEGRAÇÃO COM BACKEND:
// Este é um site estático (HTML/CSS/JS puro), sem servidor. O formulário
// abaixo valida os campos e mostra uma confirmação visual, mas não envia
// e-mail de verdade. Para que as solicitações cheguem à secretaria, troque
// a função "enviarSolicitacao" por uma chamada a um serviço como Formspree,
// EmailJS ou Google Forms / Apps Script.

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('solicitacaoForm');
  if (!form) return;

  var status = document.getElementById('solicitacaoStatus');
  var successPanel = document.getElementById('formSuccess');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^[\d\s()+-]{8,}$/;

  function markField(el, ok) {
    var wrapper = el.closest('.field');
    wrapper.classList.toggle('has-error', !ok);
    return ok;
  }

  // remove o erro assim que a pessoa volta a digitar/escolher
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

    // Ponto de integração com backend — ver comentário no topo do arquivo.
    console.log('Solicitação preenchida (exemplo, sem envio real):', {
      nome: nome.value.trim(), contato: contato.value.trim(), setor: setor.value, mensagem: mensagem.value.trim()
    });

    status.classList.remove('show');
    form.classList.add('hidden');
    if (successPanel) {
      successPanel.querySelector('[data-setor-nome]').textContent = setorTexto;
      successPanel.classList.add('visible');
      successPanel.setAttribute('tabindex', '-1');
      successPanel.focus();
    }
  });
});
