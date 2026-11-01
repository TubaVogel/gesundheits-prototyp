(() => {
  'use strict';
  const testing = new URLSearchParams(location.search).get('entry-test') === '1';
  const KEY = testing ? 'health-vaccine-entry-test-v1' : 'gesundheits-prototyp-vaccinations-v1';
  const profileId = () => {
    try { return String(JSON.parse(localStorage.getItem('health-profile-v1'))?.active || 0); }
    catch { return '0'; }
  };
  const birthKey = () => 'health-birth-date-v1-' + (testing ? 'test-' : '') + profileId();
  function isoDate(value) {
    const s = String(value || '');
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
    const iso = m ? `${m[3]}-${m[2]}-${m[1]}` : s;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
    const d = new Date(iso + 'T12:00:00Z');
    return !isNaN(d) && d.toISOString().slice(0, 10) === iso ? iso : null;
  }
  const today = () => new Date().toLocaleDateString('sv-SE');
  function issue(item) {
    const date = isoDate(item.date);
    // Preserve the erroneous legacy import for correction, without guessing a replacement.
    if (/bcg|tuberkulose/i.test(item.name || '') && /1983/.test(item.date || '')) return 'Datum aus altem Import unplausibel. Bitte am Original prüfen.';
    const birth = localStorage.getItem(birthKey());
    if (birth && ((date && date < birth) || (/^\d{4}$/.test(item.date) && item.date < birth.slice(0, 4)))) return 'Das Impfdatum liegt vor dem Geburtsdatum.';
    if (date && date > today()) return 'Das Impfdatum liegt in der Zukunft.';
    return '';
  }
  window.vaccineEntryIssue = issue;
  const read = () => { const a = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(a)) throw Error('Speicherformat nicht lesbar'); return a; };
  const save = items => localStorage.setItem(KEY, JSON.stringify(items));
  const el = (tag, text, cls) => { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; };
  function button(text, fn, cls = 'action-btn') { const b = el('button', text, cls); b.type = 'button'; b.onclick = fn; return b; }
  let dbPromise;
  function db() {
    return dbPromise ||= new Promise((resolve, reject) => {
      const r = indexedDB.open(testing ? 'health-vaccine-photos-test' : 'health-vaccine-photos', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('photos');
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => { dbPromise = null; reject(r.error); };
    });
  }
  async function photoStore(mode, id, value) {
    const database = await db();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('photos', mode);
      const store = tx.objectStore('photos');
      const request = mode === 'readonly' ? store.get(id) : store.put(value, id);
      let result;
      request.onsuccess = () => { result = request.result; };
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || Error('Speicherung abgebrochen'));
    });
  }
  let workerPromise;
  async function worker(status) {
    if (!window.Tesseract) await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
      s.onload = resolve; s.onerror = reject; document.head.append(s);
    });
    if (!workerPromise) workerPromise = window.Tesseract.createWorker('deu', 1, {
      workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js',
      logger: m => { if (m.status === 'recognizing text') status.textContent = `Text wird gelesen: ${Math.round(m.progress * 100)} %`; }
    }).catch(e => { workerPromise = null; throw e; });
    return workerPromise;
  }
  function candidates(text) {
    const names = ['Boostrix', 'TYPHIM Vi', 'Stamaril', 'Rabipur', 'Gardasil 9', 'Engerix-B', 'Havrix', 'VAQTA', 'Prevenar 20', 'Comirnaty', 'Tetanus', 'Hepatitis A', 'Hepatitis B', 'MMR', 'BCG'];
    return {
      names: names.filter(n => text.toLowerCase().includes(n.toLowerCase())),
      dates: [...new Set((text.match(/\b\d{2}[.\/-]\d{2}[.\/-]\d{4}\b/g) || []).map(d => isoDate(d.replace(/[\/-]/g, '.'))).filter(Boolean))]
    };
  }
  function editor(existing = null, useCamera = false) {
    const dialog = el('dialog', '', 'vaccine-editor');
    const form = el('form');
    form.append(el('h2', existing ? 'Impfung bearbeiten' : 'Impfung hinzufügen'));
    let photo = null, previewUrl = null, busy = false;
    const error = el('p', '', 'entry-error'); error.setAttribute('role', 'alert');
    function field(label, type, value = '', required = false) {
      const wrap = el('label', label, 'entry-label'); const input = el('input', '', 'field');
      input.type = type; input.value = value; input.required = required; wrap.append(input); form.append(wrap); return input;
    }
    const name = field('Impfung / Impfstoff', 'text', existing?.name || '', true); name.maxLength = 200;
    const date = field('Impfdatum', 'date', isoDate(existing?.date) || '', true); date.max = today();
    const birth = field('Geburtsdatum für Datumsprüfung', 'date', localStorage.getItem(birthKey()) || '', true); birth.max = today();
    if (birth.value) date.min = birth.value;
    birth.onchange = () => { date.min = birth.value; };
    const batch = field('Charge (optional)', 'text', existing?.batch || ''); batch.maxLength = 100;
    const note = field('Notiz (optional)', 'text', existing?.note || ''); note.maxLength = 1000;
    const camera = el('input'); camera.type = 'file'; camera.accept = 'image/*'; camera.setAttribute('capture', 'environment'); camera.hidden = true;
    const picker = el('input'); picker.type = 'file'; picker.accept = 'image/*'; picker.hidden = true;
    const actions = el('div', '', 'import-actions');
    actions.append(button('Foto aufnehmen', () => camera.click(), 'action-btn secondary'), button('Foto auswählen', () => picker.click(), 'action-btn secondary'));
    const image = el('img', '', 'entry-preview'); image.alt = 'Foto des Impfeintrags'; image.hidden = true;
    const status = el('p', '', 'reminder'); status.setAttribute('role', 'status');
    const recognize = button('Text aus Foto lesen', async () => {
      if (!photo || busy) return;
      busy = true; recognize.disabled = true; status.textContent = 'Texterkennung wird geladen …';
      try {
        const w = await worker(status); const result = await w.recognize(photo);
        const found = candidates(result.data.text);
        if (!name.value && found.names.length === 1) name.value = found.names[0];
        if (!date.value && found.dates.length === 1) date.value = found.dates[0];
        text.value = result.data.text; text.hidden = false;
        status.textContent = 'Erkannte Angaben bitte mit dem Foto vergleichen und ergänzen. Mehrere Datumsangaben werden nicht automatisch zugeordnet.';
      } catch { status.textContent = 'Texterkennung nicht verfügbar. Bitte die Angaben vom Foto in die Felder übertragen.'; }
      finally { busy = false; recognize.disabled = false; }
    }, 'action-btn secondary'); recognize.hidden = true;
    const text = el('textarea', '', 'field'); text.readOnly = true; text.hidden = true; text.setAttribute('aria-label', 'Erkannter Text');
    async function selected(input) {
      const f = input.files?.[0]; if (!f) return;
      if (f.size > 20 * 1024 * 1024) { error.textContent = 'Bitte ein Foto unter 20 MB auswählen.'; return; }
      if (!f.type.startsWith('image/')) { error.textContent = 'Bitte eine Bilddatei auswählen.'; return; }
      photo = f; error.textContent = ''; if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(f); image.src = previewUrl; image.hidden = false; recognize.hidden = false;
      status.textContent = 'Foto bleibt auf diesem Gerät. Angaben prüfen und dann speichern.';
    }
    camera.onchange = () => selected(camera); picker.onchange = () => selected(picker);
    form.append(actions, camera, picker, image, recognize, text, status);
    const checkedLabel = el('label', '', 'entry-confirm'); const checked = el('input'); checked.type = 'checkbox'; checked.required = true;
    checkedLabel.append(checked, document.createTextNode(' Impfstoff und Datum geprüft')); form.append(checkedLabel, error);
    const footer = el('div', '', 'import-actions');
    const submit = el('button', 'Speichern', 'action-btn'); submit.type = 'submit';
    footer.append(button('Abbrechen', () => dialog.close(), 'action-btn secondary'), submit); form.append(footer);
    form.onsubmit = async e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      error.textContent = '';
      const iso = isoDate(date.value);
      if (!iso || iso > today() || (birth.value && iso < birth.value)) { error.textContent = 'Bitte ein gültiges Impfdatum ab dem Geburtsdatum und bis heute eingeben.'; return; }
      if (!name.value.trim()) { error.textContent = 'Bitte den Impfstoff eintragen.'; return; }
      const record = {...(existing || {}), id: existing?.id || crypto.randomUUID(), name: name.value.trim(), date: iso.split('-').reverse().join('.'), batch: batch.value.trim(), note: note.value.trim(), entryMethod: photo ? 'photo-confirmed' : (existing?.entryMethod || 'manual'), reviewRequired: false};
      if (/bcg|tuberkulose/i.test(record.name) && /1983/.test(record.date)) { error.textContent = 'Dieser alte Import ist unplausibel. Bitte das Datum am Original prüfen.'; return; }
      submit.disabled = true;
      try {
        const all = read();
        if (all.some(x => x.id !== existing?.id && x.name.toLowerCase() === record.name.toLowerCase() && x.date === record.date)) { error.textContent = 'Diese Impfung mit diesem Datum ist bereits gespeichert.'; return; }
        if (photo) { record.photoId = crypto.randomUUID(); await photoStore('readwrite', record.photoId, photo); }
        const index = existing ? all.findIndex(x => x.id === existing.id) : -1;
        if (existing && index === -1) throw Error('Eintrag wurde inzwischen verändert');
        if (index >= 0) all[index] = record; else all.push(record);
        save(all);
        if (birth.value) localStorage.setItem(birthKey(), birth.value);
        dialog.close(); location.reload();
      } catch { error.textContent = 'Speichern fehlgeschlagen. Bitte Speicherzugriff prüfen. Deine bisherigen Einträge bleiben erhalten.'; }
      finally { submit.disabled = false; }
    };
    dialog.append(form); document.body.append(dialog);
    dialog.onclose = () => { if (previewUrl) URL.revokeObjectURL(previewUrl); dialog.remove(); };
    dialog.showModal(); name.focus(); if (useCamera) camera.click();
  }
  async function showPhoto(id) {
    try {
      const blob = await photoStore('readonly', id); if (!blob) throw Error();
      const url = URL.createObjectURL(blob); const dialog = el('dialog', '', 'vaccine-editor'); const img = el('img', '', 'entry-preview');
      img.src = url; img.alt = 'Gespeichertes Impffoto'; dialog.append(img, button('Schließen', () => dialog.close()));
      dialog.onclose = () => { URL.revokeObjectURL(url); dialog.remove(); }; document.body.append(dialog); dialog.showModal();
    } catch { alert('Dieses Foto ist auf diesem Gerät nicht verfügbar.'); }
  }
  function boot() {
    if (new URLSearchParams(location.search).get('view') !== 'impfausweis') return;
    const content = document.getElementById('content'); if (!content) return;
    const tools = el('div', '', 'import-actions vaccine-entry-actions');
    tools.append(button('+ Impfung hinzufügen', () => editor()), button('Foto aufnehmen', () => editor(null, true), 'action-btn secondary'));
    content.prepend(tools);
    let all; try { all = read(); } catch { content.append(el('p', 'Impfspeicher konnte nicht gelesen werden.', 'entry-error')); return; }
    const invalid = all.filter(issue);
    if (invalid.length) {
      const section = el('section', '', 'card entry-review'); section.append(el('b', 'Datum prüfen'));
      invalid.forEach(item => { const row = el('div'); row.append(el('p', `${item.name} · ${item.date}`), el('p', issue(item)), button('Datum korrigieren', () => editor(item), 'action-btn secondary')); section.append(row); });
      tools.after(section);
    }
    content.querySelectorAll('.vaccine-card').forEach(card => {
      const name = card.querySelector('b')?.textContent; const date = card.querySelector('span')?.textContent;
      const record = all.find(x => x.name === name && x.date === date); if (!record) return;
      const actions = el('div', '', 'import-actions'); actions.append(button('Bearbeiten', () => editor(record), 'link-action entry-text-button'));
      if (record.photoId) actions.append(button('Foto ansehen', () => showPhoto(record.photoId), 'link-action entry-text-button'));
      card.append(actions);
    });
  }
  window.vaccineEntryInternals = {isoDate, issue, candidates};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once: true}); else boot();
})();
