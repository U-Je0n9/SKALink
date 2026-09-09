const fs=require('node:fs');
(async()=>{
 const pages=await (await fetch('http://127.0.0.1:9334/json')).json();
 const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
 let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}};
 const call=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 const run=async expression=>{const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
 await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:1800,height:1100,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'file:///Users/yjsung/Desktop/SKALA/0908_AI_web_service/presentation/SKALog-ERD.html'});
 for(let i=0;i<30;i++){if(await run("document.querySelectorAll('.entity').length===11"))break;await new Promise(r=>setTimeout(r,100))}
 const audit=await run(`(()=>{const bad=[];for(const el of document.querySelectorAll('.field')){const texts=[...el.querySelectorAll('text')];for(let i=0;i<texts.length-1;i++){const a=texts[i].getBBox(),b=texts[i+1].getBBox();if(a.width&&b.width&&a.x+a.width>b.x-2)bad.push(el.dataset.column+': text overlap')}}
 const hits=[];for(const edge of document.querySelectorAll('.edge')){const p=edge.querySelector('.wire').getAttribute('points').split(' ').map(s=>s.split(',').map(Number));for(let i=1;i<p.length;i++){const [a,b]=[p[i-1],p[i]];for(const t of Object.values(schema)){const inside=a[0]===b[0]?a[0]>t.x&&a[0]<t.x+TW&&Math.max(a[1],b[1])>t.y&&Math.min(a[1],b[1])<t.y+t.h:a[1]>t.y&&a[1]<t.y+t.h&&Math.max(a[0],b[0])>t.x&&Math.min(a[0],b[0])<t.x+TW;if(inside)hits.push(edge.dataset.ref+' crosses '+t.name)}}}highlight('users');const highlighted=document.querySelectorAll('.edge.selected').length;highlight();return {tables:document.querySelectorAll('.entity').length,fields:document.querySelectorAll('.field').length,edges:document.querySelectorAll('.edge').length,textOverlaps:bad,edgeTableCrossings:hits,userRelationsHighlighted:highlighted}})()`);
 console.log(JSON.stringify(audit,null,2));if(audit.textOverlaps.length||audit.edgeTableCrossings.length)throw Error('Layout audit failed');
 const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('/private/tmp/skalog-erd-complete-screen.png',Buffer.from(shot.data,'base64'));
 const png=await run(`(async()=>{await document.fonts.ready;const u=URL.createObjectURL(svgBlob()),im=new Image;await new Promise((r,j)=>{im.onload=r;im.onerror=j;im.src=u});const c=document.createElement('canvas');c.width=W;c.height=H;c.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(u);return c.toDataURL('image/png').split(',')[1]})()`);
 fs.writeFileSync(__dirname+'/erd-exports/SKALog-ERD-complete.png',Buffer.from(png,'base64'));
 console.log('Full PNG exported; SVG rasterization passed.');await call('Browser.close');ws.close();
})().catch(e=>{console.error(e);process.exit(1)});
