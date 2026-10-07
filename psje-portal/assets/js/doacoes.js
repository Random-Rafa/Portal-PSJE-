// Portal PSJE — página de doações
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('copyPix');
  var keyEl = document.getElementById('pixKey');
  if (!btn || !keyEl) return;

  var original = btn.innerHTML;

  function showResult(success) {
    btn.innerHTML = success
      ? '<svg class="icon icon-14"><use href="#i-check-circle"/></svg> Copiada!'
      : '<svg class="icon icon-14"><use href="#i-alert-circle"/></svg> Selecione e copie manualmente';
    setTimeout(function () { btn.innerHTML = original; }, success ? 1800 : 2600);
  }

  // Fallback manual para quando a Clipboard API não está disponível
  // (comum ao abrir o arquivo direto via file://, sem servidor).
  function copyFallback(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  btn.addEventListener('click', function () {
    var text = keyEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function () { showResult(true); })
        .catch(function () { showResult(copyFallback(text)); });
    } else {
      showResult(copyFallback(text));
    }
  });
});
