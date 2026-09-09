const fs = require('fs');
const path = require('path');
const src = process.argv[2];
const out = process.argv[3];
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(path.dirname(src))) {
  if (f !== 'Preview.html') fs.copyFileSync(path.join(path.dirname(src), f), path.join(out, f));
}
const html = fs.readFileSync(src, 'utf8');
for (let i = 0; i < 22; i++) {
  const script = `<script>document.querySelectorAll('div.slide').forEach((e,j)=>{if(j!==${i})e.style.display='none';});document.body.style.margin='0';document.body.style.background='#fff';</script>`;
  fs.writeFileSync(path.join(out, `slide-${String(i+1).padStart(2,'0')}.html`), html.replace('</body>', script + '</body>'));
}
