(() => {
  'use strict';
  const api=window.vaccineBatchAPI;
  if(!api)return;
  const {el,button,editor,photoStore,read,save,isoDate,today,duplicateOf,profileId,birthKey,pilot,testing}=api;
  const draftKey=()=>`health-vaccine-batch-v1-${pilot?'pilot':testing?'test':'main'}-${profileId()}`;
  const newDraft=()=>({version:1,profileId:profileId(),birthDate:localStorage.getItem(birthKey())||'',pages:[],entries:[]});
  function loadDraft(){
    const stored=localStorage.getItem(draftKey());if(!stored)return newDraft();
    const value=JSON.parse(stored);
    if(value.version!==1||value.profileId!==profileId()||!Array.isArray(value.pages)||!Array.isArray(value.entries))throw Error('Importformat');
    return value;
  }
  function rowProblem(record,birth){
    const date=isoDate(record.date);
    if(!record.name?.trim())return 'Impfung ergänzen';
    if(!date)return 'Vollständiges Impfdatum ergänzen';
    if(!isoDate(birth)||birth>today())return 'Geburtsdatum ergänzen';
    if(date<birth)return 'Impfdatum liegt vor dem Geburtsdatum';
    if(date>today())return 'Impfdatum liegt in der Zukunft';
    return '';
  }
  function planBatch(entries,existing,birth,profile){
    const seen=existing.slice();
    return entries.map(entry=>{
      const record={...entry.record,profileId:String(profile)};
      if(entry.imported)return {entry,record,status:'imported'};
      const problem=rowProblem(record,birth);
      if(problem)return {entry,record,status:'invalid',problem};
      if(!entry.confirmed)return {entry,record,status:'pending'};
      const duplicate=duplicateOf(seen,record);
      if(duplicate)return {entry,record,status:'duplicate',duplicate};
      seen.push(record);return {entry,record,status:'ready'};
    });
  }
  window.vaccineBatchInternals={planBatch,rowProblem};
  async function fingerprint(file){
    const bytes=await crypto.subtle.digest('SHA-256',await file.arrayBuffer());
    return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
  }
  async function decodeImage(blob){
    const url=URL.createObjectURL(blob),image=new Image();
    try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url;});return image;}
    finally{URL.revokeObjectURL(url);}
  }
  async function pagePhoto(file){
    const image=await decodeImage(file),scale=Math.min(1,3200/Math.max(image.naturalWidth,image.naturalHeight));
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
    const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Bild konnte nicht vorbereitet werden')),'image/jpeg',.94));
  }
  let active=false;
  function openBatch(){
    if(active)return;active=true;
    let draft;
    try{draft=loadDraft();read();}catch{active=false;alert('Der lokale Import konnte nicht gelesen werden. Deine gespeicherten Impfungen bleiben erhalten.');return;}
    const owner=profileId(),key=draftKey();let busy=false,step=draft.pages.length?'pages':'select';
    const dialog=el('dialog','','vaccine-editor vaccine-batch'),body=el('div','','batch-body');
    const heading=el('h2','Impfausweis importieren'),intro=el('p','Mehrere Seiten auswählen, Impfzeilen prüfen und gemeinsam übernehmen.','reminder');
    const status=el('p','','reminder');status.setAttribute('role','status');
    const error=el('p','','entry-error');error.setAttribute('role','alert');
    const picker=el('input');picker.type='file';picker.accept='image/*';picker.multiple=true;picker.hidden=true;picker.setAttribute('aria-label','Mehrere Impfausweis-Fotos auswählen');
    const urls=new Map();let renderId=0;
    const persist=()=>{if(profileId()!==owner)throw Error('Profil gewechselt');localStorage.setItem(key,JSON.stringify(draft));};
    function plan(){return planBatch(draft.entries,read(),draft.birthDate,owner);}
    function cleanupURLs(){urls.forEach(url=>URL.revokeObjectURL(url));urls.clear();}
    async function preview(id,img,token){
      try{const blob=await photoStore('readonly',id);if(!blob)throw Error('Foto fehlt');if(!dialog.open||token!==renderId)return;const url=URL.createObjectURL(blob);urls.set(img,url);img.src=url;}
      catch{if(token===renderId){img.hidden=true;const warning=el('p','Foto auf diesem Gerät nicht verfügbar. Bitte erneut auswählen.','entry-error');img.after(warning);}}
    }
    function showImage(id,alt,token){const img=el('img','','batch-thumb');img.alt=alt;preview(id,img,token);return img;}
    function birthField(){
      const label=el('label','Geburtsdatum für die Datumsprüfung','entry-label'),input=el('input','','field');input.type='date';input.max=today();input.value=draft.birthDate;input.required=true;
      input.onchange=()=>{draft.birthDate=input.value;try{persist();error.textContent='';}catch{error.textContent='Geburtsdatum konnte nicht lokal vorgemerkt werden.';}};label.append(input);return label;
    }
    async function review(page,entry){
      if(busy)return;error.textContent='';busy=true;
      try{
        const blob=await photoStore('readonly',entry?.record.photoId||page.photoId);if(!blob)throw Error('Foto fehlt');
        const file=new File([blob],page.name,{type:blob.type||'image/jpeg'});
        editor(entry?.record||null,false,{file,birthDate:draft.birthDate,onConfirm:async(record,crop,birth)=>{
          if(profileId()!==owner)throw Error('Profil gewechselt');
          const photoId=crop?crypto.randomUUID():entry?.record.photoId;
          if(crop)await photoStore('readwrite',photoId,crop);
          const previous=draft.entries.slice(),previousBirth=draft.birthDate;
          const next={id:entry?.id||crypto.randomUUID(),pageId:page.id,confirmed:true,record:{...record,photoId,entryMethod:'photo-confirmed',reviewRequired:false}};
          draft.birthDate=birth;
          if(entry){draft.entries=draft.entries.map(x=>x.id===entry.id?next:x);}else draft.entries.push(next);
          try{persist();}catch(e){draft.entries=previous;draft.birthDate=previousBirth;throw e;}
          status.textContent='Eintrag für die gemeinsame Übernahme bestätigt. Weitere Zeilen können auf derselben Seite markiert werden.';render();
        }});
      }catch{error.textContent='Das Foto konnte nicht geöffnet werden. Bitte die Seite erneut auswählen.';}
      finally{busy=false;}
    }
    function render(){
      cleanupURLs();const token=++renderId;body.replaceChildren();
      heading.textContent=step==='review'?'Einträge gemeinsam übernehmen':'Impfausweis importieren';
      const nav=el('div','','batch-steps');nav.setAttribute('aria-label','Import-Schritte');
      [['select','1 · Fotos'],['pages','2 · Seiten prüfen'],['review','3 · Übernehmen']].forEach(([value,text])=>{const b=button(text,()=>{if(busy)return;step=value;render();},'batch-step');b.disabled=value!=='select'&&!draft.pages.length;if(step===value)b.setAttribute('aria-current','step');nav.append(b);});body.append(nav);
      if(step==='select'){
        body.append(el('p','Wähle alle fotografierten Impfpass-Seiten aus. Auf einer Seite können mehrere Impfungen stehen.','reminder'),birthField());
        body.append(button(draft.pages.length?'Weitere Fotos auswählen':'Fotos auswählen',()=>picker.click()));
        body.append(el('p','Fotos und Einträge werden nur auf diesem Gerät verarbeitet und gespeichert.','reminder'));
        if(draft.pages.length)body.append(button(`${draft.pages.length} Seiten prüfen`,()=>{step='pages';render();}));
      }else if(step==='pages'){
        body.append(el('p','Markiere pro Eintrag eine Impfzeile mit Datum und Impfstoff. Lies den Ausschnitt aus oder übertrage die Angaben manuell. Wiederhole das für weitere Zeilen auf derselben Seite.','reminder'));
        const grid=el('div','','batch-pages');
        draft.pages.forEach((page,index)=>{
          const card=el('section','','batch-page');card.append(showImage(page.photoId,`Seite ${index+1}: ${page.name}`,token));
          const detail=el('div','','batch-page-info');detail.append(el('b',`Seite ${index+1}`),el('span',page.name,'batch-filename'));
          const entries=draft.entries.filter(x=>x.pageId===page.id),confirmed=entries.filter(x=>x.confirmed||x.imported).length;
          detail.append(el('p',`${entries.length} ${entries.length===1?'Eintrag':'Einträge'} · ${confirmed} bestätigt${page.reviewed?' · Seite geprüft':''}`,'reminder'));
          detail.append(button('Impfzeile markieren',()=>review(page),'action-btn secondary'));
          const label=el('label','','entry-confirm'),checked=el('input');checked.type='checkbox';checked.checked=!!page.reviewed;label.append(checked,document.createTextNode('Seite vollständig geprüft'));
          checked.onchange=()=>{page.reviewed=checked.checked;try{persist();}catch{error.textContent='Fortschritt konnte nicht gespeichert werden.';}};detail.append(label);
          const remove=button('Seite entfernen',()=>{if(busy)return;if(draft.entries.some(x=>x.pageId===page.id&&!x.imported)){error.textContent='Bitte zuerst die vorgemerkten Einträge dieser Seite in der Übernahmeübersicht entfernen.';return;}draft.pages=draft.pages.filter(x=>x.id!==page.id);try{persist();render();}catch{error.textContent='Die Seite konnte nicht entfernt werden.';}},'link-action entry-text-button');detail.append(remove);card.append(detail);grid.append(card);
        });body.append(grid);
        const actions=el('div','','import-actions');actions.append(button('Weitere Fotos',()=>picker.click(),'action-btn secondary'),button('Einträge prüfen',()=>{step='review';render();}));body.append(actions);
      }else{
        let planned;try{planned=plan();}catch{error.textContent='Vorhandene Impfungen konnten nicht geprüft werden.';return;}
        const count=statusName=>planned.filter(row=>row.status===statusName).length;
        body.append(el('p',`${count('ready')} bereit · ${count('invalid')+count('pending')} offen · ${count('duplicate')} bereits vorhanden${count('imported')?' · '+count('imported')+' übernommen':''}`,'batch-summary'));
        if(!planned.length)body.append(el('p','Noch keine Einträge vorgemerkt. Markiere zuerst eine Impfzeile auf einem Foto.','reminder'));
        planned.forEach(row=>{
          const {entry,record}=row,page=draft.pages.find(x=>x.id===entry.pageId),card=el('section','','batch-record');
          if(record.photoId)card.append(showImage(record.photoId,`${record.name}, ${record.date} – zugehöriger Fotoausschnitt`,token));
          card.append(el('b',record.name),el('span',record.date));
          const pageIndex=draft.pages.findIndex(x=>x.id===entry.pageId);card.append(el('span',`Seite ${pageIndex+1}${record.batch?' · Charge '+record.batch:''}`,'reminder'));
          const messages={ready:'Geprüft – bereit zur Übernahme',duplicate:'Bereits vorhanden – wird nicht erneut eingetragen',pending:'Noch nicht bestätigt',invalid:row.problem,imported:'Bereits übernommen'};
          card.append(el('p',messages[row.status],row.status==='invalid'?'entry-error':'batch-status'));
          if(!entry.imported){
            const label=el('label','','entry-confirm'),checked=el('input');checked.type='checkbox';checked.checked=entry.confirmed;label.append(checked,document.createTextNode('Impfstoff und Datum mit dem Foto geprüft'));
            checked.onchange=()=>{entry.confirmed=checked.checked;try{persist();render();}catch{error.textContent='Bestätigung konnte nicht gespeichert werden.';}};card.append(label);
            const actions=el('div','','import-actions');actions.append(button('Bearbeiten',()=>review(page,entry),'link-action entry-text-button'),button('Entfernen',()=>{draft.entries=draft.entries.filter(x=>x.id!==entry.id);try{persist();render();}catch{error.textContent='Eintrag konnte nicht entfernt werden.';}},'link-action entry-text-button'));card.append(actions);
          }
          body.append(card);
        });
        const remaining=draft.pages.filter(page=>!page.reviewed).length;
        if(remaining)body.append(el('p',`${remaining} Seiten noch nicht als vollständig geprüft markiert. Du kannst bestätigte Einträge jetzt übernehmen und den Rest später fortsetzen.`,'reminder'));
        const canFinish=planned.length>0&&!remaining&&!count('invalid')&&!count('pending');
        const confirm=button(count('ready')?`${count('ready')} ${count('ready')===1?'Eintrag':'Einträge'} übernehmen`:'Import abschließen',commit);confirm.disabled=!count('ready')&&!canFinish;body.append(confirm);
        body.append(button('Zurück zu den Seiten',()=>{step='pages';render();},'action-btn secondary'));
      }
    }
    async function addFiles(files){
      if(busy||!files.length)return;busy=true;error.textContent='';let added=0,duplicates=0;const rejected=[];
      dialog.setAttribute('aria-busy','true');
      try{
        for(let i=0;i<files.length;i++){
          const file=files[i];status.textContent=`Foto ${i+1} von ${files.length} wird vorbereitet …`;
          if(draft.pages.length>=30){rejected.push('Maximal 30 Seiten pro Import. Weitere Seiten kannst du anschließend importieren.');break;}
          if(file.size>20*1024*1024){rejected.push(`${file.name}: bitte unter 20 MB auswählen.`);continue;}
          if(!file.type.startsWith('image/')&&!/\.(heic|heif|jpe?g|png|webp)$/i.test(file.name)){rejected.push(`${file.name}: keine Bilddatei.`);continue;}
          try{
            const hash=await fingerprint(file);if(draft.pages.some(page=>page.hash===hash)){duplicates++;continue;}
            const blob=await pagePhoto(file),id=crypto.randomUUID(),photoId='batch-page-'+id;
            await photoStore('readwrite',photoId,blob);
            const page={id,photoId,name:file.name,hash,reviewed:false};draft.pages.push(page);
            try{persist();}catch(e){draft.pages.pop();await photoStore('delete',photoId);throw e;}added++;
          }catch{rejected.push(`${file.name}: Bild konnte nicht lokal gespeichert werden. Bitte JPEG/PNG oder ein kleineres Foto versuchen.`);}
        }
        status.textContent=`${added} Fotos hinzugefügt${duplicates?' · '+duplicates+' doppelte Fotos übersprungen':''}.`;
        if(rejected.length)error.textContent=rejected.join(' ');
        if(draft.pages.length)step='pages';render();
      }finally{busy=false;dialog.removeAttribute('aria-busy');picker.value='';}
    }
    async function commit(){
      if(busy)return;busy=true;error.textContent='';dialog.setAttribute('aria-busy','true');
      let saved=false;
      try{
        if(profileId()!==owner)throw Error('Profil gewechselt');
        let planned=plan(),ready=planned.filter(row=>row.status==='ready');
        if(!ready.length&&(!planned.length||planned.some(row=>row.status==='pending'||row.status==='invalid')||draft.pages.some(page=>!page.reviewed)))return;
        for(const row of ready)if(!row.record.photoId||!await photoStore('readonly',row.record.photoId))throw Error('Foto fehlt');
        // Re-read after async photo checks: imports or edits in another window must not cause duplicate entries.
        const existing=read();planned=planBatch(draft.entries,existing,draft.birthDate,owner);ready=planned.filter(row=>row.status==='ready');
        const records=ready.map(row=>({...row.record,id:crypto.randomUUID(),entryMethod:'photo-confirmed',reviewRequired:false}));
        save([...existing,...records]);saved=true;
        ready.forEach(row=>{row.entry.imported=true;row.entry.confirmed=false;});
        localStorage.setItem(birthKey(),draft.birthDate);persist();
        const open=planned.some(row=>row.status==='pending'||row.status==='invalid')||draft.pages.some(page=>!page.reviewed);
        if(!open){
          localStorage.removeItem(key);
          // Only full-page drafts are removed; each saved vaccine keeps its confirmed crop.
          for(const page of draft.pages)photoStore('delete',page.photoId).catch(()=>{});
        }
        body.replaceChildren(el('h3',`${records.length} ${records.length===1?'Impfung':'Impfungen'} übernommen`),el('p',open?'Offene Seiten und Einträge bleiben lokal gespeichert. Du kannst den Import später fortsetzen.':'Die bestätigten Einträge sind jetzt in deinem Impfausweis. Bereits vorhandene Einträge wurden übersprungen.','reminder'),button('Zum Impfausweis',()=>{dialog.close();location.reload();}));
        status.textContent='';
      }catch{error.textContent=saved?'Die Impfungen wurden gespeichert, der Import-Fortschritt konnte jedoch nicht vollständig aktualisiert werden. Bereits gespeicherte Einträge werden beim Fortsetzen als vorhanden erkannt.':'Übernahme fehlgeschlagen. Bitte Speicherzugriff und Fotos prüfen. Deine bisherigen Impfungen bleiben erhalten.';}
      finally{busy=false;dialog.removeAttribute('aria-busy');}
    }
    picker.onchange=()=>addFiles(Array.from(picker.files||[]));
    const close=button('Später fortsetzen',()=>{if(busy)return;dialog.close();},'action-btn secondary');
    const footer=el('div','','batch-footer');footer.append(close);
    dialog.append(heading,intro,picker,status,error,body,footer);document.body.append(dialog);
    dialog.addEventListener('click',event=>{if(busy&&event.target.closest('button')){event.preventDefault();event.stopImmediatePropagation();}},true);
    dialog.addEventListener('cancel',event=>{if(busy)event.preventDefault();});
    dialog.onclose=()=>{active=false;cleanupURLs();dialog.remove();};dialog.showModal();render();
  }
  window.openVaccineBatch=openBatch;
  function boot(){
    const params=new URLSearchParams(location.search);
    if((params.get('view')||(pilot?'impfausweis':'termine'))!=='impfausweis')return;
    const content=document.getElementById('content');if(!content)return;
    let draft,records;try{draft=loadDraft();records=read();}catch{return;}
    if(records.length&&!draft.pages.length)return;
    const dismissKey=`health-vaccine-setup-later-${pilot?'pilot':testing?'test':'main'}-${profileId()}`;
    if(!draft.pages.length&&localStorage.getItem(dismissKey))return;
    const card=el('section','','card batch-onboarding');
    card.append(el('b',draft.pages.length?'Impfpass-Import fortsetzen':'Deinen Impfausweis einrichten'),el('p',draft.pages.length?`${draft.pages.length} Seiten lokal vorgemerkt. Setze die Prüfung fort.`:'Wähle mehrere Fotos deines Impfpasses aus und übernimm die geprüften Einträge gemeinsam.','reminder'));
    const actions=el('div','','import-actions');actions.append(button(draft.pages.length?'Import fortsetzen':'Impfausweis importieren',openBatch));
    if(!draft.pages.length){actions.append(button('Manuell starten',()=>editor(),'action-btn secondary'),button('Später',()=>{localStorage.setItem(dismissKey,'1');card.remove();},'link-action entry-text-button'));}
    card.append(actions);content.prepend(card);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
