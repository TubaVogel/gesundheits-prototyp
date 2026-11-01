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
    if (!item.entryMethod && /bcg|tuberkulose/i.test(item.name || '') && /1983/.test(item.date || '')) return 'Datum aus altem Import unplausibel. Bitte am Original prüfen.';
    const birth = localStorage.getItem(birthKey());
    if (birth && ((date && date < birth) || (/^\d{4}$/.test(item.date) && item.date < birth.slice(0, 4)))) return 'Das Impfdatum liegt vor dem Geburtsdatum.';
    if (date && date > today()) return 'Das Impfdatum liegt in der Zukunft.';
    return '';
  }
  window.vaccineEntryIssue = issue;
  const read = () => { const a = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(a)) throw Error('Speicherformat nicht lesbar'); return a; };
  const save = items => localStorage.setItem(KEY, JSON.stringify(items));
  function applyPrivateUpdate() {
    const hash = new URLSearchParams(location.hash.slice(1));
    const code = hash.get('update'); if (!code) return;
    try {
      const binary = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
      const update = JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, c => c.charCodeAt(0))));
      if (update.version !== 1 || !Array.isArray(update.upsert) || !Array.isArray(update.corrections)) throw Error();
      if (update.birthDate && (!isoDate(update.birthDate) || update.birthDate > today())) throw Error();
      const all = read();
      for (const correction of update.corrections) {
        if (!isoDate(correction.date)) throw Error();
        for (const item of all) {
          if (item.name === correction.name && item.date === correction.oldDate) {
            item.date = correction.date.split('-').reverse().join('.');
            item.entryMethod = 'photo-reviewed'; item.reviewRequired = false;
          }
        }
      }
      for (const record of update.upsert) {
        if (typeof record.name !== 'string' || !record.name.trim() || !isoDate(record.date) || record.date > today()) throw Error();
        const date = record.date.split('-').reverse().join('.');
        const existing = all.find(x => x.id === record.id || (x.name === record.name && x.date === date));
        const item = {id:record.id || crypto.randomUUID(), name:record.name, date, batch: String(record.batch || ''), note: String(record.note || ''), entryMethod:'photo-reviewed'};
        if (existing) Object.assign(existing, item); else all.push(item);
      }
      save(all);
      if (update.birthDate) localStorage.setItem(birthKey(), update.birthDate);
      history.replaceState(null, '', location.pathname + location.search);
    } catch { window.vaccineUpdateError = 'Die private Aktualisierung konnte nicht übernommen werden. Bestehende Daten wurden nicht ersetzt.'; }
  }
  applyPrivateUpdate();
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
    const names = ['Influvac', 'Vaxigrip', 'Efluelda', 'Fluad', 'Flucelvax', 'Boostrix', 'TYPHIM Vi', 'Stamaril', 'Rabipur', 'Gardasil 9', 'Engerix-B', 'Havrix', 'VAQTA', 'Prevenar 20', 'Comirnaty', 'Tetanus', 'Hepatitis A', 'Hepatitis B', 'MMR', 'BCG'];
    const normalized = text.replace(/In[fl1I|]+uvac/gi, 'Influvac');
    const dates = [...text.matchAll(/\b(\d{1,2})\s*[.\/-]\s*(\d{1,2})\s*[.\/-]\s*(\d{4}|\d{2})\b/g)].map(m => {
      const year = m[3].length === 4 ? m[3] : (Number(m[3]) <= Number(today().slice(2,4)) ? '20' : '19') + m[3];
      return isoDate(`${m[1].padStart(2,'0')}.${m[2].padStart(2,'0')}.${year}`);
    }).filter(Boolean);
    return {
      names: names.filter(n => normalized.toLowerCase().includes(n.toLowerCase())),
      dates: [...new Set(dates)],
      batch: (()=>{const match=text.match(/(?:\bCh\.?\s*[-.]?\s*B\.?|\bCharge\b|\bLot\b)\s*[:.]?\s*([A-Z0-9-]{3,20})\b/i);return match && /\d/.test(match[1])?match[1]:'';})()
    };
  }
  function defaultCrop(img) {
    const canvas = document.createElement('canvas'); canvas.width = 180; canvas.height = Math.round(img.naturalHeight * 180 / img.naturalWidth);
    const c = canvas.getContext('2d'); c.drawImage(img,0,0,canvas.width,canvas.height);
    const pixels = c.getImageData(0,0,canvas.width,canvas.height).data;
    let x0=canvas.width,y0=canvas.height,x1=0,y1=0,count=0;
    for(let y=0;y<canvas.height;y++) for(let x=0;x<canvas.width;x++) {
      const i=(y*canvas.width+x)*4, r=pixels[i],g=pixels[i+1],b=pixels[i+2];
      if(r>100 && g>65 && r>b*1.45 && g>b*1.2 && r>g*.9 && r<g*2.1){x0=Math.min(x,x0);x1=Math.max(x,x1);y0=Math.min(y,y0);y1=Math.max(y,y1);count++;}
    }
    return count/(canvas.width*canvas.height)>.06 ? {x:x0/canvas.width,y:y0/canvas.height,w:(x1-x0+1)/canvas.width,h:(y1-y0+1)/canvas.height} : {x:0,y:0,w:1,h:1};
  }
  function preparePhoto(img, crop, threshold=false) {
    const out=document.createElement('canvas');
    const scale=Math.min(3,2200/Math.max(img.naturalWidth*crop.w,img.naturalHeight*crop.h));
    out.width=Math.round(img.naturalWidth*crop.w*scale); out.height=Math.round(img.naturalHeight*crop.h*scale);
    const c=out.getContext('2d',{willReadFrequently:true}); c.fillStyle='#fff';c.fillRect(0,0,out.width,out.height);
    c.drawImage(img,img.naturalWidth*crop.x,img.naturalHeight*crop.y,img.naturalWidth*crop.w,img.naturalHeight*crop.h,0,0,out.width,out.height);
    const data=c.getImageData(0,0,out.width,out.height),hist=new Uint32Array(256);
    for(let i=0;i<data.data.length;i+=4){ const v=Math.round(.3*data.data[i]+.59*data.data[i+1]+.11*data.data[i+2]);hist[v]++; }
    const total=out.width*out.height;let sum=0,lo=0,hi=255;
    for(let i=0;i<256;i++){sum+=hist[i];if(sum>total*.02){lo=i;break;}}
    sum=0;for(let i=255;i>=0;i--){sum+=hist[i];if(sum>total*.02){hi=i;break;}}
    for(let i=0;i<data.data.length;i+=4){const v=(.3*data.data[i]+.59*data.data[i+1]+.11*data.data[i+2]-lo)*255/Math.max(1,hi-lo);const value=threshold?(v>135?255:0):v;data.data[i]=data.data[i+1]=data.data[i+2]=value;}
    c.putImageData(data,0,0); return out;
  }
  function editor(existing = null, useCamera = false) {
    const dialog = el('dialog', '', 'vaccine-editor');
    const form = el('form');
    form.append(el('h2', existing ? 'Impfung bearbeiten' : 'Impfung hinzufügen'));
    let photo = null, previewUrl = null, busy = false, crop={x:0,y:0,w:1,h:1},start=null;
    let cropChosen=false, cropReady=false, croppedPhoto=null;
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
    const cropCanvas=el('canvas','','entry-crop');cropCanvas.hidden=true;cropCanvas.setAttribute('aria-label','Fotoausschnitt durch Ziehen auswählen');
    const cropNote=el('p','Nur eine Impfzeile markieren: Datum und Impfstoff-Aufkleber müssen im Rahmen liegen.','reminder');cropNote.hidden=true;
    const cropPreview=el('img','','entry-preview');cropPreview.alt='Dieser Ausschnitt wird ausgelesen und gespeichert';cropPreview.hidden=true;
    const previewLabel=el('b','Dieser Ausschnitt wird ausgelesen');previewLabel.hidden=true;
    function drawCrop(){
      const c=cropCanvas.getContext('2d');c.drawImage(image,0,0,cropCanvas.width,cropCanvas.height);
      c.fillStyle='rgba(0,0,0,.45)';c.fillRect(0,0,cropCanvas.width,cropCanvas.height);
      if(!cropChosen)return;
      c.save();c.beginPath();c.rect(crop.x*cropCanvas.width,crop.y*cropCanvas.height,crop.w*cropCanvas.width,crop.h*cropCanvas.height);c.clip();c.drawImage(image,0,0,cropCanvas.width,cropCanvas.height);c.restore();
      c.strokeStyle='#00dfbd';c.lineWidth=3;c.strokeRect(crop.x*cropCanvas.width,crop.y*cropCanvas.height,crop.w*cropCanvas.width,crop.h*cropCanvas.height);
    }
    const point=e=>{const r=cropCanvas.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))};};
    function invalidateCrop(){cropReady=false;croppedPhoto=null;recognize.disabled=true;cropPreview.hidden=true;previewLabel.hidden=true;suggestions.replaceChildren();checked.checked=false;}
    function finishSelection(){start=null;cropChosen=crop.w>=.03&&crop.h>=.03;confirmCrop.disabled=!cropChosen;if(cropChosen){ranges.left.value=Math.round(crop.x*100);ranges.top.value=Math.round(crop.y*100);ranges.right.value=Math.round((crop.x+crop.w)*100);ranges.bottom.value=Math.round((crop.y+crop.h)*100);}drawCrop();}
    cropCanvas.onpointerdown=e=>{if(busy)return;invalidateCrop();start=point(e);cropChosen=true;cropCanvas.setPointerCapture(e.pointerId);};
    cropCanvas.onpointermove=e=>{if(!start)return;const p=point(e);crop={x:Math.min(start.x,p.x),y:Math.min(start.y,p.y),w:Math.abs(start.x-p.x),h:Math.abs(start.y-p.y)};drawCrop();};
    cropCanvas.onpointerup=finishSelection;cropCanvas.onpointercancel=finishSelection;
    const resetCrop=button('Ausschnitt ändern',()=>{if(busy)return;invalidateCrop();cropCanvas.hidden=false;cropNote.hidden=false;confirmCrop.hidden=false;adjust.hidden=false;resetCrop.hidden=true;},'action-btn secondary');resetCrop.hidden=true;
    const adjust=el('details');adjust.hidden=true;adjust.append(el('summary','Ausschnitt genau einstellen'));
    const ranges={};
    for(const [key,label,value] of [['left','Links',0],['top','Oben',0],['right','Rechts',100],['bottom','Unten',100]]){
      const wrap=el('label',label,'entry-label');const input=el('input');input.type='range';input.min='0';input.max='100';input.value=value;input.step='1';ranges[key]=input;wrap.append(input);adjust.append(wrap);
      input.oninput=()=>{if(busy)return;invalidateCrop();const l=Number(ranges.left.value)/100,t=Number(ranges.top.value)/100,r=Number(ranges.right.value)/100,b=Number(ranges.bottom.value)/100;crop={x:l,y:t,w:r-l,h:b-t};finishSelection();};
    }
    const confirmCrop=button('Ausschnitt übernehmen',async()=>{
      if(busy||!cropChosen)return;confirmCrop.disabled=true;
      try{
        const canvas=document.createElement('canvas');const scale=Math.min(1,1800/(image.naturalWidth*crop.w));
        canvas.width=Math.round(image.naturalWidth*crop.w*scale);canvas.height=Math.round(image.naturalHeight*crop.h*scale);
        canvas.getContext('2d').drawImage(image,image.naturalWidth*crop.x,image.naturalHeight*crop.y,image.naturalWidth*crop.w,image.naturalHeight*crop.h,0,0,canvas.width,canvas.height);
        croppedPhoto=await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error()),'image/jpeg',.94));
        cropPreview.src=canvas.toDataURL('image/jpeg',.94);cropPreview.hidden=false;previewLabel.hidden=false;
        cropReady=true;cropCanvas.hidden=true;cropNote.hidden=true;adjust.hidden=true;confirmCrop.hidden=true;resetCrop.hidden=false;recognize.disabled=false;
        status.textContent='Nur dieser Ausschnitt wird ausgelesen und als Foto gespeichert.';
      }catch{error.textContent='Der Ausschnitt konnte nicht übernommen werden. Bitte erneut markieren.';}
      finally{confirmCrop.disabled=false;}
    },'action-btn secondary');confirmCrop.hidden=true;confirmCrop.disabled=true;
    const suggestions=el('div','','entry-suggestions');suggestions.setAttribute('aria-live','polite');
    const status = el('p', '', 'reminder'); status.setAttribute('role', 'status');
    const recognize = button('Text aus Foto lesen', async () => {
      if (!photo || busy || !cropReady) return;
      busy = true; recognize.disabled = true; status.textContent = 'Texterkennung wird geladen …';
      try {
        const w = await worker(status);await w.setParameters({tessedit_pageseg_mode:'11'});
        const first=await w.recognize(preparePhoto(image,crop));
        let recognized=first.data.text;let found=candidates(recognized);
        if(!found.names.length){await w.setParameters({tessedit_pageseg_mode:'6'});const second=await w.recognize(preparePhoto(image,crop,true));recognized+='\n'+second.data.text;found=candidates(recognized);}
        suggestions.replaceChildren();
        found.names.forEach(n=>suggestions.append(button('Impfstoff: '+n,()=>{name.value=n;},'action-btn secondary')));
        found.dates.forEach(d=>suggestions.append(button('Datum: '+d.split('-').reverse().join('.'),()=>{date.value=d;},'action-btn secondary')));
        if(found.batch)suggestions.append(button('Charge: '+found.batch,()=>{batch.value=found.batch;},'action-btn secondary'));
        if(!name.value && found.names.length===1) name.value=found.names[0];
        if(!batch.value && found.batch) batch.value=found.batch;
        text.value=recognized; text.hidden=true;
        status.textContent=found.names.length||found.dates.length?'Vorschläge bitte mit dem Foto abgleichen. Handschriftliche Daten und Jahreszahlen selbst bestätigen.':'Kein verlässlicher Impfstoff oder Datum erkannt. Bitte den Ausschnitt enger wählen oder die Angaben vom Foto übertragen.';
      } catch { status.textContent = 'Texterkennung nicht verfügbar. Bitte die Angaben vom Foto in die Felder übertragen.'; }
      finally { busy = false; recognize.disabled = !cropReady; }
    }, 'action-btn secondary'); recognize.hidden = true;
    const text = el('textarea', '', 'field'); text.readOnly = true; text.hidden = true; text.setAttribute('aria-label', 'Erkannter Text');
    async function selected(input) {
      const f = input.files?.[0]; if (!f) return;
      if (f.size > 20 * 1024 * 1024) { error.textContent = 'Bitte ein Foto unter 20 MB auswählen.'; return; }
      if (!f.type.startsWith('image/')) { error.textContent = 'Bitte eine Bilddatei auswählen.'; return; }
      if(busy){error.textContent='Bitte warten, bis die laufende Erkennung beendet ist.';return;}
      photo = f; error.textContent = ''; invalidateCrop(); cropChosen=false; if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(f);
      image.onload=()=>{crop={x:0,y:0,w:1,h:1};cropCanvas.width=700;cropCanvas.height=Math.round(image.naturalHeight*700/image.naturalWidth);cropCanvas.hidden=false;cropNote.hidden=false;resetCrop.hidden=true;confirmCrop.hidden=false;confirmCrop.disabled=true;adjust.hidden=false;recognize.hidden=false;drawCrop();};
      image.onerror=()=>{error.textContent='Dieses Bildformat kann hier nicht gelesen werden. Bitte als JPEG oder PNG auswählen.';recognize.hidden=true;};
      image.src = previewUrl;
      status.textContent = 'Bitte zuerst die einzelne Impfzeile markieren und den Ausschnitt übernehmen.';
    }
    camera.onchange = () => selected(camera); picker.onchange = () => selected(picker);
    const photoSection=el('section','','entry-photo-section');
    photoSection.append(actions,camera,picker,image,cropNote,cropCanvas,adjust,confirmCrop,previewLabel,cropPreview,resetCrop,recognize,suggestions,text,status);
    const photoHint=el('p','Datum und Impfstoff möglichst nah fotografieren.','reminder');photoSection.prepend(photoHint);
    form.insertBefore(photoSection,name.parentElement);
    const checkedLabel = el('label', '', 'entry-confirm'); const checked = el('input'); checked.type = 'checkbox'; checked.required = true;
    checkedLabel.append(checked, document.createTextNode(' Impfstoff und Datum geprüft')); form.append(checkedLabel, error);
    const footer = el('div', '', 'import-actions');
    const submit = el('button', 'Speichern', 'action-btn'); submit.type = 'submit';
    footer.append(button('Abbrechen', () => dialog.close(), 'action-btn secondary'), submit); form.append(footer);
    form.onsubmit = async e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      error.textContent = '';
      if(photo&&!cropReady){error.textContent='Bitte zuerst den Fotoausschnitt übernehmen.';return;}
      const iso = isoDate(date.value);
      if (!iso || iso > today() || (birth.value && iso < birth.value)) { error.textContent = 'Bitte ein gültiges Impfdatum ab dem Geburtsdatum und bis heute eingeben.'; return; }
      if (!name.value.trim()) { error.textContent = 'Bitte den Impfstoff eintragen.'; return; }
      const record = {...(existing || {}), id: existing?.id || crypto.randomUUID(), name: name.value.trim(), date: iso.split('-').reverse().join('.'), batch: batch.value.trim(), note: note.value.trim(), entryMethod: photo ? 'photo-confirmed' : (existing?.entryMethod || 'manual'), reviewRequired: false};
      submit.disabled = true;
      try {
        const all = read();
        if (all.some(x => x.id !== existing?.id && x.name.toLowerCase() === record.name.toLowerCase() && x.date === record.date)) { error.textContent = 'Diese Impfung mit diesem Datum ist bereits gespeichert.'; return; }
        if (photo) { record.photoId = crypto.randomUUID(); await photoStore('readwrite', record.photoId, croppedPhoto); }
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
    if(window.vaccineUpdateError)content.prepend(el('p',window.vaccineUpdateError,'entry-error'));
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
