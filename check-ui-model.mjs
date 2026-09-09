import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import YAML from 'yaml';
const require=createRequire(import.meta.url);
const root=new URL('../',import.meta.url),file=p=>new URL(p,root);
const source=fs.readFileSync(file('SKALA교육플랫폼-DB.dbml'),'utf8');
const model={};let table;
for(const line of source.split('\n')){const start=line.match(/^Table (\w+) \{/);if(start){table=model[start[1]]=[];continue}if(line==='}')table=null;const column=line.match(/^  (\w+) ([\w]+(?:\(\d+\))?)/);if(table&&column&&column[1]!=='Note')table.push(column[1])}
assert.equal(Object.keys(model).length,11);assert.equal(Object.values(model).flat().length,60);
assert(!/Table (?:auth_sessions|email_verifications|registration_directory|material_reads) \{/.test(source));
for(const m of source.matchAll(/^Ref: (\w+)\.(\w+) > (\w+)\.(\w+)/gm)){assert(model[m[1]]?.includes(m[2]));assert(model[m[3]]?.includes(m[4]))}
const spec=YAML.parse(fs.readFileSync(file('SKALA교육플랫폼-API.yml'),'utf8'));
assert.equal(fs.readFileSync(file('projects/SKALA_학습지식공유-API.yml'),'utf8'),fs.readFileSync(file('SKALA교육플랫폼-API.yml'),'utf8'));
const operations=[];const check=v=>{if(!v||typeof v!=='object')return;if(v.$ref){assert(v.$ref.startsWith('#/'));let target=spec;for(const key of v.$ref.slice(2).split('/'))target=target?.[key];assert(target,'Unresolved '+v.$ref)}if(v.required&&v.properties)for(const key of v.required)assert(key in v.properties,'Required missing '+key);Object.values(v).forEach(check)};check(spec);
for(const [path,route]of Object.entries(spec.paths))for(const method of ['get','post','patch','put','delete'])if(route[method]){const op=route[method];operations.push(op);const params=[...(route.parameters||[]),...(op.parameters||[])];for(const m of path.matchAll(/\{(\w+)\}/g))assert(params.some(p=>p.name===m[1]&&p.in==='path'&&p.required));assert(Object.keys(op.responses).some(c=>/^2/.test(c)))}
assert.equal(operations.length,24);assert.equal(new Set(operations.map(o=>o.operationId)).size,24);
const {getHttpOperationsFromSpec}=require('@stoplight/prism-http');const parsed=await getHttpOperationsFromSpec(decodeURIComponent(file('SKALA교육플랫폼-API.yml').pathname));assert.equal(parsed.length,24);
const store=new Map();globalThis.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
const {api}=await import('./mockApi.js');await api.reset();
const signup={role:'STUDENT',name:'간소화 검증',email:'simple-check@skala.example',password:'skala1234',pCode:'P999',classNumber:2};
const registered=await api.register({...signup,status:'ACTIVE'});assert.equal(registered.status,'PENDING');assert(!('password'in registered));
await assert.rejects(api.login(signup.email,signup.password),/승인 대기/);
await assert.rejects(api.register({...signup,email:'duplicate@skala.example'}),/이미 가입/);
await assert.rejects(api.register({...signup,role:'ADMIN',email:'invalid@skala.example'}),/가입 유형/);
await api.login('admin@skala.example','skala1234');await api.setUserStatus(registered.id,'ACTIVE');await api.logout();
await api.login(signup.email,signup.password);
const question=await api.createQuestion({courseId:1,title:'간소화 질문',body:'기존 화면을 유지합니다.'});assert.equal(question.status,'OPEN');assert(!('relatedPostId'in question));
const answer=await api.addAnswer(question.id,'이메일 인증 없이 관리자 승인 후 사용할 수 있어요.');assert(!('roleAtCreation'in answer));
await api.toggleResolved(question.id);assert.equal((await api.snapshot()).questions.find(q=>q.id===question.id).status,'RESOLVED');
await api.updatePostState(1,{isRead:true});await api.updatePostState(1,{lastSeenVersionId:101});await api.updatePostState(1,{isDismissed:true});
let state=(await api.snapshot()).postUserStates[`${registered.id}:1`];assert.deepEqual(state,{postId:1,lastSeenVersionId:101,isRead:true,isDismissed:true});
await api.updatePostState(1,{lastSeenVersionId:102});assert.equal((await api.snapshot()).postUserStates[`${registered.id}:1`].lastSeenVersionId,101);
await assert.rejects(api.updatePostState(1,{lastSeenVersionId:104}),/이 자료/);
await assert.rejects(api.updatePostState(3,{isRead:true}),/공개 대상/);
await api.login('jeongyeol@skala.example','skala1234');const version=await api.addVersion(1,{files:[{name:'v4.txt',size:12}],changeNote:'UI 검증'});assert.equal(version.number,4);
await api.login(signup.email,signup.password);assert.equal((await api.updatePostState(1,{isRead:true})).hasUnseenVersion,true);
await api.login('admin@skala.example','skala1234');
let data=await api.snapshot();const profs=data.users.filter(u=>u.role==='PROFESSOR'&&u.status==='ACTIVE').slice(0,10);
const assignments=profs.map((p,i)=>({classNumber:i+1,professorId:p.id,instructorKind:i===0||i===5?'LEAD':'PRACTICE'}));
const input={title:'간소화 과목',sessions:[{floor:4,startDate:'2026-09-01',endDate:'2026-09-10'},{floor:5,startDate:'2026-09-11',endDate:'2026-09-20'}],assignments};
await assert.rejects(api.saveCourse({...input,assignments:assignments.slice(0,9)}));assert.equal((await api.snapshot()).courses.length,data.courses.length,'Invalid assignment must not create a partial course');
const saved=await api.saveCourse(input);assert.equal(saved.assignments.length,10);const before=JSON.stringify(saved);
await assert.rejects(api.saveCourse({...input,id:saved.id,title:'실패해야 함',sessions:[...input.sessions.slice(0,1),{floor:5,startDate:'2026-09-21',endDate:'2026-09-20'}]}));assert.equal(JSON.stringify((await api.snapshot()).courses.find(c=>c.id===saved.id)),before);
await api.setUserStatus(registered.id,'INACTIVE');await assert.rejects(api.login(signup.email,signup.password),/사용할 수 없는/);
// Migration retains old user work and converts independent read/notice state once.
const migrated=await api.snapshot();store.delete('skala-knowledge-v9-ui');delete migrated.postUserStates;migrated.reads={'1:1':2};migrated.noticeReads={'1:1':true};migrated.noticeDismissals={'1:1':true};migrated.emailVerifications={};store.set('skala-knowledge-v8',JSON.stringify(migrated));
const legacy=await api.snapshot();assert.equal(legacy.postUserStates['1:1'].lastSeenVersionId,102);assert(legacy.postUserStates['1:1'].isRead&&legacy.postUserStates['1:1'].isDismissed);assert(!('emailVerifications'in legacy));assert(legacy.courses.some(c=>c.id===saved.id));
console.log('PASS: 11 tables / 60 columns; 24 API operations loaded by Prism; signup→approval→login; Q&A; independent read/notice state; version update; atomic course save; legacy state migration.');
