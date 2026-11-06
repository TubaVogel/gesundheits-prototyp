/* Interface translations. Medical source records, names and handwritten notes remain unchanged. */
(() => {
  'use strict';
  const rows = [
    ['Familienübersicht','Family overview','Visão geral da família','Aile özeti'],
    ['Familie','Family','Família','Aile'],
    ['Sprache','Language','Idioma','Dil'],
    ['Profil','Profile','Perfil','Profil'],
    ['Profile','Profiles','Perfis','Profiller'],
    ['Termine','Appointments','Consultas','Randevular'],
    ['Alle','All','Tudo','Tümü'],
    ['Fällig','Due','A realizar','Zamanı gelenler'],
    ['Impfausweis','Vaccination record','Boletim de vacinas','Aşı kaydı'],
    ['Blutbild','Blood tests','Análises ao sangue','Kan tahlilleri'],
    ['Befunde und Laborwerte','Reports and lab results','Relatórios e resultados laboratoriais','Raporlar ve laboratuvar sonuçları'],
    ['Befund hinzufügen','Add report','Adicionar relatório','Rapor ekle'],
    ['Befund bearbeiten','Edit report','Editar relatório','Raporu düzenle'],
    ['Titel','Title','Título','Başlık'],
    ['Datum','Date','Data','Tarih'],
    ['Notiz','Note','Nota','Not'],
    ['Notizen','Notes','Notas','Notlar'],
    ['Fotos auswählen','Choose photos','Selecionar fotografias','Fotoğraf seç'],
    ['Bilder hochladen','Upload images','Carregar imagens','Görsel yükle'],
    ['Speichern','Save','Guardar','Kaydet'],
    ['Abbrechen','Cancel','Cancelar','İptal'],
    ['Schließen','Close','Fechar','Kapat'],
    ['Bearbeiten','Edit','Editar','Düzenle'],
    ['Löschen','Delete','Eliminar','Sil'],
    ['Entfernen','Remove','Remover','Kaldır'],
    ['Termin hinzufügen','Add appointment','Adicionar consulta','Randevu ekle'],
    ['Termin bearbeiten','Edit appointment','Editar consulta','Randevuyu düzenle'],
    ['Uhrzeit','Time','Hora','Saat'],
    ['Ort','Location','Local','Yer'],
    ['Keine Termine an diesem Tag.','No appointments on this day.','Não há consultas neste dia.','Bu gün için randevu yok.'],
    ['Keine Termine in diesem Monat.','No appointments this month.','Não há consultas neste mês.','Bu ay için randevu yok.'],
    ['Noch keine Befunde hinterlegt.','No reports added yet.','Ainda não foram adicionados relatórios.','Henüz rapor eklenmedi.'],
    ['Keine Impfungen hinterlegt.','No vaccinations added.','Não foram adicionadas vacinas.','Aşı kaydı eklenmedi.'],
    ['Vorheriger Monat','Previous month','Mês anterior','Önceki ay'],
    ['Nächster Monat','Next month','Mês seguinte','Sonraki ay'],
    ['Heute','Today','Hoje','Bugün'],
    ['Termin','Appointment','Consulta','Randevu'],
    ['Befund','Report','Relatório','Rapor'],
    ['Lokal gespeichert','Saved on this device','Guardado neste dispositivo','Bu cihazda kayıtlı'],
    ['Gemeinsamer Familienzugang','Shared family access','Acesso partilhado da família','Ortak aile erişimi'],
    ['Noch nicht verbunden','Not connected yet','Ainda sem ligação','Henüz bağlanmadı'],
    ['Einladung erstellen','Create invitation','Criar convite','Davet oluştur'],
    ['Anmeldung','Sign in','Iniciar sessão','Giriş'],
    ['Zur Familienübersicht','Go to family overview','Ir para a visão geral da família','Aile özetine git'],
    ['Foto auswählen','Choose photo','Selecionar fotografia','Fotoğraf seç'],
    ['Bilder','Images','Imagens','Görseller'],
    ['Datei konnte nicht gespeichert werden.','The file could not be saved.','Não foi possível guardar o ficheiro.','Dosya kaydedilemedi.'],
    ['Bitte mindestens ein Bild auswählen.','Please choose at least one image.','Selecione pelo menos uma imagem.','Lütfen en az bir görsel seçin.'],
    ['Dieser Befund gehört zu','This report belongs to','Este relatório pertence a','Bu raporun sahibi'],
    ['Speichern fehlgeschlagen.','Could not save.','Não foi possível guardar.','Kaydedilemedi.'],
    ['Termine und Buchungen extern verwalten.','Manage appointments and bookings externally.','Gerir consultas e marcações num serviço externo.','Randevu ve rezervasyonları harici hizmette yönetin.'],
    ['Öffnen','Open','Abrir','Aç'],
    ['Prototyp','Prototype','Protótipo','Prototip'],
    ['Tubas Gesundheitsapp',"Tuba’s Health App",'App de Saúde da Tuba',"Tuba’nın Sağlık Uygulaması"],
    ['Vorsorge, Impfausweis und Termine an einem Ort.','Preventive care, vaccinations and appointments in one place.','Prevenção, vacinas e consultas num só lugar.','Koruyucu sağlık, aşılar ve randevular tek yerde.'],
    ['Vorsorge','Preventive care','Prevenção','Koruyucu sağlık'],
    ['Zahnarzt','Dentist','Dentista','Diş hekimi'],
    ['Zahnvorsorge','Dental check-ups','Cuidados dentários preventivos','Diş kontrolleri'],
    ['Blutbild öffnen','Open blood tests','Abrir análises ao sangue','Kan tahlillerini aç'],
    ['Bitte eine Bilddatei auswählen.','Please choose an image file.','Selecione um ficheiro de imagem.','Lütfen bir görsel dosyası seçin.'],
    ['Maximal 20 MB pro Bild.','Maximum 20 MB per image.','Máximo de 20 MB por imagem.','Görsel başına en fazla 20 MB.'],
    ['Bitte zuerst speichern oder schließen.','Please save or close first.','Guarde ou feche primeiro.','Lütfen önce kaydedin veya kapatın.'],
    ['Für dieses Profil sind noch keine Termine oder Vorsorgeeinträge hinterlegt.','No appointments or preventive-care records have been added for this profile.','Ainda não foram adicionadas consultas ou registos de prevenção a este perfil.','Bu profil için henüz randevu veya koruyucu sağlık kaydı eklenmedi.'],
    ['Daten bleiben bis zur Einrichtung des Familienzugangs auf diesem Gerät.','Data stays on this device until shared family access is set up.','Os dados ficam neste dispositivo até ser configurado o acesso da família.','Aile erişimi kurulana kadar veriler bu cihazda kalır.'],
    ['Speichern und schließen','Save and close','Guardar e fechar','Kaydet ve kapat'],
    ['Namen bearbeiten','Edit names','Editar nomes','Adları düzenle'],
    ['Name','Name','Nome','Ad'],
    ['Deutsch','German','Alemão','Almanca'],
    ['English','English','Inglês','İngilizce'],
    ['Português','Portuguese','Português','Portekizce'],
    ['Türkçe','Turkish','Turco','Türkçe'],
    ['Impfungen','Vaccinations','Vacinas','Aşılar'],
    ['Impfung','Vaccination','Vacina','Aşı'],
    ['Eintrag','Entry','Registo','Kayıt'],
    ['Einträge','Entries','Registos','Kayıtlar'],
    ['Reiseimpfungen','Travel vaccinations','Vacinas de viagem','Seyahat aşıları'],
    ['Standardimpfungen','Routine vaccinations','Vacinas de rotina','Rutin aşılar'],
    ['Ältere Einträge','Older records','Registos antigos','Eski kayıtlar'],
    ['COVID / zu prüfen','COVID / review needed','COVID / a verificar','COVID / kontrol gerekli'],
    ['Influenza','Influenza','Gripe','Grip'],
    ['Masern','Measles','Sarampo','Kızamık'],
    ['Hepatitis A','Hepatitis A','Hepatite A','Hepatit A'],
    ['Hepatitis B','Hepatitis B','Hepatite B','Hepatit B'],
    ['Hepatitis','Hepatitis','Hepatite','Hepatit'],
    ['Tollwut','Rabies','Raiva','Kuduz'],
    ['Gelbfieber','Yellow fever','Febre amarela','Sarıhumma'],
    ['Typhus','Typhoid','Febre tifoide','Tifo'],
    ['Tetanus','Tetanus','Tétano','Tetanos'],
    ['Impfschutz','Vaccination status','Estado de vacinação','Aşı durumu'],
    ['Eintrag gespeichert','Entry saved','Registo guardado','Kayıt kaydedildi'],
    ['Impfstatus bei Bedarf ärztlich prüfen','Ask a clinician to review vaccination status if needed','Se necessário, confirme o estado de vacinação com um médico','Gerekirse aşı durumunu bir hekimle kontrol edin'],
    ['Impfungen nach Thema durchsuchen, Immunisierung einschätzen und Erinnerungen vormerken.','Browse vaccinations by topic, review immunisation records and set reminders.','Pesquisar vacinas por tema, consultar os registos de imunização e definir lembretes.','Aşıları konuya göre inceleyin, bağışıklama kayıtlarını gözden geçirin ve hatırlatıcı ekleyin.'],
    ['Impfungen durchsuchen','Search vaccinations','Pesquisar vacinas','Aşılarda ara'],
    ['Suchen, z. B. Masern, Hepatitis B, Tollwut','Search, e.g. measles, hepatitis B, rabies','Pesquisar, por ex. sarampo, hepatite B, raiva','Ara: ör. kızamık, hepatit B, kuduz'],
    ['Keine Impfpass-Einträge auf diesem Gerät.','No vaccination records on this device.','Não há registos de vacinas neste dispositivo.','Bu cihazda aşı kaydı yok.'],
    ['Keine Impfungen zu dieser Suche gefunden.','No vaccinations match this search.','Não foram encontradas vacinas para esta pesquisa.','Bu aramayla eşleşen aşı bulunamadı.'],
    ['+ Impfung hinzufügen','+ Add vaccination','+ Adicionar vacina','+ Aşı ekle'],
    ['Impfung hinzufügen','Add vaccination','Adicionar vacina','Aşı ekle'],
    ['Impfung bearbeiten','Edit vaccination','Editar vacina','Aşıyı düzenle'],
    ['Impfeintrag prüfen','Review vaccination entry','Verificar registo de vacina','Aşı kaydını kontrol et'],
    ['Foto aufnehmen','Take photo','Tirar fotografia','Fotoğraf çek'],
    ['Mehrere Fotos auswählen','Choose multiple photos','Selecionar várias fotografias','Birden fazla fotoğraf seç'],
    ['Mehrere Fotos importieren','Import multiple photos','Importar várias fotografias','Birden fazla fotoğrafı içe aktar'],
    ['Mehrere Impfausweis-Fotos auswählen','Choose multiple vaccination-record photos','Selecionar várias fotografias do boletim de vacinas','Birden fazla aşı kaydı fotoğrafı seç'],
    ['Daten übernehmen','Import data','Importar dados','Verileri içe aktar'],
    ['Privaten Impfstand übernehmen','Import private vaccination records','Importar registos privados de vacinas','Özel aşı kayıtlarını içe aktar'],
    ['Aktualisierungslink oder Import-Code','Update link or import code','Ligação de atualização ou código de importação','Güncelleme bağlantısı veya içe aktarma kodu'],
    ['Übernehmen','Import','Importar','İçe aktar'],
    ['Die Korrektur wird auf diesem Gerät übernommen. Andere Impfungen bleiben erhalten.','The update will be applied on this device. Other vaccination records will be preserved.','A atualização será aplicada neste dispositivo. Os outros registos de vacinas serão mantidos.','Güncelleme bu cihaza uygulanır. Diğer aşı kayıtları korunur.'],
    ['Der Link oder Code konnte nicht übernommen werden. Bitte den vollständigen privaten Aktualisierungslink einfügen.','The link or code could not be imported. Please paste the complete private update link.','Não foi possível importar a ligação ou o código. Cole a ligação privada de atualização completa.','Bağlantı veya kod içe aktarılamadı. Lütfen özel güncelleme bağlantısının tamamını yapıştırın.'],
    ['Die private Aktualisierung konnte nicht übernommen werden. Bestehende Daten wurden nicht ersetzt.','The private update could not be applied. Existing data was not replaced.','Não foi possível aplicar a atualização privada. Os dados existentes não foram substituídos.','Özel güncelleme uygulanamadı. Mevcut veriler değiştirilmedi.'],
    ['Impfung / Impfstoff','Vaccination / vaccine','Vacina / produto','Aşı / aşı ürünü'],
    ['Impfdatum','Vaccination date','Data da vacinação','Aşı tarihi'],
    ['Geburtsdatum für Datumsprüfung','Date of birth for date validation','Data de nascimento para validar as datas','Tarih kontrolü için doğum tarihi'],
    ['Geburtsdatum für die Datumsprüfung','Date of birth for date validation','Data de nascimento para validar as datas','Tarih kontrolü için doğum tarihi'],
    ['Charge (optional)','Batch (optional)','Lote (opcional)','Parti numarası (isteğe bağlı)'],
    ['Notiz (optional)','Note (optional)','Nota (opcional)','Not (isteğe bağlı)'],
    ['Impfstoff und Datum geprüft','Vaccine and date checked','Vacina e data verificadas','Aşı ürünü ve tarih kontrol edildi'],
    ['Impfstoff und Datum mit dem Foto geprüft','Vaccine and date checked against the photo','Vacina e data confirmadas na fotografia','Aşı ürünü ve tarih fotoğrafla karşılaştırıldı'],
    ['Foto des Impfeintrags','Photo of vaccination entry','Fotografia do registo da vacina','Aşı kaydının fotoğrafı'],
    ['Datum und Impfstoff möglichst nah fotografieren.','Photograph the date and vaccine label close up.','Fotografe de perto a data e a etiqueta da vacina.','Tarihi ve aşı etiketini yakından fotoğraflayın.'],
    ['Nur eine Impfzeile markieren: Datum und Impfstoff-Aufkleber müssen im Rahmen liegen.','Select one vaccination row only: include the date and vaccine label in the frame.','Selecione apenas uma linha de vacinação: inclua a data e a etiqueta da vacina na moldura.','Yalnızca bir aşı satırı seçin: tarih ve aşı etiketi çerçevenin içinde olmalı.'],
    ['Fotoausschnitt durch Ziehen auswählen','Drag to select photo crop','Arraste para selecionar o recorte','Sürükleyerek fotoğraf alanını seç'],
    ['Ausschnitt ändern','Change crop','Alterar recorte','Seçili alanı değiştir'],
    ['Ausschnitt genau einstellen','Fine-tune crop','Ajustar recorte com precisão','Seçili alanı hassas ayarla'],
    ['Ausschnitt übernehmen','Use crop','Usar recorte','Seçili alanı kullan'],
    ['Links','Left','Esquerda','Sol'],
    ['Oben','Top','Cima','Üst'],
    ['Rechts','Right','Direita','Sağ'],
    ['Unten','Bottom','Baixo','Alt'],
    ['Dieser Ausschnitt wird ausgelesen','This crop will be read','Este recorte será lido','Bu alan okunacak'],
    ['Dieser Ausschnitt wird ausgelesen und gespeichert','This crop will be read and saved','Este recorte será lido e guardado','Bu alan okunacak ve kaydedilecek'],
    ['Nur dieser Ausschnitt wird ausgelesen und als Foto gespeichert.','Only this crop will be read and saved as a photo.','Apenas este recorte será lido e guardado como fotografia.','Yalnızca bu alan okunur ve fotoğraf olarak kaydedilir.'],
    ['Bitte zuerst die einzelne Impfzeile markieren und den Ausschnitt übernehmen.','First select a single vaccination row and confirm the crop.','Selecione primeiro uma única linha de vacinação e confirme o recorte.','Önce tek bir aşı satırı seçin ve seçili alanı onaylayın.'],
    ['Der Ausschnitt konnte nicht übernommen werden. Bitte erneut markieren.','The crop could not be used. Please select it again.','Não foi possível usar o recorte. Selecione-o novamente.','Seçili alan kullanılamadı. Lütfen yeniden seçin.'],
    ['Text aus Foto lesen','Read text from photo','Ler texto da fotografia','Fotoğraftaki metni oku'],
    ['Texterkennung wird geladen …','Loading text recognition…','A carregar reconhecimento de texto…','Metin tanıma yükleniyor…'],
    ['Erkannter Text','Recognised text','Texto reconhecido','Tanınan metin'],
    ['Vorschläge bitte mit dem Foto abgleichen. Handschriftliche Daten und Jahreszahlen selbst bestätigen.','Compare the suggestions with the photo. Confirm handwritten dates and years yourself.','Compare as sugestões com a fotografia. Confirme as datas e os anos manuscritos.','Önerileri fotoğrafla karşılaştırın. El yazısıyla yazılmış tarih ve yılları kendiniz doğrulayın.'],
    ['Kein verlässlicher Impfstoff oder Datum erkannt. Bitte den Ausschnitt enger wählen oder die Angaben vom Foto übertragen.','No reliable vaccine or date was recognised. Choose a tighter crop or enter the details from the photo.','Não foi reconhecida uma vacina ou data fiável. Selecione um recorte mais estreito ou introduza os dados da fotografia.','Güvenilir bir aşı ürünü veya tarih tanınamadı. Daha dar bir alan seçin veya fotoğraftaki bilgileri girin.'],
    ['Texterkennung nicht verfügbar. Bitte die Angaben vom Foto in die Felder übertragen.','Text recognition is unavailable. Enter the details from the photo in the fields.','O reconhecimento de texto não está disponível. Introduza nos campos os dados da fotografia.','Metin tanıma kullanılamıyor. Fotoğraftaki bilgileri alanlara girin.'],
    ['Bitte ein Foto unter 20 MB auswählen.','Please choose a photo smaller than 20 MB.','Selecione uma fotografia com menos de 20 MB.','Lütfen 20 MB’tan küçük bir fotoğraf seçin.'],
    ['Bitte warten, bis die laufende Erkennung beendet ist.','Please wait until text recognition finishes.','Aguarde até terminar o reconhecimento de texto.','Lütfen devam eden metin tanıma işleminin bitmesini bekleyin.'],
    ['Dieses Bildformat kann hier nicht gelesen werden. Bitte als JPEG oder PNG auswählen.','This image format cannot be read here. Please choose JPEG or PNG.','Este formato de imagem não pode ser lido aqui. Selecione JPEG ou PNG.','Bu görsel biçimi burada okunamıyor. Lütfen JPEG veya PNG seçin.'],
    ['Bitte zuerst den Fotoausschnitt übernehmen.','Please confirm the photo crop first.','Confirme primeiro o recorte da fotografia.','Lütfen önce seçili fotoğraf alanını onaylayın.'],
    ['Bitte ein gültiges Impfdatum ab dem Geburtsdatum und bis heute eingeben.','Enter a valid vaccination date between the date of birth and today.','Introduza uma data de vacinação válida entre a data de nascimento e hoje.','Doğum tarihi ile bugün arasında geçerli bir aşı tarihi girin.'],
    ['Bitte den Impfstoff eintragen.','Please enter the vaccine.','Introduza a vacina.','Lütfen aşı ürününü girin.'],
    ['Dieser Eintrag ist bereits vorhanden und wird beim Import übersprungen.','This entry already exists and will be skipped during import.','Este registo já existe e será ignorado na importação.','Bu kayıt zaten mevcut; içe aktarma sırasında atlanacak.'],
    ['Die vorhandenen Impfungen konnten nicht geprüft werden.','Existing vaccinations could not be checked.','Não foi possível verificar as vacinas existentes.','Mevcut aşılar kontrol edilemedi.'],
    ['Vorhandene Impfungen konnten nicht geprüft werden.','Existing vaccinations could not be checked.','Não foi possível verificar as vacinas existentes.','Mevcut aşılar kontrol edilemedi.'],
    ['Profil gewechselt. Bitte den Eintrag erneut öffnen.','The profile has changed. Please reopen the entry.','O perfil foi alterado. Volte a abrir o registo.','Profil değişti. Lütfen kaydı yeniden açın.'],
    ['Für Import bestätigen','Confirm for import','Confirmar para importação','İçe aktarma için onayla'],
    ['Der Eintrag konnte nicht im Import vorgemerkt werden. Bitte Speicherzugriff prüfen.','The entry could not be added to the import draft. Please check storage access.','Não foi possível adicionar o registo ao rascunho de importação. Verifique o acesso ao armazenamento.','Kayıt içe aktarma taslağına eklenemedi. Lütfen depolama erişimini kontrol edin.'],
    ['Speichern fehlgeschlagen. Bitte Speicherzugriff prüfen. Deine bisherigen Einträge bleiben erhalten.','Could not save. Check storage access. Your existing records are preserved.','Não foi possível guardar. Verifique o acesso ao armazenamento. Os registos existentes são mantidos.','Kaydedilemedi. Depolama erişimini kontrol edin. Mevcut kayıtlarınız korunur.'],
    ['Gespeichertes Impffoto','Saved vaccination photo','Fotografia de vacina guardada','Kayıtlı aşı fotoğrafı'],
    ['Foto ansehen','View photo','Ver fotografia','Fotoğrafı görüntüle'],
    ['Dieses Foto ist auf diesem Gerät nicht verfügbar.','This photo is not available on this device.','Esta fotografia não está disponível neste dispositivo.','Bu fotoğraf bu cihazda mevcut değil.'],
    ['Datum prüfen','Check date','Verificar data','Tarihi kontrol et'],
    ['Datum korrigieren','Correct date','Corrigir data','Tarihi düzelt'],
    ['Impfspeicher konnte nicht gelesen werden.','Vaccination storage could not be read.','Não foi possível ler os registos de vacinas.','Aşı kayıtları okunamadı.'],
    ['Datum aus altem Import unplausibel. Bitte am Original prüfen.','The date from an old import appears implausible. Please check the original.','A data de uma importação antiga parece incorreta. Verifique o original.','Eski içe aktarmadaki tarih tutarsız görünüyor. Lütfen aslını kontrol edin.'],
    ['Das Impfdatum liegt vor dem Geburtsdatum.','The vaccination date is before the date of birth.','A data da vacinação é anterior à data de nascimento.','Aşı tarihi doğum tarihinden önce.'],
    ['Das Impfdatum liegt in der Zukunft.','The vaccination date is in the future.','A data da vacinação está no futuro.','Aşı tarihi gelecekte.'],
    ['Influenza-Impfung dokumentiert','Influenza vaccination recorded','Vacina contra a gripe registada','Grip aşısı kaydedildi'],
    ['Vollständiges Impfdatum ergänzen, um die nächste saisonale Impfung einzuordnen.','Add the full vaccination date to determine the next seasonal vaccination.','Adicione a data completa da vacinação para determinar a próxima vacina sazonal.','Bir sonraki mevsimsel aşıyı belirlemek için tam aşı tarihini ekleyin.'],
    ['Warum jährlich?','Why every year?','Porquê todos os anos?','Neden her yıl?'],
    ['Bei fortgesetzter jährlicher Grippeimpfung ist die nächste Impfung für die folgende Saison vorgesehen. Ob sie medizinisch empfohlen ist, hängt unter anderem von Alter und Risiko ab. Der Schutz baut sich üblicherweise in etwa 10–14 Tagen auf; ein persönliches Ablaufdatum ist nicht zuverlässig bestimmbar.','With annual influenza vaccination, the next dose is planned for the following season. Whether it is medically recommended depends on factors including age and risk. Protection usually develops in about 10–14 days; a precise personal expiry date cannot be reliably determined.','Com a vacinação anual contra a gripe, a próxima dose está prevista para a época seguinte. A recomendação médica depende, entre outros fatores, da idade e do risco. A proteção desenvolve-se geralmente em cerca de 10–14 dias; não é possível determinar com fiabilidade uma data de validade individual.','Her yıl grip aşısı olunuyorsa bir sonraki doz sonraki sezon için planlanır. Tıbben önerilip önerilmemesi yaş ve risk gibi etkenlere bağlıdır. Koruma genellikle yaklaşık 10–14 günde gelişir; kişiye özel kesin bir bitiş tarihi güvenilir biçimde belirlenemez.'],
    ['RKI: Influenza-Impfempfehlung','RKI: influenza vaccination recommendation','RKI: recomendação de vacinação contra a gripe','RKI: grip aşısı önerisi'],
    ['Deinen Impfausweis einrichten','Set up your vaccination record','Configurar o seu boletim de vacinas','Aşı kaydınızı oluşturun'],
    ['Impfausweis importieren','Import vaccination record','Importar boletim de vacinas','Aşı kaydını içe aktar'],
    ['Impfpass-Import fortsetzen','Resume vaccination-record import','Continuar a importação do boletim de vacinas','Aşı kaydını içe aktarmaya devam et'],
    ['Wähle mehrere Fotos deines Impfpasses aus und übernimm die geprüften Einträge gemeinsam.','Choose multiple photos of your vaccination record and import the checked entries together.','Selecione várias fotografias do boletim de vacinas e importe em conjunto os registos verificados.','Aşı kaydınızın birden fazla fotoğrafını seçin ve kontrol edilen kayıtları birlikte içe aktarın.'],
    ['Manuell starten','Start manually','Começar manualmente','Elle başla'],
    ['Später','Later','Mais tarde','Daha sonra'],
    ['Import fortsetzen','Resume import','Continuar importação','İçe aktarmaya devam et'],
    ['Mehrere Seiten auswählen, Impfzeilen prüfen und gemeinsam übernehmen.','Choose multiple pages, check vaccination rows and import them together.','Selecione várias páginas, verifique as linhas de vacinação e importe-as em conjunto.','Birden fazla sayfa seçin, aşı satırlarını kontrol edin ve birlikte içe aktarın.'],
    ['1 · Fotos','1 · Photos','1 · Fotografias','1 · Fotoğraflar'],
    ['2 · Seiten prüfen','2 · Check pages','2 · Verificar páginas','2 · Sayfaları kontrol et'],
    ['3 · Übernehmen','3 · Import','3 · Importar','3 · İçe aktar'],
    ['Import-Schritte','Import steps','Passos da importação','İçe aktarma adımları'],
    ['Wähle alle fotografierten Impfpass-Seiten aus. Auf einer Seite können mehrere Impfungen stehen.','Choose all photographed vaccination-record pages. A page may contain multiple vaccinations.','Selecione todas as páginas fotografadas do boletim de vacinas. Uma página pode conter várias vacinas.','Fotoğrafladığınız tüm aşı kaydı sayfalarını seçin. Bir sayfada birden fazla aşı bulunabilir.'],
    ['Fotos und Einträge werden nur auf diesem Gerät verarbeitet und gespeichert.','Photos and entries are processed and stored only on this device.','As fotografias e os registos são processados e guardados apenas neste dispositivo.','Fotoğraf ve kayıtlar yalnızca bu cihazda işlenir ve saklanır.'],
    ['Markiere pro Eintrag eine Impfzeile mit Datum und Impfstoff. Lies den Ausschnitt aus oder übertrage die Angaben manuell. Wiederhole das für weitere Zeilen auf derselben Seite.','For each entry, select a vaccination row with its date and vaccine. Read the crop or enter the details manually. Repeat for other rows on the same page.','Para cada registo, selecione uma linha com a data e a vacina. Leia o recorte ou introduza os dados manualmente. Repita para as outras linhas da mesma página.','Her kayıt için tarih ve aşı ürününü içeren bir satır seçin. Seçili alanı okutun veya bilgileri elle girin. Aynı sayfadaki diğer satırlar için tekrarlayın.'],
    ['Impfzeile markieren','Select vaccination row','Selecionar linha de vacinação','Aşı satırını seç'],
    ['Seite vollständig geprüft','Page fully checked','Página totalmente verificada','Sayfanın tamamı kontrol edildi'],
    ['Seite entfernen','Remove page','Remover página','Sayfayı kaldır'],
    ['Weitere Fotos','More photos','Mais fotografias','Daha fazla fotoğraf'],
    ['Weitere Fotos auswählen','Choose more photos','Selecionar mais fotografias','Daha fazla fotoğraf seç'],
    ['Einträge prüfen','Check entries','Verificar registos','Kayıtları kontrol et'],
    ['Einträge gemeinsam übernehmen','Import entries together','Importar registos em conjunto','Kayıtları birlikte içe aktar'],
    ['Noch keine Einträge vorgemerkt. Markiere zuerst eine Impfzeile auf einem Foto.','No entries have been drafted yet. Select a vaccination row on a photo first.','Ainda não há registos no rascunho. Selecione primeiro uma linha de vacinação numa fotografia.','Henüz taslak kayıt yok. Önce bir fotoğrafta aşı satırı seçin.'],
    ['Geprüft – bereit zur Übernahme','Checked – ready to import','Verificado – pronto a importar','Kontrol edildi – içe aktarmaya hazır'],
    ['Bereits vorhanden – wird nicht erneut eingetragen','Already exists – will not be added again','Já existe – não será adicionado novamente','Zaten mevcut – yeniden eklenmeyecek'],
    ['Noch nicht bestätigt','Not confirmed yet','Ainda não confirmado','Henüz onaylanmadı'],
    ['Bereits übernommen','Already imported','Já importado','Zaten içe aktarıldı'],
    ['Zurück zu den Seiten','Back to pages','Voltar às páginas','Sayfalara dön'],
    ['Import abschließen','Finish import','Concluir importação','İçe aktarmayı tamamla'],
    ['Später fortsetzen','Continue later','Continuar mais tarde','Daha sonra devam et'],
    ['Zum Impfausweis','Go to vaccination record','Ir para o boletim de vacinas','Aşı kaydına git'],
    ['Impfung ergänzen','Add vaccination name','Adicionar nome da vacina','Aşı adını ekle'],
    ['Vollständiges Impfdatum ergänzen','Add full vaccination date','Adicionar a data completa da vacinação','Tam aşı tarihini ekle'],
    ['Geburtsdatum ergänzen','Add date of birth','Adicionar data de nascimento','Doğum tarihini ekle'],
    ['Impfdatum liegt vor dem Geburtsdatum','Vaccination date is before date of birth','A data da vacinação é anterior à data de nascimento','Aşı tarihi doğum tarihinden önce'],
    ['Impfdatum liegt in der Zukunft','Vaccination date is in the future','A data da vacinação está no futuro','Aşı tarihi gelecekte'],
    ['Der lokale Import konnte nicht gelesen werden. Deine gespeicherten Impfungen bleiben erhalten.','The local import could not be read. Your saved vaccination records are preserved.','Não foi possível ler a importação local. Os registos de vacinas guardados são mantidos.','Yerel içe aktarma okunamadı. Kayıtlı aşılarınız korunur.'],
    ['Foto auf diesem Gerät nicht verfügbar. Bitte erneut auswählen.','Photo unavailable on this device. Please choose it again.','Fotografia indisponível neste dispositivo. Selecione-a novamente.','Fotoğraf bu cihazda mevcut değil. Lütfen yeniden seçin.'],
    ['Geburtsdatum konnte nicht lokal vorgemerkt werden.','The date of birth could not be saved to the local draft.','Não foi possível guardar a data de nascimento no rascunho local.','Doğum tarihi yerel taslağa kaydedilemedi.'],
    ['Eintrag für die gemeinsame Übernahme bestätigt. Weitere Zeilen können auf derselben Seite markiert werden.','Entry confirmed for batch import. You can select more rows on the same page.','Registo confirmado para importação em conjunto. Pode selecionar mais linhas na mesma página.','Kayıt toplu içe aktarma için onaylandı. Aynı sayfada başka satırlar seçebilirsiniz.'],
    ['Das Foto konnte nicht geöffnet werden. Bitte die Seite erneut auswählen.','The photo could not be opened. Please choose the page again.','Não foi possível abrir a fotografia. Selecione a página novamente.','Fotoğraf açılamadı. Lütfen sayfayı yeniden seçin.'],
    ['Fortschritt konnte nicht gespeichert werden.','Progress could not be saved.','Não foi possível guardar o progresso.','İlerleme kaydedilemedi.'],
    ['Bitte zuerst die vorgemerkten Einträge dieser Seite in der Übernahmeübersicht entfernen.','First remove this page’s draft entries from the import overview.','Remova primeiro os registos desta página do rascunho na visão geral da importação.','Önce içe aktarma özetinden bu sayfanın taslak kayıtlarını kaldırın.'],
    ['Die Seite konnte nicht entfernt werden.','The page could not be removed.','Não foi possível remover a página.','Sayfa kaldırılamadı.'],
    ['Bestätigung konnte nicht gespeichert werden.','Confirmation could not be saved.','Não foi possível guardar a confirmação.','Onay kaydedilemedi.'],
    ['Eintrag konnte nicht entfernt werden.','The entry could not be removed.','Não foi possível remover o registo.','Kayıt kaldırılamadı.'],
    ['Maximal 30 Seiten pro Import. Weitere Seiten kannst du anschließend importieren.','Maximum 30 pages per import. You can import more pages afterwards.','Máximo de 30 páginas por importação. Pode importar mais páginas depois.','Her içe aktarmada en fazla 30 sayfa. Daha sonra başka sayfalar içe aktarabilirsiniz.'],
    ['Offene Seiten und Einträge bleiben lokal gespeichert. Du kannst den Import später fortsetzen.','Unfinished pages and entries remain saved locally. You can resume the import later.','As páginas e os registos por concluir ficam guardados localmente. Pode continuar a importação mais tarde.','Tamamlanmamış sayfa ve kayıtlar yerel olarak saklanır. İçe aktarmaya daha sonra devam edebilirsiniz.'],
    ['Die bestätigten Einträge sind jetzt in deinem Impfausweis. Bereits vorhandene Einträge wurden übersprungen.','Confirmed entries are now in your vaccination record. Existing entries were skipped.','Os registos confirmados estão agora no boletim de vacinas. Os registos existentes foram ignorados.','Onaylanan kayıtlar artık aşı kaydınızda. Mevcut kayıtlar atlandı.'],
    ['Die Impfungen wurden gespeichert, der Import-Fortschritt konnte jedoch nicht vollständig aktualisiert werden. Bereits gespeicherte Einträge werden beim Fortsetzen als vorhanden erkannt.','Vaccinations were saved, but import progress could not be fully updated. Saved entries will be recognised as existing when you resume.','As vacinas foram guardadas, mas não foi possível atualizar todo o progresso da importação. Ao continuar, os registos guardados serão reconhecidos como existentes.','Aşılar kaydedildi ancak içe aktarma ilerlemesi tamamen güncellenemedi. Devam ettiğinizde kayıtlı girdiler mevcut olarak tanınır.'],
    ['Übernahme fehlgeschlagen. Bitte Speicherzugriff und Fotos prüfen. Deine bisherigen Impfungen bleiben erhalten.','Import failed. Check storage access and photos. Your existing vaccinations are preserved.','A importação falhou. Verifique o acesso ao armazenamento e as fotografias. As vacinas existentes são mantidas.','İçe aktarma başarısız. Depolama erişimini ve fotoğrafları kontrol edin. Mevcut aşılarınız korunur.'],
    ['Bild konnte nicht vorbereitet werden','The image could not be prepared','Não foi possível preparar a imagem','Görsel hazırlanamadı'],
    ['Foto fehlt','Photo missing','Fotografia em falta','Fotoğraf eksik'],
    ['Falsches Profil','Wrong profile','Perfil incorreto','Yanlış profil'],
    ['Profil gewechselt','Profile changed','Perfil alterado','Profil değişti'],
    ['Speicherung abgebrochen','Save cancelled','Gravação cancelada','Kaydetme iptal edildi'],
    ['Eintrag wurde inzwischen verändert','The entry has changed in the meantime','O registo foi entretanto alterado','Bu sırada kayıt değiştirildi'],
    ['Speicherformat nicht lesbar','Storage format cannot be read','Não é possível ler o formato dos dados','Depolama biçimi okunamıyor'],
    ['Ungültiger Import','Invalid import','Importação inválida','Geçersiz içe aktarma'],
    ['Ungültiger Impfeintrag','Invalid vaccination entry','Registo de vacina inválido','Geçersiz aşı kaydı'],
    ['Import gehört zu einem anderen Profil','Import belongs to a different profile','A importação pertence a outro perfil','İçe aktarma başka bir profile ait'],
    ['Private Übernahme','Private import','Importação privada','Özel içe aktarma'],
    ['Import-Code kopieren','Copy import code','Copiar código de importação','İçe aktarma kodunu kopyala'],
    ['Impfungen übernehmen','Import vaccinations','Importar vacinas','Aşıları içe aktar'],
    ['Import-Code hier einfügen','Paste import code here','Cole aqui o código de importação','İçe aktarma kodunu buraya yapıştırın'],
    ['Immunisierung dokumentiert','Immunisation recorded','Imunização registada','Bağışıklama kaydedildi'],
    ['Immunisierung prüfen','Review immunisation','Verificar imunização','Bağışıklamayı kontrol edin'],
    ['Immunisierung wahrscheinlich vollständig dokumentiert','Immunisation likely fully recorded','Imunização provavelmente totalmente registada','Bağışıklama büyük olasılıkla tam olarak kaydedilmiş'],
    ['Immunisierung noch unvollständig prüfen','Review incomplete immunisation records','Verificar registos de imunização incompletos','Eksik bağışıklama kayıtlarını kontrol edin'],
    ['Grundimmunisierung dokumentiert','Primary vaccination series recorded','Esquema primário de vacinação registado','Temel aşı serisi kaydedildi'],
    ['Grundimmunisierung prüfen','Review primary vaccination series','Verificar o esquema primário de vacinação','Temel aşı serisini kontrol edin'],
    ['Reiseimpfung dokumentiert','Travel vaccination recorded','Vacina de viagem registada','Seyahat aşısı kaydedildi'],
    ['Schutz dokumentiert','Protection recorded','Proteção registada','Koruma kaydedildi'],
    ['COVID-Impfung dokumentiert','COVID vaccination recorded','Vacina contra a COVID registada','COVID aşısı kaydedildi'],
    ['Keine routinemäßige Auffrischung geplant','No routine booster planned','Sem reforço de rotina previsto','Rutin pekiştirme dozu planlanmıyor'],
    ['Fehlende Dosis ärztlich klären','Discuss a missing dose with a clinician','Confirme a dose em falta com um médico','Eksik dozu bir hekimle görüşün'],
    ['Bei Reise/Risiko ärztlich prüfen','Consult a clinician for travel or risk situations','Consulte um médico em caso de viagem ou risco','Seyahat veya risk durumunda bir hekimle kontrol edin'],
    ['Kein fixer Auffrischtermin; bei Risiko Titer/Auffrischung prüfen','No fixed booster date; review titre/booster if at risk','Sem data fixa de reforço; verificar título/reforço em caso de risco','Sabit pekiştirme tarihi yok; risk durumunda titre/pekiştirmeyi değerlendirin'],
    ['Keine routinemäßige Auffrischung; bei unklarem Status prüfen','No routine booster; review if status is unclear','Sem reforço de rotina; verificar se o estado não for claro','Rutin pekiştirme yok; durum belirsizse kontrol edin'],
    ['Bedarf abhängig von Alter/Risiko ärztlich prüfen','Ask a clinician to assess need based on age/risk','Peça a um médico que avalie a necessidade em função da idade/do risco','Gerekliliği yaşa/riske göre bir hekimle değerlendirin'],
    ['Jährlich im Herbst prüfen, falls Risiko oder aktuelle Empfehlung zutrifft','Review each autumn if risk or current recommendations apply','Verificar todos os outonos se houver risco ou recomendação atual aplicável','Risk veya güncel öneri geçerliyse her sonbahar değerlendirin'],
    ['Keine Standard-Auffrischung geplant','No standard booster planned','Sem reforço padrão previsto','Standart pekiştirme dozu planlanmıyor'],
    ['Vor Reise oder Risiko Titer/Auffrischung prüfen','Review titre/booster before travel or risk exposure','Verificar título/reforço antes de viagem ou exposição de risco','Seyahat veya riskli temas öncesi titre/pekiştirmeyi değerlendirin'],
    ['Typhus vor Reise prüfen','Review typhoid vaccination before travel','Verificar a vacina contra a febre tifoide antes de viajar','Seyahat öncesi tifo aşısını değerlendirin'],
    ['Einreisevorgaben vor Reise prüfen','Check entry requirements before travel','Verifique os requisitos de entrada antes de viajar','Seyahat öncesi giriş koşullarını kontrol edin'],
    ['Polio bei Reise-/Expositionsrisiko prüfen','Review polio vaccination for travel/exposure risk','Verificar a vacina contra a poliomielite em caso de risco de viagem/exposição','Seyahat/temas riski varsa çocuk felci aşısını değerlendirin'],
    ['Keine Termine hinterlegt','No appointments added','Não foram adicionadas consultas','Randevu eklenmedi'],
    ['Keine fälligen Einträge','No entries due','Sem registos a realizar','Zamanı gelen kayıt yok'],
    ['Noch keine Vorsorgetermine hinterlegt.','No preventive-care appointments added yet.','Ainda não foram adicionadas consultas de prevenção.','Henüz koruyucu sağlık randevusu eklenmedi.'],
    ['Zahnreinigung planen','Plan dental cleaning','Planear limpeza dentária','Diş temizliği planla'],
    ['Noch kein Ergebnis hinterlegt · beim nächsten Check-up anfragen','No result added yet · ask at your next check-up','Ainda sem resultado · pedir no próximo check-up','Henüz sonuç eklenmedi · sonraki kontrolde sorun'],
    ['Bereich hinzufügen','Add category','Adicionar área','Alan ekle'],
    ['Kardiologie, Onkologie oder weitere Bereiche können später hier als eigene Erinnerung ergänzt werden.','Cardiology, oncology and other categories can be added here as separate reminders later.','Cardiologia, oncologia e outras áreas podem ser adicionadas aqui como lembretes separados mais tarde.','Kardiyoloji, onkoloji ve diğer alanlar buraya daha sonra ayrı hatırlatıcılar olarak eklenebilir.'],
    ['Ansicht','View','Vista','Görünüm'],
    ['Impfstoff','Vaccine','Vacina','Aşı ürünü'],
    ['Charge','Batch','Lote','Parti'],
    ['Seite','Page','Página','Sayfa'],
    ['Seiten','Pages','Páginas','Sayfalar']
  ];
  rows.push(...[
  [
    "10-Jahres-Rhythmus prüfen",
    "Review the 10-year interval",
    "Verificar o intervalo de 10 anos",
    "10 yıllık aralığı değerlendirin"
  ],
  [
    "2028 prüfen",
    "Review in 2028",
    "Verificar em 2028",
    "2028 yılında kontrol edin"
  ],
  [
    "Regelbasiert",
    "Rule-based",
    "Baseado em regras",
    "Kurallara dayalı"
  ],
  [
    "Fällig und zu prüfen",
    "Due and to review",
    "A realizar e a verificar",
    "Zamanı gelen ve kontrol edilecekler"
  ],
  [
    "Warum?",
    "Why?",
    "Porquê?",
    "Neden?"
  ],
  [
    "Diese Liste wird aus Vorsorge- und Impfregeln erzeugt. Standards sind vorgeschlagen und später individuell änderbar.",
    "This list is generated from preventive-care and vaccination rules. Suggested defaults can be customised later.",
    "Esta lista é gerada a partir de regras de prevenção e vacinação. As predefinições sugeridas podem ser personalizadas mais tarde.",
    "Bu liste koruyucu sağlık ve aşı kurallarından oluşturulur. Önerilen varsayılanlar daha sonra kişiye göre değiştirilebilir."
  ],
  [
    "Tetanus / Diphtherie",
    "Tetanus / diphtheria",
    "Tétano / difteria",
    "Tetanos / difteri"
  ],
  [
    "Check-up / Blutbild",
    "Check-up / blood tests",
    "Check-up / análises ao sangue",
    "Sağlık kontrolü / kan tahlilleri"
  ],
  [
    "Gynäkologische Krebsfrüherkennung",
    "Gynaecological cancer screening",
    "Rastreio de cancro ginecológico",
    "Jinekolojik kanser taraması"
  ],
  [
    "Status offen",
    "Status unknown",
    "Estado por confirmar",
    "Durum belirsiz"
  ],
  [
    "Letzten Termin hinterlegen",
    "Add last appointment",
    "Adicionar a última consulta",
    "Son randevuyu ekle"
  ],
  [
    "Erinnerung März 2027",
    "Reminder for March 2027",
    "Lembrete para março de 2027",
    "Mart 2027 hatırlatması"
  ],
  [
    "2026 vor Reise prüfen",
    "Review before travel in 2026",
    "Verificar antes de viajar em 2026",
    "2026 yılında seyahat öncesi kontrol edin"
  ],
  [
    "Letzte Zahnreinigung Ende September 2026. Nächsten Termin für März 2027 anfragen.",
    "Last dental cleaning at the end of September 2026. Request the next appointment for March 2027.",
    "Última limpeza dentária no final de setembro de 2026. Pedir a próxima consulta para março de 2027.",
    "Son diş temizliği Eylül 2026 sonunda. Mart 2027 için sonraki randevuyu isteyin."
  ],
  [
    "Letzte Zahnreinigung: Ende September 2026 · Erinnerung: nächsten Termin für März 2027 anfragen",
    "Last dental cleaning: end of September 2026 · Reminder: request the next appointment for March 2027",
    "Última limpeza dentária: final de setembro de 2026 · Lembrete: pedir a próxima consulta para março de 2027",
    "Son diş temizliği: Eylül 2026 sonu · Hatırlatma: Mart 2027 için sonraki randevuyu isteyin"
  ],
  [
    "Letzte Zahnreinigung: Ende September 2026",
    "Last dental cleaning: end of September 2026",
    "Última limpeza dentária: final de setembro de 2026",
    "Son diş temizliği: Eylül 2026 sonu"
  ],
  [
    "März 2027 · Erinnerung: nächsten Termin anfragen",
    "March 2027 · Reminder: request the next appointment",
    "Março de 2027 · Lembrete: pedir a próxima consulta",
    "Mart 2027 · Hatırlatma: sonraki randevuyu isteyin"
  ],
  [
    "Nächster Schritt: Termin über Doctolib öffnen oder aus Kalender übernehmen.",
    "Next step: open the appointment in Doctolib or import it from your calendar.",
    "Próximo passo: abrir a consulta no Doctolib ou importá-la do calendário.",
    "Sonraki adım: randevuyu Doctolib üzerinden açın veya takvimden içe aktarın."
  ],
  [
    "Nächster Schritt: Termin über Doctolib oder Kalender übernehmen, sobald die Integration verbunden ist.",
    "Next step: import an appointment from Doctolib or your calendar once the integration is connected.",
    "Próximo passo: importar uma consulta do Doctolib ou do calendário quando a integração estiver ligada.",
    "Sonraki adım: entegrasyon bağlandıktan sonra randevuyu Doctolib veya takvimden içe aktarın."
  ],
  [
    "Letzte dokumentierte Auffrischung: Boostrix am 25.05.2018. Nächste Prüfung im 10-Jahres-Rhythmus vormerken.",
    "Last recorded booster: Boostrix on 25 May 2018. Schedule the next review at the 10-year interval.",
    "Último reforço registado: Boostrix em 25/05/2018. Agendar a próxima revisão no intervalo de 10 anos.",
    "Kaydedilen son pekiştirme dozu: 25.05.2018 tarihinde Boostrix. Sonraki değerlendirmeyi 10 yıllık aralığa göre planlayın."
  ],
  [
    "Typhus ist als Reiseimpfung dokumentiert. Vor der nächsten passenden Reise prüfen, ob eine Auffrischung nötig ist.",
    "Typhoid is recorded as a travel vaccination. Before the next relevant trip, check whether a booster is needed.",
    "A vacina contra a febre tifoide está registada como vacina de viagem. Antes da próxima viagem relevante, confirme se é necessário um reforço.",
    "Tifo aşısı seyahat aşısı olarak kayıtlı. İlgili bir sonraki seyahatten önce pekiştirme dozunun gerekip gerekmediğini kontrol edin."
  ],
  [
    "Letzten Check-up oder letzte Laborwerte hinterlegen, damit die App die nächste Erinnerung berechnen kann.",
    "Add your last check-up or lab results so the app can calculate the next reminder.",
    "Adicione o último check-up ou os últimos resultados laboratoriais para a app calcular o próximo lembrete.",
    "Uygulamanın sonraki hatırlatmayı hesaplayabilmesi için son sağlık kontrolünü veya laboratuvar sonuçlarını ekleyin."
  ],
  [
    "Sobald der letzte Termin eingetragen ist, kann die App das passende Intervall nach Alter und Untersuchung anzeigen.",
    "Once the last appointment is entered, the app can show the relevant interval based on age and examination.",
    "Depois de introduzir a última consulta, a app pode mostrar o intervalo adequado à idade e ao exame.",
    "Son randevu girildikten sonra uygulama yaşa ve muayeneye uygun aralığı gösterebilir."
  ],
  [
    "Standard: Zahnvorsorge halbjährlich möglich; Bonusheft mindestens jährlich relevant.",
    "Default: dental check-ups may be available every six months; the dental bonus booklet requires at least an annual record.",
    "Referência: os controlos dentários podem ser semestrais; o boletim de bónus dentário exige pelo menos um registo anual.",
    "Standart: diş kontrolleri altı ayda bir yapılabilir; diş bakım bonus defteri için en az yıllık kayıt gerekir."
  ],
  [
    "Quelle: RKI/STIKO-Impfkalender, 10-Jahres-Auffrischung bei vollständiger Grundimmunisierung.",
    "Source: RKI/STIKO vaccination schedule; booster every 10 years after a complete primary series.",
    "Fonte: calendário de vacinação RKI/STIKO; reforço a cada 10 anos após o esquema primário completo.",
    "Kaynak: RKI/STIKO aşı takvimi; temel seri tamamsa 10 yılda bir pekiştirme dozu."
  ],
  [
    "Quelle: RKI/STIKO Reise-/Indikationsimpfungen; abhängig von Reiseziel und Risiko.",
    "Source: RKI/STIKO travel/indication-based vaccinations; depends on destination and risk.",
    "Fonte: RKI/STIKO, vacinas de viagem/por indicação; depende do destino e do risco.",
    "Kaynak: RKI/STIKO seyahat/endikasyon aşıları; gidilecek yere ve riske bağlıdır."
  ],
  [
    "Standard: 18-34 einmalig; ab 35 alle 3 Jahre als GKV-Leistung möglich.",
    "Default: once at ages 18–34; from age 35, every 3 years may be covered by German statutory health insurance.",
    "Referência: uma vez entre os 18 e os 34 anos; a partir dos 35, pode ser coberto pelo seguro público alemão a cada 3 anos.",
    "Standart: 18–34 yaş arasında bir kez; 35 yaşından itibaren Alman kamu sağlık sigortası kapsamında 3 yılda bir yapılabilir."
  ],
  [
    "Quelle: G-BA Früherkennungsuntersuchungen und Krebsfrüherkennungs-Richtlinie.",
    "Source: G-BA screening examinations and cancer screening guideline.",
    "Fonte: exames de rastreio e diretriz de rastreio do cancro do G-BA.",
    "Kaynak: G-BA erken tanı muayeneleri ve kanser tarama yönergesi."
  ],
  [
    "Die Regel kommt aus der Vorsorge-Regelbasis. Für Erwachsene übernehmen gesetzliche Krankenkassen Vorsorgeuntersuchungen regelmäßig; das persönliche Intervall bleibt anpassbar.",
    "This rule comes from the preventive-care rule set. German statutory health insurers regularly cover preventive examinations for adults; the personal interval can be adjusted.",
    "Esta regra vem da base de regras de prevenção. Os seguros públicos alemães cobrem regularmente exames preventivos para adultos; o intervalo pessoal pode ser ajustado.",
    "Bu kural koruyucu sağlık kurallarından gelir. Alman kamu sağlık sigortaları yetişkinlerin koruyucu muayenelerini düzenli olarak karşılar; kişisel aralık değiştirilebilir."
  ],
  [
    "Die App sagt bewusst nicht 'geschützt bis 2028', sondern erinnert daran, die Auffrischung zu prüfen.",
    "The app deliberately does not say ‘protected until 2028’; it reminds you to review the booster.",
    "A app não afirma ‘proteção até 2028’; lembra que deve verificar o reforço.",
    "Uygulama ‘2028 yılına kadar korunuyorsunuz’ demez; pekiştirme dozunu değerlendirmenizi hatırlatır."
  ],
  [
    "Typhus ist keine Standardimpfung für alle. Deshalb erscheint sie als Reise-/Risikohinweis, nicht als allgemeine Pflicht.",
    "Typhoid is not a routine vaccination for everyone. It is therefore shown as travel/risk guidance rather than a general requirement.",
    "A vacina contra a febre tifoide não é uma vacina de rotina para todos. Por isso, aparece como orientação de viagem/risco e não como obrigação geral.",
    "Tifo herkes için rutin bir aşı değildir. Bu nedenle genel bir zorunluluk olarak değil, seyahat/risk bilgisi olarak gösterilir."
  ],
  [
    "Blutbild wird nicht pauschal als eigener Pflichttermin gesetzt. Es wird als Teil des Check-ups oder als individuell hinterlegter Bereich geführt.",
    "Blood tests are not automatically set as a separate mandatory appointment. They are listed as part of a check-up or as a personally added category.",
    "As análises ao sangue não são definidas automaticamente como consulta obrigatória separada. São apresentadas como parte do check-up ou como área adicionada individualmente.",
    "Kan tahlilleri otomatik olarak ayrı bir zorunlu randevu sayılmaz. Sağlık kontrolünün parçası veya kişisel olarak eklenen bir alan olarak tutulur."
  ],
  [
    "Die Intervalle unterscheiden sich je nach Alter. Deshalb braucht die App hier den letzten dokumentierten Termin, statt blind ein Datum zu behaupten.",
    "Intervals differ by age. The app therefore needs the last recorded appointment instead of assuming a date.",
    "Os intervalos variam com a idade. Por isso, a app precisa da última consulta registada em vez de presumir uma data.",
    "Aralıklar yaşa göre değişir. Bu nedenle uygulama bir tarih varsaymak yerine kaydedilen son randevuya ihtiyaç duyar."
  ],
  [
    "Für die Home-App: diesen Code in Safari kopieren und im Impfausweis der Home-App einfügen. Die Daten bleiben lokal auf deinem Gerät.",
    "For the home-screen app: copy this code in Safari and paste it into the vaccination record in the home-screen app. Data remains on your device.",
    "Para a app do ecrã principal: copie este código no Safari e cole-o no boletim de vacinas da app. Os dados permanecem no dispositivo.",
    "Ana ekran uygulaması için: bu kodu Safari’de kopyalayın ve ana ekran uygulamasının aşı kaydına yapıştırın. Veriler cihazınızda kalır."
  ],
  [
    "Wenn die Impfungen in Safari sichtbar sind: dort den Import-Code kopieren, hier einfügen und übernehmen.",
    "If your vaccinations are visible in Safari, copy the import code there, paste it here and import.",
    "Se as vacinas estiverem visíveis no Safari, copie aí o código de importação, cole-o aqui e importe.",
    "Aşılar Safari’de görünüyorsa içe aktarma kodunu oradan kopyalayın, buraya yapıştırın ve içe aktarın."
  ],
  [
    "Impfpass lokal importiert.",
    "Vaccination record imported locally.",
    "Boletim de vacinas importado localmente.",
    "Aşı kaydı yerel olarak içe aktarıldı."
  ],
  [
    "Import konnte nicht gelesen werden. Bitte neuen Import-Link öffnen.",
    "The import could not be read. Please open a new import link.",
    "Não foi possível ler a importação. Abra uma nova ligação de importação.",
    "İçe aktarma okunamadı. Lütfen yeni bir içe aktarma bağlantısı açın."
  ],
  [
    "Impfstoff:",
    "Vaccine:",
    "Vacina:",
    "Aşı ürünü:"
  ],
  [
    "Datum:",
    "Date:",
    "Data:",
    "Tarih:"
  ],
  [
    "Charge:",
    "Batch:",
    "Lote:",
    "Parti:"
  ]
]);
  rows.push(...[
  [
    "Befunde",
    "Reports",
    "Relatórios",
    "Raporlar"
  ],
  [
    "Weitere Termine in diesem Monat",
    "Other appointments this month",
    "Outras consultas neste mês",
    "Bu ayın diğer randevuları"
  ],
  [
    "Zahnreinigung",
    "Dental cleaning",
    "Limpeza dentária",
    "Diş temizliği"
  ],
  [
    "Maximal 20 Bilder pro Befund.",
    "Maximum 20 images per report.",
    "Máximo de 20 imagens por relatório.",
    "Rapor başına en fazla 20 görsel."
  ],
  [
    "Vorhandene Bilder bleiben erhalten.",
    "Existing images will be preserved.",
    "As imagens existentes serão mantidas.",
    "Mevcut görseller korunur."
  ],
  [
    "Bilder werden gespeichert …",
    "Saving images…",
    "A guardar imagens…",
    "Görseller kaydediliyor…"
  ],
  [
    "Nächste Termine",
    "Upcoming appointments",
    "Próximas consultas",
    "Yaklaşan randevular"
  ],
  [
    "Keine anstehenden Termine.",
    "No upcoming appointments.",
    "Não há consultas próximas.",
    "Yaklaşan randevu yok."
  ],
  [
    "Lokale Daten konnten nicht gelesen werden.",
    "Local data could not be read.",
    "Não foi possível ler os dados locais.",
    "Yerel veriler okunamadı."
  ],
  [
    "Weitere Termine",
    "Other appointments",
    "Outras consultas",
    "Diğer randevular"
  ],
  [
    "Für alle Familienmitglieder",
    "For all family members",
    "Para todos os membros da família",
    "Tüm aile üyeleri için"
  ],
  [
    "Alle Personen",
    "All people",
    "Todas as pessoas",
    "Tüm kişiler"
  ],
  [
    "Befund ansehen",
    "View report",
    "Ver relatório",
    "Raporu görüntüle"
  ],
  [
    "Bilder ansehen",
    "View images",
    "Ver imagens",
    "Görselleri görüntüle"
  ],
  [
    "Termin ansehen",
    "View appointment",
    "Ver consulta",
    "Randevuyu görüntüle"
  ],
  [
    "Vollständig",
    "Complete",
    "Completo",
    "Tamamlandı"
  ],
  [
    "Person",
    "Person",
    "Pessoa",
    "Kişi"
  ],
  [
    "Laborwerte",
    "Lab results",
    "Resultados laboratoriais",
    "Laboratuvar sonuçları"
  ]
]);
  rows.push(...[
  [
    "Dateien hochladen",
    "Upload files",
    "Carregar ficheiros",
    "Dosya yükle"
  ],
  [
    "Dateien",
    "Files",
    "Ficheiros",
    "Dosyalar"
  ],
  [
    "Datei",
    "File",
    "Ficheiro",
    "Dosya"
  ],
  [
    "Dokument öffnen",
    "Open document",
    "Abrir documento",
    "Belgeyi aç"
  ],
  [
    "Bitte ein Bild oder eine PDF-Datei auswählen.",
    "Please choose an image or a PDF file.",
    "Selecione uma imagem ou um ficheiro PDF.",
    "Lütfen bir görsel veya PDF dosyası seçin."
  ],
  [
    "Maximal 20 Dateien pro Befund.",
    "Maximum 20 files per report.",
    "Máximo de 20 ficheiros por relatório.",
    "Rapor başına en fazla 20 dosya."
  ],
  [
    "Maximal 20 MB pro Datei.",
    "Maximum 20 MB per file.",
    "Máximo de 20 MB por ficheiro.",
    "Dosya başına en fazla 20 MB."
  ],
  [
    "Bitte mindestens eine Datei auswählen.",
    "Please choose at least one file.",
    "Selecione pelo menos um ficheiro.",
    "Lütfen en az bir dosya seçin."
  ],
  [
    "Vorhandene Dateien bleiben erhalten.",
    "Existing files will be preserved.",
    "Os ficheiros existentes serão mantidos.",
    "Mevcut dosyalar korunur."
  ],
  [
    "Dateien werden gespeichert …",
    "Saving files…",
    "A guardar ficheiros…",
    "Dosyalar kaydediliyor…"
  ],
  [
    "Ungültige PDF-Datei.",
    "Invalid PDF file.",
    "Ficheiro PDF inválido.",
    "Geçersiz PDF dosyası."
  ],
  [
    "Dokument auf diesem Gerät nicht verfügbar. Bitte erneut auswählen.",
    "Document unavailable on this device. Please choose it again.",
    "Documento indisponível neste dispositivo. Selecione-o novamente.",
    "Belge bu cihazda mevcut değil. Lütfen yeniden seçin."
  ]
]);
  const dictionaries = { en: {}, pt: {}, tr: {} };
  for (const [de,en,pt,tr] of rows) {
    dictionaries.en[de]=en; dictionaries.pt[de]=pt; dictionaries.tr[de]=tr;
  }
  window.healthI18n = dictionaries;
  const patterns = [
    [/^Impfung für Saison (\d{4}\/\d{4}) dokumentiert$/, ['Vaccination for the $1 season recorded','Vacina para a época $1 registada','$1 sezonu aşısı kaydedildi']],
    [/^Nächste saisonale Impfung: Oktober (\d{4}) \(Saison (\d{4}\/\d{4})\)\.$/, ['Next seasonal vaccination: October $1 ($2 season).','Próxima vacina sazonal: outubro de $1 (época $2).','Sonraki mevsimsel aşı: Ekim $1 ($2 sezonu).']],
    [/^Text wird gelesen: (\d+) %$/, ['Reading text: $1%','A ler texto: $1%','Metin okunuyor: %$1']],
    [/^Impfstoff: (.+)$/, ['Vaccine: $1','Vacina: $1','Aşı ürünü: $1']],
    [/^Datum: (.+)$/, ['Date: $1','Data: $1','Tarih: $1']],
    [/^Charge: (.+)$/, ['Batch: $1','Lote: $1','Parti: $1']],
    [/^(.+) vom (.+) ist bereits eingetragen\. Bitte den vorhandenen Eintrag bearbeiten\.$/, ['$1 on $2 is already recorded. Please edit the existing entry.','$1 em $2 já está registado. Edite o registo existente.','$2 tarihli $1 zaten kayıtlı. Lütfen mevcut kaydı düzenleyin.']],
    [/^(\d+) Seiten lokal vorgemerkt\. Setze die Prüfung fort\.$/, ['$1 pages saved in the local draft. Continue reviewing.','$1 páginas guardadas no rascunho local. Continue a verificação.','$1 sayfa yerel taslakta kayıtlı. Kontrole devam edin.']],
    [/^(\d+) Seiten prüfen$/, ['Check $1 pages','Verificar $1 páginas','$1 sayfayı kontrol et']],
    [/^Seite (\d+)(: .+)?$/, ['Page $1$2','Página $1$2','Sayfa $1$2']],
    [/^Seite (\d+) · Charge (.+)$/, ['Page $1 · Batch $2','Página $1 · Lote $2','Sayfa $1 · Parti $2']],
    [/^(\d+) (?:Eintrag|Einträge) · (\d+) bestätigt( · Seite geprüft)?$/, ['$1 entries · $2 confirmed$3','$1 registos · $2 confirmados$3','$1 kayıt · $2 onaylandı$3']],
    [/^(\d+) bereit · (\d+) offen · (\d+) bereits vorhanden(?: · (\d+) übernommen)?$/, ['$1 ready · $2 pending · $3 already exist$4','$1 prontos · $2 pendentes · $3 já existentes$4','$1 hazır · $2 bekliyor · $3 zaten mevcut$4']],
    [/^(\d+) (?:Eintrag|Einträge) übernehmen$/, ['Import $1 entries','Importar $1 registos','$1 kaydı içe aktar']],
    [/^(\d+) Seiten noch nicht als vollständig geprüft markiert\. Du kannst bestätigte Einträge jetzt übernehmen und den Rest später fortsetzen\.$/, ['$1 pages have not been marked as fully checked. You can import confirmed entries now and finish the rest later.','$1 páginas ainda não foram marcadas como totalmente verificadas. Pode importar agora os registos confirmados e continuar o resto mais tarde.','$1 sayfa henüz tamamen kontrol edildi olarak işaretlenmedi. Onaylanan kayıtları şimdi içe aktarıp kalanına daha sonra devam edebilirsiniz.']],
    [/^Foto (\d+) von (\d+) wird vorbereitet …$/, ['Preparing photo $1 of $2…','A preparar fotografia $1 de $2…','$2 fotoğraftan $1. hazırlanıyor…']],
    [/^(\d+) Fotos hinzugefügt(?: · (\d+) doppelte Fotos übersprungen)?\.$/, ['$1 photos added$2.','$1 fotografias adicionadas$2.','$1 fotoğraf eklendi$2.']],
    [/^(.+): bitte unter 20 MB auswählen\.$/, ['$1: please choose a file smaller than 20 MB.','$1: selecione um ficheiro com menos de 20 MB.','$1: lütfen 20 MB’tan küçük bir dosya seçin.']],
    [/^(.+): keine Bilddatei\.$/, ['$1: not an image file.','$1: não é um ficheiro de imagem.','$1: görsel dosyası değil.']],
    [/^(.+): Bild konnte nicht lokal gespeichert werden\. Bitte JPEG\/PNG oder ein kleineres Foto versuchen\.$/, ['$1: the image could not be saved locally. Try JPEG/PNG or a smaller photo.','$1: não foi possível guardar a imagem localmente. Experimente JPEG/PNG ou uma fotografia mais pequena.','$1: görsel yerel olarak kaydedilemedi. JPEG/PNG veya daha küçük bir fotoğraf deneyin.']],
    [/^(\d+) (?:Impfung|Impfungen) übernommen$/, ['$1 vaccinations imported','$1 vacinas importadas','$1 aşı içe aktarıldı']],
    [/^Erinnerung (\d{4}): Typhus vor Reise prüfen$/, ['Reminder $1: review typhoid vaccination before travel','Lembrete $1: verificar a vacina contra a febre tifoide antes de viajar','Hatırlatma $1: seyahat öncesi tifo aşısını değerlendirin']],
    [/^Erinnerung (\d{4}): vor Reise oder Risiko Titer\/Auffrischung prüfen$/, ['Reminder $1: review titre/booster before travel or risk exposure','Lembrete $1: verificar título/reforço antes de viagem ou exposição de risco','Hatırlatma $1: seyahat veya riskli temas öncesi titre/pekiştirmeyi değerlendirin']],
    [/^Zertifikat meist lebenslang; (\d{4}) bei erneuter Exposition ärztlich prüfen$/, ['Certificate usually lifelong; consult a clinician in $1 if exposed again','Certificado geralmente vitalício; consultar um médico em $1 se houver nova exposição','Belge genellikle ömür boyu geçerlidir; yeniden temas durumunda $1 yılında bir hekimle değerlendirin']],
    [/^Langzeitschutz dokumentiert; Erinnerung (\d{4}) bei Reise\/Risiko prüfen$/, ['Long-term protection recorded; reminder $1 to review for travel/risk','Proteção a longo prazo registada; lembrete $1 para verificar em caso de viagem/risco','Uzun süreli koruma kaydedildi; seyahat/risk için $1 yılında değerlendirme hatırlatması']],
    [/^Erinnerung (\d{4}): Tetanus\/Diphtherie-Auffrischung prüfen$/, ['Reminder $1: review tetanus/diphtheria booster','Lembrete $1: verificar reforço de tétano/difteria','Hatırlatma $1: tetanos/difteri pekiştirme dozunu değerlendirin']],
    [/^Erinnerung (\d{4}): Polio bei Reise-\/Expositionsrisiko prüfen$/, ['Reminder $1: review polio vaccination for travel/exposure risk','Lembrete $1: verificar a vacina contra a poliomielite em caso de risco de viagem/exposição','Hatırlatma $1: seyahat/temas riski varsa çocuk felci aşısını değerlendirin']]
  ];
  // Pattern entries use RegExp + target replacements. Consume through healthTranslate for plural/count formatting.
  window.healthI18nPatterns = patterns.map(([re,values]) => ({re,en:values[0],pt:values[1],tr:values[2]}));
  window.healthTranslate = function(source, language) {
    if(typeof source!=='string' || language==='de' || !dictionaries[language])return source;
    const leading=source.match(/^\s*/)[0],trailing=source.match(/\s*$/)[0],value=source.trim();
    if(!value)return source;
    if(Object.prototype.hasOwnProperty.call(dictionaries[language],value))return leading+dictionaries[language][value]+trailing;
    const index={en:0,pt:1,tr:2}[language];
    // UI counts may arrive before or after label translation. Turkish uses the singular noun after a number.
    const countMatch=value.match(/^(\d+) (Impfungen|Impfung|Vaccinations|Vaccination|Vacinas|Vacina|Aşılar|Aşı|Befunde|Befund|Reports|Report|Relatórios|Relatório|Raporlar|Rapor|Termine|Termin|Appointments|Appointment|Consultas|Consulta|Randevular|Randevu|Bilder|Bild|Images|Image|Imagens|Imagem|Görseller|Görsel|Dateien|Datei|Files|File|Ficheiros|Ficheiro|Dosyalar|Dosya)$/i);
    if(countMatch){
      const n=countMatch[1],label=countMatch[2].toLowerCase(),one=n==='1';
      const group=/^(impfung|vaccination|vacina|aşı)/i.test(label)?'vaccinations':/^(befund|report|relat|rapor)/i.test(label)?'reports':/^(termin|appointment|consulta|randevu)/i.test(label)?'appointments':/^(datei|file|ficheiro|dosya)/i.test(label)?'files':'images';
      const nouns={
        en:{vaccinations:one?'vaccination':'vaccinations',reports:one?'report':'reports',appointments:one?'appointment':'appointments',images:one?'image':'images',files:one?'file':'files'},
        pt:{vaccinations:one?'vacina':'vacinas',reports:one?'relatório':'relatórios',appointments:one?'consulta':'consultas',images:one?'imagem':'imagens',files:one?'ficheiro':'ficheiros'},
        tr:{vaccinations:'aşı',reports:'rapor',appointments:'randevu',images:'görsel',files:'dosya'}
      };
      return leading+n+' '+nouns[language][group]+trailing;
    }
    // Counted summaries need explicit optional-section formatting.
    let m=value.match(/^(\d+) (?:Eintrag|Einträge) · (\d+) bestätigt( · Seite geprüft)?$/);
    if(m)return leading+[
      `${m[1]} ${m[1]==='1'?'entry':'entries'} · ${m[2]} confirmed${m[3]?' · Page checked':''}`,
      `${m[1]} ${m[1]==='1'?'registo':'registos'} · ${m[2]} confirmados${m[3]?' · Página verificada':''}`,
      `${m[1]} kayıt · ${m[2]} onaylandı${m[3]?' · Sayfa kontrol edildi':''}`
    ][index]+trailing;
    m=value.match(/^(\d+) bereit · (\d+) offen · (\d+) bereits vorhanden(?: · (\d+) übernommen)?$/);
    if(m)return leading+[
      `${m[1]} ready · ${m[2]} pending · ${m[3]} already exist${m[4]?` · ${m[4]} imported`:''}`,
      `${m[1]} prontos · ${m[2]} pendentes · ${m[3]} já existentes${m[4]?` · ${m[4]} importados`:''}`,
      `${m[1]} hazır · ${m[2]} bekliyor · ${m[3]} zaten mevcut${m[4]?` · ${m[4]} içe aktarıldı`:''}`
    ][index]+trailing;
    m=value.match(/^(\d+) Fotos hinzugefügt(?: · (\d+) doppelte Fotos übersprungen)?\.$/);
    if(m)return leading+[
      `${m[1]} photos added${m[2]?` · ${m[2]} duplicate photos skipped`:''}.`,
      `${m[1]} fotografias adicionadas${m[2]?` · ${m[2]} fotografias duplicadas ignoradas`:''}.`,
      `${m[1]} fotoğraf eklendi${m[2]?` · ${m[2]} yinelenen fotoğraf atlandı`:''}.`
    ][index]+trailing;
    for(const [re,replacements] of patterns)if(re.test(value))return leading+value.replace(re,replacements[index])+trailing;
    return source;
  };
})();
(() => {
  const rows=[
    ['Dateien hochladen','Upload files','Carregar ficheiros','Dosya yükle'],['Dateien','Files','Ficheiros','Dosyalar'],['Datei','File','Ficheiro','Dosya'],
    ['Dokument öffnen','Open document','Abrir documento','Belgeyi aç'],
    ['Bitte ein Bild oder eine PDF-Datei auswählen.','Please select an image or a PDF file.','Selecione uma imagem ou um ficheiro PDF.','Lütfen bir görsel veya PDF dosyası seçin.'],
    ['Maximal 20 Dateien pro Befund.','Up to 20 files per report.','Até 20 ficheiros por relatório.','Her rapor için en fazla 20 dosya.'],
    ['Maximal 20 MB pro Datei.','Maximum 20 MB per file.','Máximo de 20 MB por ficheiro.','Her dosya en fazla 20 MB olabilir.'],
    ['Bitte mindestens eine Datei auswählen.','Please select at least one file.','Selecione pelo menos um ficheiro.','Lütfen en az bir dosya seçin.'],
    ['Vorhandene Dateien bleiben erhalten.','Existing files will be kept.','Os ficheiros existentes serão mantidos.','Mevcut dosyalar korunur.'],
    ['Dateien werden gespeichert …','Saving files…','A guardar ficheiros…','Dosyalar kaydediliyor…'],
    ['Ungültige PDF-Datei.','Invalid PDF file.','Ficheiro PDF inválido.','Geçersiz PDF dosyası.'],
    ['Dokument auf diesem Gerät nicht verfügbar. Bitte erneut auswählen.','Document unavailable on this device. Please select it again.','Documento indisponível neste dispositivo. Selecione-o novamente.','Belge bu cihazda kullanılamıyor. Lütfen yeniden seçin.']
  ];
  for(const [de,en,pt,tr] of rows)for(const [lang,value] of [['en',en],['pt',pt],['tr',tr]])window.healthI18n[lang][de]=value;
  const original=window.healthTranslate;
  window.healthTranslate=(value,lang)=>{if(typeof value==='string'){const m=value.trim().match(/^(\d+) Datei(?:en)?$/);if(m){const n=m[1],one=n==='1';return `${n} `+({de:one?'Datei':'Dateien',en:one?'file':'files',pt:one?'ficheiro':'ficheiros',tr:'dosya'}[lang]||'Dateien');}}return original(value,lang);};
})();
