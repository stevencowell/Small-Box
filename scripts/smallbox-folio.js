const STORE='smallbox_project_folio_v1';
const CARDS=[
  ["brief","Project brief and success criteria","Show that you understand the Small Box requirements and how evidence is judged in this unit.","Brief analysis, success criteria, and a link between the plan and expected quality checks.","What must your Small Box do and what evidence proves it was achieved?",["My Small Box must…","My evidence will prove…"],"A completed Small Box matched to clear function, safety and quality requirements."],
  ["planning","Project planning, marking and layout","Show how your planning and marking protected accuracy before cutting.","Working references, marked points, sequencing notes, and a recorded pre-cut check.","Why was your planning sequence critical before any irreversible cuts?",["I planned around…","My first pre-cut check was…"],"A planning map showing reference points, marking sequence and checked controls."],
  ["whs","WHS, WMS and workshop controls","Show how risk was controlled for each cutting and fitting task.","Hazard list, control hierarchy, safe set-up checks, PPE and teacher control points.","Which control prevented the highest-risk incident pathway?",["The highest risk was…","I controlled it by…"],"A visual checklist of controls tied to the actual operations."],
  ["timber","Timber inspection and material placement","Explain how timber quality and orientation decisions affected this build.","Grain checks, defect checks, orientation choices, and responsible material use.","How did inspection change your final component layout?",["I selected this side because…","I adjusted placement because…"],"A timber-inspection workflow with defect checks and placement notes."],
  ["joints","Joints and divider fitting","Explain how divider and joint preparation were controlled before locking in place.","Dry-fit logs, edge checks, divider clearance checks, square validation and correction notes.","Which joint check changed your confidence the most?",["The joint edge was prepared by…","I adjusted for fit because…"],"A divider and joint fit diagram with sequence checks and correction stages."],
  ["assembly","Assembly and clamp control","Show how clamp setup supported safe, repeatable assembly.","Clamp positions, hold-down checks, movement control, and staged test-fit records.","What prevented movement at the most critical assembly moment?",["I clamped this edge because…","My final clamp check was…"],"An assembly plan showing clamp points and a staged test-fit sequence."],
  ["surface","Surface preparation","Describe how you prepared each face for finishing.","Sanding and cleaning stages, edge checks, dust controls, and readiness evidence.","What made you confident the surface was ready for finishing?",["The surface was ready when…","I confirmed readiness by…"],"A staged surface-preparation sequence with readiness checks before finish."],
  ["finish","Finish process and quality checks","Record how finish application was controlled for safety and quality.","Product and PPE controls, timing, coat observations, re-check intervals and corrective actions.","How did checks between coats improve your final finish quality?",["I observed between coats…","I corrected because…"],"A finish sequence with controls, conditions and observed adjustments."],
  ["evidence","Photos, captions and evidence flow","Build a complete evidence sequence linking planning, making and evaluation.","Stage photos, clear captions, notes about cause and correction, and concise decision chains.","Which evidence item best proves your best design/process decision?",["This evidence proves…","It is important because…"],"A timeline-style evidence flow from first checks to final inspection."],
  ["problems","Problem solving and adjustment","Describe one real assembly or fitting issue and the corrected process.","Observed issue, diagnosis, teacher-supported correction, and outcome proof.","Which correction had the biggest learning impact?",["The issue started when…","I confirmed the cause by…","The correction was…"],"Issue ? diagnosis ? adjustment ? re-check ? improved result workflow."],
  ["evaluation","PMI evaluation","Evaluate the final project with balanced strengths, limits and questions.","Final function checks, fit checks, finish quality, limitations and transfer ideas.","How strongly does your Small Box meet the brief?",["A plus supported by evidence is…","A minus with evidence is…","An interesting next question is…"],"A final PMI map across function, fit, finish, process quality and transfer."],
  ["transfer","Project reflection and transfer","Identify what you will take to your next Timber task.","Transfer habits, likely corrections, evidence discipline and future checks.","Which two routines will you repeat next time and why?",["I will repeat…","I will improve…","Next project, I will check…"],"Two transferable routines with evidence-linked reminders for the next build."]
].map((c,i)=>({id:i+1,key:c[0],title:c[1],purpose:c[2],evidence:c[3],prompt:c[4],starters:c[5],visual:c[6]}));
const $=id=>document.getElementById(id), enc=new TextEncoder(), dec=new TextDecoder();
const safe=s=>String(s||'smallbox-folio').trim().replace(/[^a-z0-9]+/gi,'-').replace(/^-+|-+$/g,'').toLowerCase()||'smallbox-folio';
const status=s=>$('folioStatus').textContent=s;

function cards(){
  $('folioCards').innerHTML=CARDS.map(c=>`<article class="folio-card"><div class="folio-number">${c.id}<span>Card</span></div><div class="folio-body"><div class="folio-head"><div><p class="section-kicker">Evidence card ${c.id}</p><h2>${c.title}</h2></div><label class="folio-complete"><input type="checkbox" data-done="${c.key}"> Reviewed</label></div><div class="folio-meta"><article><h3>Why this matters</h3><p>${c.purpose}</p></article><article><h3>Evidence to collect</h3><p>${c.evidence}</p><h3>Visual idea</h3><p>${c.visual}</p></article></div><div class="folio-response-grid"><div class="folio-field"><label for="response-${c.key}">${c.prompt}</label><textarea id="response-${c.key}" data-response="${c.key}" placeholder="Write your response here…"></textarea></div><div class="folio-field"><label for="note-${c.key}">Evidence note or photo caption</label><textarea id="note-${c.key}" data-note="${c.key}" placeholder="What does your photo, sketch or check prove?"></textarea><details class="sentence-starters"><summary>Sentence starters</summary><ul>${c.starters.map(s=>`<li>${s}</li>`).join('')}</ul></details></div></div><div class="photo-panel"><h3>Add one useful photo</h3><p>Use your own build photo, sketch or check. It is included in the ZIP backup.</p><label class="photo-upload">Choose photo<input type="file" accept="image/*" data-photo="${c.key}"></label><img class="photo-preview" data-preview="${c.key}" alt="${c.title} evidence preview"></div></article>`).join('');
}

function session(){
  const responses = {};
  const notes = {};
  const done = {};
  const photos = {};
  CARDS.forEach(c=>{
    responses[c.key]=$(`response-${c.key}`).value;
    notes[c.key]=$(`note-${c.key}`).value;
    done[c.key]=document.querySelector(`[data-done="${c.key}"]`).checked;
    const i=document.querySelector(`[data-preview="${c.key}"]`);
    if (i.dataset.data) photos[c.key]={name:i.dataset.name||`${c.key}.jpg`,data:i.dataset.data};
  });
  return {
    version: 1,
    project: 'Year 9 Timber Small Box Project Folio',
    savedAt: new Date().toISOString(),
    student: {
      first: $('studentFirst').value,
      last: $('studentLast').value,
      className: $('studentClass').value,
      date: $('sessionDate').value
    },
    responses,
    notes,
    done,
    photos
  };
}

function setPhoto(key, photo) {
  const image = document.querySelector(`[data-preview="${key}"]`);
  image.src = photo.data;
  image.dataset.data = photo.data;
  image.dataset.name = photo.name || `${key}.jpg`;
  image.style.display = 'block';
}

function apply(payload){
  const s = payload.student || {};
  $('studentFirst').value = s.first || '';
  $('studentLast').value = s.last || '';
  $('studentClass').value = s.className || '';
  $('sessionDate').value = s.date || '';
  CARDS.forEach(c=>{
    $(`response-${c.key}`).value = payload.responses?.[c.key] || '';
    $(`note-${c.key}`).value = payload.notes?.[c.key] || '';
    document.querySelector(`[data-done="${c.key}"]`).checked = !!payload.done?.[c.key];
    if (payload.photos?.[c.key]) setPhoto(c.key, payload.photos[c.key]);
  });
  save(false);
  status('Saved folio restored.');
}

function progress(){
  const x=session();
  const complete = CARDS.filter(c=>x.responses[c.key].trim() && x.notes[c.key].trim()).length;
  $('progressCount').textContent=`${complete} of ${CARDS.length} evidence cards complete`;
  $('progressBar').style.width=`${complete/CARDS.length*100}%`;
}

function save(show=true){
  localStorage.setItem(STORE, JSON.stringify(session()));
  progress();
  if (show) status(`Saved ${new Date().toLocaleTimeString()}.`);
}

function compress(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ()=>{
      const image = new Image();
      image.onerror = reject;
      image.onload = ()=>{
        const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve({
          name: file.name.replace(/\.[^.]+$/, '.jpg'),
          data: canvas.toDataURL('image/jpeg', .82)
        });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function crc(b){let c=-1; for (let v of b) { c ^= v; for (let i=0;i<8;i++) c=(c>>>1)^(0xedb88320 & -(c&1)); } return (c ^ -1) >>> 0;}
function w16(a,o,v){a[o]=v&255;a[o+1]=v>>>8&255;}
function w32(a,o,v){a[o]=v&255;a[o+1]=v>>>8&255;a[o+2]=v>>>16&255;a[o+3]=v>>>24&255;}
function join(parts){let n=parts.reduce((x,y)=>x+y.length,0), out=new Uint8Array(n), offset=0; parts.forEach(p=>{out.set(p,offset);offset += p.length}); return out;}

function zip(files){
  const localHeaders = [];
  const central = [];
  let offset = 0;
  const now = new Date();
  const modTime = now.getHours() << 11 | now.getMinutes() << 5 | Math.floor(now.getSeconds()/2);
  const modDate = (now.getFullYear() - 1980) << 9 | (now.getMonth() + 1) << 5 | now.getDate();

  files.forEach(file => {
    const name = enc.encode(file.name);
    const crcVal = crc(file.bytes);
    const header = new Uint8Array(30 + name.length);
    w32(header, 0, 0x04034b50);
    w16(header, 4, 20);
    w16(header, 10, modTime);
    w16(header, 12, modDate);
    w32(header, 14, crcVal);
    w32(header, 18, file.bytes.length);
    w32(header, 22, file.bytes.length);
    w16(header, 26, name.length);
    header.set(name, 30);
    localHeaders.push(header, file.bytes);

    const cdh = new Uint8Array(46 + name.length);
    w32(cdh, 0, 0x02014b50);
    w16(cdh, 4, 20);
    w16(cdh, 6, 20);
    w16(cdh, 12, modTime);
    w16(cdh, 14, modDate);
    w32(cdh, 16, crcVal);
    w32(cdh, 20, file.bytes.length);
    w32(cdh, 24, file.bytes.length);
    w16(cdh, 28, name.length);
    w32(cdh, 42, offset);
    cdh.set(name, 46);
    central.push(cdh);
    offset += header.length + file.bytes.length;
  });

  const cd = join(central);
  const eocd = new Uint8Array(22);
  w32(eocd, 0, 0x06054b50);
  w16(eocd, 8, files.length);
  w16(eocd, 10, files.length);
  w32(eocd, 12, cd.length);
  w32(eocd, 16, offset);
  return join([...localHeaders, cd, eocd]);
}

function dl(blob, name){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1200);
}

function b64(source){
  const raw = (source || '').split(',')[1] || '';
  const bin = atob(raw);
  return Uint8Array.from(bin, x=>x.charCodeAt(0));
}

function getZip(){
  const x = session();
  const files = [{name:'smallbox-folio-session.json', bytes: enc.encode(JSON.stringify(x, null, 2))}];
  Object.entries(x.photos).forEach(([key, photo]) => {
    files.push({name:`photos/${key}-${photo.name}`.replace(/[^\w./-]/g,'-'), bytes:b64(photo.data)});
  });
  dl(new Blob([zip(files)], {type:'application/zip'}), `${safe(`${x.student.first}-${x.student.last}`)}-smallbox-folio-backup.zip`);
  status('ZIP backup downloaded with answers and photos.');
}

const r16=(bytes, offset)=>bytes[offset]|bytes[offset+1]<<8;
const r32=(bytes, offset)=> (bytes[offset]|bytes[offset+1]<<8|bytes[offset+2]<<16|bytes[offset+3]<<24)>>>0;

async function restore(file){
  try {
    if (file.name.toLowerCase().endsWith('.json')) {
      apply(JSON.parse(await file.text()));
      return;
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    let offset = 0;
    let sessionJson = '';
    while (offset < bytes.length && r32(bytes, offset) === 0x04034b50) {
      const size = r32(bytes, offset + 18);
      const nameLen = r16(bytes, offset + 26);
      const extraLen = r16(bytes, offset + 28);
      const dataStart = offset + 30 + nameLen + extraLen;
      const name = dec.decode(bytes.slice(offset + 30, offset + 30 + nameLen));
      if (r16(bytes, offset + 8) !== 0) throw new Error('Unsupported zip version');
      if (name === 'smallbox-folio-session.json') {
        sessionJson = dec.decode(bytes.slice(dataStart, dataStart + size));
      }
      offset = dataStart + size;
    }
    if (!sessionJson) throw new Error('No Small Box session found');
    apply(JSON.parse(sessionJson));
  } catch {
    status('Could not read that backup. Use a ZIP or JSON downloaded from this folio.');
  }
}

function init(){
  cards();
  $('sessionDate').value = new Date().toISOString().slice(0,10);
  try {
    const saved = localStorage.getItem(STORE);
    if (saved) apply(JSON.parse(saved));
  } catch {
    localStorage.removeItem(STORE);
  }
  progress();

  document.addEventListener('input', event => {
    if (event.target.matches('input,textarea')) save();
  });

  document.addEventListener('change', async event => {
    if (event.target.matches('[data-photo]')) {
      const file = event.target.files[0];
      if (file) {
        setPhoto(event.target.dataset.photo, await compress(file));
        save();
      }
      event.target.value = '';
    } else {
      save();
    }
  });

  $('downloadZip').onclick = getZip;
  $('downloadJson').onclick = () => {
    const x = session();
    dl(new Blob([JSON.stringify(x, null, 2)], {type:'application/json'}), `${safe(`${x.student.first}-${x.student.last}`)}-smallbox-folio-session.json`);
    status('JSON session downloaded.');
  };
  $('restoreSession').onclick = () => $('restoreInput').click();
  $('restoreInput').onchange = e => {
    if (e.target.files[0]) restore(e.target.files[0]);
    e.target.value = '';
  };
  $('printFolio').onclick = () => window.print();
  $('clearFolio').onclick = () => {
    if (confirm('Clear all saved Small Box folio work from this browser?')) {
      localStorage.removeItem(STORE);
      location.reload();
    }
  };
}

document.addEventListener('DOMContentLoaded', init);
