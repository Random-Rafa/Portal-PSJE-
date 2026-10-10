// Portal PSJE — página de eventos
document.addEventListener('DOMContentLoaded', function () {

  var STORAGE_KEY = 'psje_events';
  var ADMIN_KEY = 'psje_admin';
  var CAT_LABEL = { missa: 'Missa especial', celebracao: 'Celebração', pastoral: 'Pastoral e grupos' };
  var MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

  // Eventos de exemplo — substituir pelos eventos reais da paróquia.
  var SEED_EVENTS = [
    { id: 'e1', title: 'Encontro de Casais', category: 'pastoral', date: '2026-10-11', time: '16:00', location: 'Salão paroquial', desc: 'Encontro mensal do grupo de casais, com partilha e lanche comunitário.' },
    { id: 'e2', title: 'Retiro da Pastoral da Família', category: 'pastoral', date: '2026-10-25', time: '08:00', location: 'Casa de retiros', desc: 'Fim de semana de retiro para casais e famílias. Inscrições na secretaria.' },
    { id: 'e3', title: 'Missa em ação de graças', category: 'celebracao', date: '2026-11-15', time: '19:00', location: 'Igreja matriz', desc: 'Celebração especial de ação de graças pela comunidade, seguida de confraternização.' },
    { id: 'e4', title: 'Novena de Natal', category: 'celebracao', date: '2026-12-16', time: '19:30', location: 'Igreja matriz', desc: 'Início da novena preparatória para o Natal, com celebração diária às 19h30.' },
    { id: 'e5', title: 'Festa de São João Evangelista', category: 'celebracao', date: '2026-12-27', time: '10:00', location: 'Igreja matriz e área externa', desc: 'Festa do padroeiro da paróquia, com missa solene e celebração comunitária.' },
    { id: 'e6', title: 'Terço dos Homens', category: 'missa', date: '2026-10-06', time: '20:00', location: 'Capela do Santíssimo', desc: 'Grupo de oração masculino, aberto a todos os homens da comunidade.' }
  ];

  function loadEvents() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* dados corrompidos: reinicia com os exemplos */ }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_EVENTS));
    return SEED_EVENTS.slice();
  }
  function saveEvents(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
  function isAdmin() { return localStorage.getItem(ADMIN_KEY) === '1'; }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function formatBadge(iso) {
    var parts = iso.split('-').map(Number);
    return { day: String(parts[2]).padStart(2, '0'), month: MONTHS[parts[1] - 1] || '' };
  }

  var events = loadEvents();
  var activeFilter = 'todos';

  var listEl = document.getElementById('eventList');
  var adminPanel = document.getElementById('adminPanel');
  var guestNote = document.getElementById('guestNote');

  function renderAuthArea() {
    if (!adminPanel || !guestNote) return;
    if (isAdmin()) { adminPanel.style.display = 'block'; guestNote.style.display = 'none'; }
    else { adminPanel.style.display = 'none'; guestNote.style.display = 'flex'; }
  }

  function render() {
    if (!listEl) return;
    events.sort(function (a, b) { return a.date.localeCompare(b.date); });
    var filtered = activeFilter === 'todos' ? events : events.filter(function (e) { return e.category === activeFilter; });

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="empty-state">Nenhum evento encontrado nesta categoria no momento.</div>';
      return;
    }

    // Todo conteúdo vindo de dados (título, local, descrição) passa por
    // escapeHtml antes de entrar no innerHTML — evita que um texto com
    // < ou > vire HTML/script executado na página.
    listEl.innerHTML = filtered.map(function (e) {
      var badge = formatBadge(e.date);
      var adminBtns = isAdmin()
        ? '<div class="event-admin-row"><button class="btn-danger-text" data-del="' + e.id + '" type="button"><svg class="icon icon-14"><use href="#i-trash"/></svg> Remover evento</button></div>'
        : '';
      return '' +
        '<div class="event-card">' +
        '  <div class="event-date"><span class="day">' + badge.day + '</span><span class="month">' + badge.month + '</span></div>' +
        '  <div class="event-body">' +
        '    <div class="event-cat">' + (CAT_LABEL[e.category] || e.category) + '</div>' +
        '    <div class="event-title">' + escapeHtml(e.title) + '</div>' +
        '    <div class="event-meta">' +
        '      <span><svg class="icon icon-14"><use href="#i-clock"/></svg>' + escapeHtml(e.time) + '</span>' +
        '      <span><svg class="icon icon-14"><use href="#i-pin"/></svg>' + escapeHtml(e.location) + '</span>' +
        '    </div>' +
        '    <div class="event-desc">' + escapeHtml(e.desc) + '</div>' +
        adminBtns +
        '  </div>' +
        '</div>';
    }).join('');

    listEl.querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var alvo = events.find(function (e) { return String(e.id) === btn.dataset.del; });
        var titulo = alvo ? alvo.title : 'este evento';
        // Confirmação antes de apagar — ação irreversível.
        if (!window.confirm('Remover "' + titulo + '" da agenda? Essa ação não pode ser desfeita.')) return;
        events = events.filter(function (e) { return String(e.id) !== btn.dataset.del; });
        saveEvents(events);
        render();
      });
    });
  }

  var filterRow = document.getElementById('eventFilterRow');
  if (filterRow) {
    filterRow.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.filter-btn');
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      filterRow.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      render();
    });
  }

  var addForm = document.getElementById('addEventForm');
  if (addForm) {
    addForm.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () { el.closest('.field').classList.remove('has-error'); });
    });

    addForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var title = document.getElementById('evtTitle');
      var category = document.getElementById('evtCategory');
      var date = document.getElementById('evtDate');
      var time = document.getElementById('evtTime');
      var location = document.getElementById('evtLocation');
      var desc = document.getElementById('evtDesc');
      var statusBox = document.getElementById('adminFormStatus');
      var submitBtn = addForm.querySelector('button[type="submit"]');

      var valid = true;
      [title, date, time, location, desc].forEach(function (field) {
        var wrapper = field.closest('.field');
        var ok = field.value.trim() !== '';
        wrapper.classList.toggle('has-error', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        statusBox.className = 'form-status error show';
        statusBox.innerHTML = '<svg class="icon"><use href="#i-alert-circle"/></svg><span>Preencha todos os campos obrigatórios destacados antes de publicar.</span>';
        return;
      }

      var originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Publicando…';

      events.push({
        id: Date.now(),
        title: title.value.trim(),
        category: category.value,
        date: date.value,
        time: time.value,
        location: location.value.trim(),
        desc: desc.value.trim()
      });
      saveEvents(events);
      addForm.reset();
      category.value = 'pastoral';

      statusBox.className = 'form-status success show';
      statusBox.innerHTML = '<svg class="icon"><use href="#i-check-circle"/></svg><span>Evento publicado com sucesso na agenda da paróquia.</span>';
      render();

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
        statusBox.classList.remove('show');
      }, 1400);
    });
  }

  var logoutBtn = document.getElementById('logoutBtnEvt');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem(ADMIN_KEY);
      renderAuthArea();
      render();
    });
  }

  renderAuthArea();
  render();
});
