const pptxgen = require('../projects/node_modules/pptxgenjs');
const fs = require('fs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'SKALog · 1반 6조 성유정';
pptx.subject = 'SKALA 학습 지식 공유 서비스 발표';
pptx.title = 'SKALog';
pptx.company = 'SKALA';
pptx.lang = 'ko-KR';
pptx.theme = {
  headFontFace: 'Pretendard', bodyFontFace: 'Pretendard', lang: 'ko-KR'
};
pptx.defineSlideMaster({
  title: 'CONTENT',
  background: { color: 'F8FAF8' },
  objects: [
    { rect: { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: '0F5B45' }, line: { color: '0F5B45' } } },
    { text: { text: 'SKALog', options: { x: 0.52, y: 0.22, w: 1.35, h: 0.3, fontFace: 'Pretendard', fontSize: 12, bold: true, color: '0F5B45', margin: 0 } } },
    { line: { x: 0.52, y: 0.66, w: 12.28, h: 0, line: { color: 'DDE5E0', width: 1 } } },
    { text: { text: 'SKALA AI Campus · Full-stack Engineering', options: { x: 0.52, y: 7.12, w: 4.2, h: 0.16, fontFace: 'Pretendard', fontSize: 7.5, color: '7A8780', margin: 0 } } },
  ],
  slideNumber: { x: 12.28, y: 7.08, w: 0.5, h: 0.2, color: '7A8780', fontFace: 'Pretendard', fontSize: 8, align: 'right', margin: 0 }
});

const C = { green:'0F5B45', deep:'0B3328', mid:'25775D', mint:'E8F3ED', mint2:'D8EBE1', lime:'D7EF65', orange:'F17A42', coral:'FDECE4', ink:'17231E', body:'47554F', muted:'738078', line:'D8E1DC', white:'FFFFFF', bg:'F8FAF8', soft:'F1F5F2', purple:'6555D9', purpleSoft:'ECE9FF', red:'D9534F' };
const A = n => path.join(__dirname, 'assets', `image${n}.png`);
const LOGO = path.join(__dirname, '..', 'projects', 'skalog-logo.png');

function pngSize(p){ const b=fs.readFileSync(p); return {w:b.readUInt32BE(16),h:b.readUInt32BE(20)}; }
function contain(p,x,y,w,h){ const s=pngSize(p), r=Math.min(w/s.w,h/s.h), iw=s.w*r, ih=s.h*r; return {path:p,x:x+(w-iw)/2,y:y+(h-ih)/2,w:iw,h:ih}; }
function cover(p,x,y,w,h){ const s=pngSize(p), sr=s.w/s.h, br=w/h; let sx=0,sy=0,sw=s.w,sh=s.h; if(sr>br){sw=s.h*br;sx=(s.w-sw)/2}else{sh=s.w/br;sy=(s.h-sh)/2} return {path:p,x,y,w,h,sizingCrop:true,crop:{x:sx,y:sy,w:sw,h:sh}}; }
function addCrop(slide,p,x,y,w,h){ const s=pngSize(p), sr=s.w/s.h, br=w/h; let sx=0,sy=0,sw=s.w,sh=s.h; if(sr>br){sw=s.h*br;sx=(s.w-sw)/2}else{sh=s.w/br;sy=(s.h-sh)/2} slide.addImage({path:p,x,y,w,h,sizing:'crop',srcRect:{x:sx/s.w*100,y:sy/s.h*100,w:sw/s.w*100,h:sh/s.h*100}}); }
function tx(slide,text,x,y,w,h,opt={}){ slide.addText(text,{x,y,w,h,fontFace:'Pretendard',fontSize:opt.size||16,color:opt.color||C.ink,bold:!!opt.bold,margin:opt.margin===undefined?0:opt.margin,breakLine: false,fit:'shrink',valign:opt.valign||'mid',align:opt.align||'left',paraSpaceAfterPt:opt.after||0,bullet:opt.bullet,italic:!!opt.italic,isTextBox:true}); }
function title(slide,kicker,headline,sub){ tx(slide,kicker.toUpperCase(),0.62,0.85,2.5,0.22,{size:9,bold:true,color:C.mid}); tx(slide,headline,0.62,1.12,12.05,0.5,{size:27,bold:true,color:C.ink}); if(sub) tx(slide,sub,0.62,1.66,12.0,0.36,{size:13.5,color:C.body}); }
function pill(slide,text,x,y,w,color=C.green,fill=C.mint){ slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h:0.3,rectRadius:0.08,fill:{color:fill},line:{color:fill}}); tx(slide,text,x,y,w,0.3,{size:9,bold:true,color,align:'center'}); }
function card(slide,x,y,w,h,opt={}){ slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:0.1,fill:{color:opt.fill||C.white,transparency:opt.transparency||0},line:{color:opt.line||C.line,width:opt.width||1},shadow:opt.shadow?{type:'outer',color:'A6B4AC',opacity:0.14,blur:2,angle:45,distance:1}:undefined}); }
function dot(slide,x,y,color=C.orange,r=0.09){slide.addShape(pptx.ShapeType.ellipse,{x,y,w:r,h:r,fill:{color},line:{color}})}
function num(slide,n,x,y,color=C.green){ slide.addShape(pptx.ShapeType.ellipse,{x,y,w:0.32,h:0.32,fill:{color},line:{color}}); tx(slide,String(n),x,y,0.32,0.32,{size:10,bold:true,color:C.white,align:'center'}); }
function arrow(slide,x1,y1,x2,y2,color=C.mid){slide.addShape(pptx.ShapeType.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width:1.5,beginArrowType:'none',endArrowType:'triangle'}})}
function imgCard(slide,p,x,y,w,h,label){ card(slide,x,y,w,h,{shadow:true}); slide.addImage(contain(p,x+0.08,y+0.08,w-0.16,h-0.16)); if(label) pill(slide,label,x+0.18,y+0.16,Math.max(0.9,label.length*0.12),C.green,C.white); }
function notes(slide,lines){ if(slide.addNotes) slide.addNotes(lines.map(x=>({text:x}))); }

// 1 Cover
{
 const s=pptx.addSlide(); s.background={color:C.deep};
 s.addShape(pptx.ShapeType.arc,{x:8.9,y:0.55,w:3.75,h:3.75,adjustPoint:0.25,rotate:18,line:{color:'2E755E',transparency:25,width:30},fill:{color:C.deep,transparency:100}});
 s.addShape(pptx.ShapeType.ellipse,{x:10.95,y:5.3,w:1.5,h:1.5,fill:{color:C.lime,transparency:5},line:{color:C.lime,transparency:100}});
 if(fs.existsSync(LOGO)) s.addImage(contain(LOGO,0.75,0.55,2.35,0.78)); else tx(s,'SKALog',0.75,0.55,2.3,0.6,{size:28,bold:true,color:C.white});
 tx(s,'수업이 끝나도,\n지식은 계속 이어지도록',0.78,2.05,8.2,1.6,{size:34,bold:true,color:C.white});
 tx(s,'10개 반의 질문과 답변, 보충 설명과 학습 자료를\n하나의 흐름으로 연결하는 학습 지식 공유 서비스',0.82,3.88,6.7,0.85,{size:17,color:'DCEAE4'});
 pill(s,'WEB SERVICE DESIGN',0.82,5.15,1.75,C.deep,C.lime);
 tx(s,'1반 6조  ·  P016 성유정',0.82,6.72,3.2,0.25,{size:11,color:'BFD5CB'});
 tx(s,'SKALog',9.12,4.28,2.85,0.68,{size:36,bold:true,color:C.white,align:'center'});
 tx(s,'SKALA + Log',9.35,4.98,2.38,0.3,{size:12,color:'C6DED4',align:'center'});
 notes(s,['SKALog는 수업 중 생긴 지식이 수업 종료와 함께 사라지지 않도록 기록하고 공유하는 서비스입니다.']);
}

// 2 Contents
{
 const s=pptx.addSlide('CONTENT'); title(s,'OVERVIEW','오늘 이야기할 네 가지','문제에서 시작해 사용자 경험과 기술 설계까지 연결합니다.');
 const items=[['01','왜 SKALog인가','배경 · Pain Point · 해결 방향'],['02','누가 어떻게 쓰는가','사용자 역할 · 핵심 사용자 여정'],['03','어떻게 구현했는가','데이터 모델 · OAS 기반 Mock API'],['04','어디까지 확장할까','검증 결과 · 개선 로드맵']];
 items.forEach((it,i)=>{const y=2.3+i*1.03; tx(s,it[0],0.75,y,0.7,0.5,{size:24,bold:true,color:i===0?C.orange:C.green}); tx(s,it[1],1.65,y,3.3,0.42,{size:19,bold:true}); tx(s,it[2],5.05,y+0.05,4.6,0.3,{size:13,color:C.body}); s.addShape(pptx.ShapeType.line,{x:9.8,y:y+0.23,w:2.4,h:0,line:{color:i===0?C.orange:C.line,width:i===0?3:1}});});
}

// 3 Background
{
 const s=pptx.addSlide('CONTENT'); title(s,'01 · BACKGROUND','질문은 반복되는데, 답은 흩어져 있었습니다','같은 수업을 듣는 10개 반의 지식이 반과 채널의 경계에서 단절됩니다.');
 imgCard(s,A(3),6.4,2.08,6.2,4.55);
 tx(s,'“저번 반에서 나온 질문,\n우리 반도 볼 수 없을까?”',0.75,2.35,5.05,1.25,{size:25,bold:true,color:C.green});
 const points=[['10개 반','동일 과목을 다른 시간·층에서 수강'],['4개 채널','자료와 공지가 여러 공간에 분산'],['반복 질문','이미 답한 질문이 다른 반에서 다시 발생']];
 points.forEach((p,i)=>{const y=4.05+i*0.72; dot(s,0.83,y+0.13,i===1?C.orange:C.lime,0.11); tx(s,p[0],1.1,y,1.15,0.35,{size:15,bold:true}); tx(s,p[1],2.18,y,3.7,0.35,{size:13,color:C.body});});
}

// 4 Evidence
{
 const s=pptx.addSlide('CONTENT'); title(s,'01 · BACKGROUND','자료의 위치보다 더 큰 문제는 “최신본”이었습니다','찾는 비용과 변경 확인 비용이 동시에 발생했습니다.');
 imgCard(s,A(2),0.72,2.18,3.45,2.03,'분산된 채널'); imgCard(s,A(8),4.48,2.18,4.0,4.25,'변경 공지');
 card(s,8.84,2.18,3.78,4.25,{fill:C.deep,line:C.deep});
 tx(s,'사용자의 실제 질문',9.2,2.55,2.8,0.3,{size:11,bold:true,color:C.lime});
 tx(s,'“어디에 있지?”',9.2,3.15,2.8,0.5,{size:25,bold:true,color:C.white});
 tx(s,'“이게 최신본 맞나?”',9.2,3.92,3.0,0.5,{size:25,bold:true,color:C.white});
 s.addShape(pptx.ShapeType.line,{x:9.2,y:4.75,w:2.9,h:0,line:{color:'477967',width:1}});
 tx(s,'결국 필요한 것은\n파일 보관함이 아니라\n변경 맥락까지 남는 공간',9.2,5.03,2.9,0.93,{size:15,bold:true,color:'DDEBE5'});
}

// 5 Pain -> solution
{
 const s=pptx.addSlide('CONTENT'); title(s,'01 · PAIN POINT','네 가지 단절을, 네 가지 제품 원칙으로 바꿨습니다','교육생과 교수님 모두의 흐름을 동시에 줄이는 방향으로 설계했습니다.');
 const rows=[['자료 분산','과목 중심 통합 아카이브','한 곳에서 검색·열람'],['최신본 혼선','버전 + 변경 내용 관리','무엇이 달라졌는지 즉시 확인'],['질문 반복','전 반 Q&A + 유사 질문','이미 쌓인 답을 재사용'],['공개 범위 복잡','전체 · 층 · 담당 반 선택','배정 정보로 자동 노출']];
 tx(s,'PAIN',0.78,2.13,2.45,0.28,{size:10,bold:true,color:C.orange}); tx(s,'DESIGN PRINCIPLE',4.36,2.13,3.0,0.28,{size:10,bold:true,color:C.green}); tx(s,'USER VALUE',9.05,2.13,2.6,0.28,{size:10,bold:true,color:C.mid});
 rows.forEach((r,i)=>{const y=2.56+i*0.91; card(s,0.72,y,3.0,0.66,{fill:i===0?C.coral:C.white,line:i===0?'F7B89A':C.line}); tx(s,r[0],0.98,y,2.45,0.66,{size:15,bold:true,color:i===0?'B34A20':C.ink}); arrow(s,3.82,y+0.33,4.22,y+0.33,C.mid); card(s,4.32,y,3.98,0.66,{fill:C.mint,line:C.mint2}); tx(s,r[1],4.62,y,3.42,0.66,{size:15,bold:true,color:C.green}); arrow(s,8.4,y+0.33,8.8,y+0.33,C.mid); tx(s,r[2],9.0,y,3.1,0.66,{size:14,color:C.body});});
}

// 6 Actors
{
 const s=pptx.addSlide('CONTENT'); title(s,'01 · ACTORS','권한은 다르지만, 지식은 하나의 공간에 쌓입니다','학생·교수님·관리자의 작업을 역할 기반으로 분리했습니다.');
 const cols=[{x:.72,n:'교육생',tag:'LEARN',c:C.orange,items:['내 반·층 기준 수업과 자료 자동 노출','질문 등록·답변·해결 처리','새 자료 읽음·숨김 상태 관리']},{x:4.58,n:'교수님',tag:'TEACH',c:C.green,items:['담당 과목 질문 우선 확인','전체·층·담당 반으로 공개 범위 선택','학습자료 버전·변경 내용 관리']},{x:8.44,n:'관리자',tag:'OPERATE',c:C.deep,items:['가입 요청·비활성 계정 승인','반별 학생 조회·활성 상태 관리','시간표·과목·교수 배정 관리']}];
 cols.forEach((o,i)=>{card(s,o.x,2.25,3.55,3.95,{fill:i===2?C.deep:C.white,line:i===2?C.deep:C.line,shadow:true}); pill(s,o.tag,o.x+.28,2.54,.88,i===2?C.deep:o.c,i===2?C.lime:C.mint); tx(s,o.n,o.x+.28,3.05,2.7,.42,{size:23,bold:true,color:i===2?C.white:C.ink}); o.items.forEach((t,j)=>{num(s,j+1,o.x+.3,3.75+j*.66,i===0?C.orange:(i===2?'4B8E78':C.green)); tx(s,t,o.x+.75,3.70+j*.66,2.48,.45,{size:12.5,bold:j===0,color:i===2?'E3EEE9':C.body});});});
}

// 7 Login
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · ENTRY','등록 이메일 하나로 역할별 화면에 진입합니다','별도 아이디 없이 이메일·비밀번호로 로그인하고 계정 상태를 즉시 확인합니다.');
 imgCard(s,A(1),6.78,2.0,5.4,4.75);
 const steps=[['01','이메일 로그인','등록 이메일을 로그인 ID로 사용'],['02','상태 확인','승인 대기·비활성 계정은 명확히 안내'],['03','역할 라우팅','교육생·교수님·관리자 화면으로 이동']];
 steps.forEach((p,i)=>{const y=2.28+i*1.2; tx(s,p[0],0.78,y,.55,.35,{size:12,bold:true,color:i===0?C.orange:C.green}); tx(s,p[1],1.45,y,2.05,.35,{size:18,bold:true}); tx(s,p[2],1.45,y+.42,4.45,.42,{size:13,color:C.body}); if(i<2) s.addShape(pptx.ShapeType.line,{x:1.02,y:y+.45,w:0,h:.68,line:{color:C.line,width:1.5,dash:'dash'}});});
 pill(s,'비밀번호 8자 이상',0.78,6.12,1.58,C.green,C.mint);
}

// 8 Signup
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · SIGN UP','가입 유형을 먼저 선택해, 필요한 정보만 받습니다','교육생은 고유번호·반, 교수님은 사번으로 등록 정보를 검증합니다.');
 imgCard(s,A(10),0.72,2.15,4.15,4.25,'교육생'); imgCard(s,A(11),8.45,2.15,4.15,4.25,'교수님');
 card(s,5.14,2.47,3.03,3.48,{fill:C.mint,line:C.mint2});
 tx(s,'공통 검증 흐름',5.48,2.78,2.35,.35,{size:17,bold:true,color:C.green});
 const f=['가입 유형 선택','등록 이메일 인증','명단 정보 대조','승인 또는 검토 대기']; f.forEach((t,i)=>{num(s,i+1,5.48,3.42+i*.55,i===2?C.orange:C.green); tx(s,t,5.92,3.39+i*.55,1.92,.36,{size:12.5,bold:true});});
}

// 9 Admin approval
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · ADMIN','자동 승인과 관리자 검토를 함께 설계했습니다','신규 요청과 기존 비활성 계정을 분리해 운영 실수를 줄입니다.');
 imgCard(s,A(18),0.72,2.02,5.35,4.5,'가입 승인'); imgCard(s,A(5),7.2,2.32,5.4,3.72,'계정 상태');
 arrow(s,6.18,4.1,7.05,4.1,C.orange);
 pill(s,'자동 승인',6.22,3.38,.8,C.green,C.mint);
 tx(s,'이름 · 고유번호/사번 · 이메일이\n등록 정보와 모두 일치하면 즉시 활성화',6.2,4.42,.92,1.1,{size:10.5,bold:true,color:C.body,align:'center'});
}

// 10 Admin course
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · ADMIN','과목 하나에 10개 반의 수업 구조를 완성합니다','과목 코드는 자동 생성하고, 반별 교수 배정을 운영 규칙에 맞게 저장합니다.');
 imgCard(s,A(14),6.35,1.96,6.25,4.72,'과목·시간표');
 const nums=[['10','개 반','각 반 최소 1명'],['2','명 전임','층별 1명'],['8','명 실습','층별 4명']];
 nums.forEach((p,i)=>{const x=.75+i*1.75; tx(s,p[0],x,2.26,1.4,.7,{size:34,bold:true,color:i===0?C.orange:C.green}); tx(s,p[1],x,2.95,1.4,.32,{size:14,bold:true}); tx(s,p[2],x,3.33,1.55,.4,{size:11.5,color:C.body});});
 card(s,.75,4.2,5.1,1.62,{fill:C.deep,line:C.deep});
 tx(s,'4층  1–5반',1.05,4.55,1.7,.35,{size:17,bold:true,color:C.white}); tx(s,'전임 1  +  실습 4',3.2,4.55,2.15,.35,{size:15,bold:true,color:C.lime});
 tx(s,'5층  6–10반',1.05,5.08,1.7,.35,{size:17,bold:true,color:C.white}); tx(s,'전임 1  +  실습 4',3.2,5.08,2.15,.35,{size:15,bold:true,color:C.lime});
}

// 11 Professor home
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · PROFESSOR HOME','교수님에게는 “내가 지금 답해야 할 것”이 먼저 보입니다','담당 업무를 우선 제시하되, 전체 질문에도 기여할 수 있습니다.');
 imgCard(s,A(21),0.72,2.08,7.35,4.65,'교수님 메인'); imgCard(s,A(7),8.35,2.08,4.25,2.15,'질문 필터');
 const cs=[['담당 과목 우선','내 수업을 과목 목록 상단에 배치'],['미해결 우선','답변을 기다리는 질문을 먼저 정렬'],['전체 질문 보기','담당 외 질문에도 답변 가능']];
 cs.forEach((p,i)=>{num(s,i+1,8.45,4.63+i*.56,i===1?C.orange:C.green); tx(s,p[0],8.88,4.57+i*.56,1.15,.34,{size:12.5,bold:true}); tx(s,p[1],10.03,4.57+i*.56,2.37,.42,{size:11.5,color:C.body});});
}

// 12 Student home
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · STUDENT HOME','학생의 오늘과, 놓치면 안 될 변화를 한 화면에 모았습니다','개인 반·층 정보에 맞는 일정과 자료만 노출합니다.');
 imgCard(s,A(27),0.72,2.0,8.25,4.72,'학생 메인');
 const cs=[['개인화','내 층 학습기간과 현재 진행 과목만 표시'],['탐색','전체 과목을 상태·검색으로 빠르게 찾기'],['새 자료','최근 추가 자료를 상단 고정, 확인 시 회색 처리'],['제어','항목별 숨김으로 알림 피로 최소화']];
 cs.forEach((p,i)=>{const y=2.2+i*1.0; card(s,9.3,y,3.25,.78,{fill:i===2?C.coral:C.white,line:i===2?'F5B695':C.line}); tx(s,p[0],9.55,y+.12,.75,.28,{size:11,bold:true,color:i===2?'BC4D21':C.green}); tx(s,p[1],10.3,y+.08,2.0,.53,{size:11.5,bold:true,color:C.body});});
}

// 13 Course detail
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · COURSE','같은 과목도 역할에 따라 필요한 정보의 순서가 다릅니다','학생에게는 최신 흐름, 교수님에게는 미해결 질문을 우선합니다.');
 imgCard(s,A(24),0.72,2.1,5.45,4.45,'교수님'); imgCard(s,A(26),7.18,2.1,5.45,4.45,'교육생');
 arrow(s,6.25,4.25,7.05,4.25,C.orange);
 pill(s,'ROLE BASED',6.18,3.63,.92,C.deep,C.lime);
 tx(s,'수업 배정은\n내 반 교수님만',6.22,4.62,.78,.85,{size:10.5,bold:true,color:C.body,align:'center'});
}

// 14 Q&A detail
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · Q&A','답변의 신뢰도와 질문의 상태를 동시에 보여줍니다','누구나 답변하되 교수님 답변을 먼저 보여주고, 작성자가 해결을 확정합니다.');
 imgCard(s,A(17),6.52,2.0,6.1,4.72,'질문 상세');
 const flow=[['질문 등록','과목 맥락과 함께 게시'],['답변 축적','교수님 답변을 상단 고정'],['해결 처리','질문 작성자가 해결됨으로 변경']];
 flow.forEach((p,i)=>{const y=2.3+i*1.25; num(s,i+1,.78,y,i===2?C.orange:C.green); tx(s,p[0],1.28,y-.05,2.0,.37,{size:18,bold:true}); tx(s,p[1],1.28,y+.38,4.45,.4,{size:13,color:C.body}); if(i<2) arrow(s,.94,y+.55,.94,y+1.03,C.line);});
 pill(s,'교수님 답변 우선',.78,6.1,1.45,C.green,C.mint);
}

// 15 Create question
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · QUESTION CREATE','질문을 쓰는 순간, 이미 존재하는 답을 먼저 연결합니다','중복 질문을 줄이고 기존 지식의 재사용률을 높입니다.');
 imgCard(s,A(13),0.72,2.02,6.3,4.72,'질문 작성');
 card(s,7.4,2.3,5.15,3.95,{fill:C.deep,line:C.deep});
 tx(s,'유사 질문 추천',7.82,2.72,3.5,.4,{size:22,bold:true,color:C.white});
 tx(s,'제목·본문 입력',7.82,3.48,1.55,.35,{size:15,bold:true,color:C.lime}); arrow(s,9.42,3.66,10.0,3.66,'78AA98');
 tx(s,'키워드 기반 탐색',10.12,3.48,1.8,.35,{size:15,bold:true,color:C.lime});
 arrow(s,9.7,4.2,9.7,4.65,'78AA98');
 tx(s,'답이 있으면 바로 확인\n없으면 새 질문 게시',8.28,4.82,2.85,.75,{size:18,bold:true,color:'E5EFEA',align:'center'});
}

// 16 Supplement detail
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · SUPPLEMENT','수업의 빈틈은 짧은 보충 설명으로 다시 연결됩니다','교수님이 맥락을 남기고 학생은 같은 화면에서 질문까지 이어갑니다.');
 imgCard(s,A(9),0.72,2.15,5.45,2.12,'과목 내 보충 설명'); imgCard(s,A(19),6.48,2.15,6.12,4.42,'상세 보기');
 const ps=[['교수님만 작성','담당 과목에서 보충 설명 게시'],['맥락 보존','과목·작성자·공개 범위를 함께 저장'],['질문 연결','이해되지 않는 지점은 즉시 Q&A로 이동']];
 ps.forEach((p,i)=>{num(s,i+1,.82,4.62+i*.58,i===2?C.orange:C.green); tx(s,p[0],1.25,4.56+i*.58,1.15,.34,{size:12.5,bold:true}); tx(s,p[1],2.5,4.56+i*.58,3.35,.42,{size:11.8,color:C.body});});
}

// 17 Scope
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · PUBLISHING','공개 범위는 배정 정보에서 자동으로 제한됩니다','잘못된 반에 자료를 보내지 않도록 선택지를 권한별로 제공합니다.');
 imgCard(s,A(6),0.72,2.13,3.55,3.48,'작성 화면'); imgCard(s,A(12),4.52,2.13,3.72,3.48,'전임 교수님'); imgCard(s,A(4),8.49,2.13,4.11,3.48,'실습 교수님');
 const xs=[.72,4.52,8.49], labs=[['전체 학생','층','담당 반'],['전체 학생','4층','5층'],['전체 학생','담당 층','담당 반']];
 xs.forEach((x,i)=>{labs[i].forEach((t,j)=>pill(s,t,x+j*(i===2?1.23:1.05),5.95,i===2?1.13:.95,j===0?C.orange:C.green,j===0?C.coral:C.mint));});
 tx(s,'노출 판단 = 게시 범위 × 학생의 반·층 정보',3.72,6.55,5.85,.35,{size:15,bold:true,color:C.green,align:'center'});
}

// 18 Materials
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · MATERIALS','파일을 올리는 순간부터 “최신본”을 관리합니다','여러 파일·설명·공개 범위를 묶고, 전임 교수님 자료를 먼저 보여줍니다.');
 imgCard(s,A(15),0.72,2.18,5.32,3.23,'학습 자료 목록'); imgCard(s,A(23),6.35,2.18,6.25,4.4,'새 학습 자료');
 const tags=['여러 파일 업로드','전임 자료 우선','미확인 최신본 강조']; tags.forEach((t,i)=>pill(s,t,.78+i*1.72,5.78,1.55,i===2?C.orange:C.green,i===2?C.coral:C.mint));
 tx(s,'※ 실제 저장은 multipart/form-data 기반 파일 업로드 API로 설계',0.8,6.32,5.3,.35,{size:11.5,color:C.muted});
}

// 19 Version detail
{
 const s=pptx.addSlide('CONTENT'); title(s,'02 · VERSIONING','새 파일이 아니라, 변경의 이력이 남습니다','원 작성자만 새 버전을 올리고 학생은 버전별 파일과 변경 내용을 비교합니다.');
 imgCard(s,A(25),0.72,2.14,2.75,3.45,'자료 상세'); imgCard(s,A(16),3.68,2.14,2.75,2.1,'다운로드'); imgCard(s,A(22),6.65,2.14,2.75,3.45,'버전 목록'); imgCard(s,A(20),9.62,2.14,3.0,2.1,'새 버전');
 const steps=[['v1','최초 자료·파일'],['v2','파일 묶음 + 변경 내용'],['v3','최신본 표시 + 미확인 상태']]; steps.forEach((p,i)=>{const x=2.25+i*3.5; pill(s,p[0],x,6.06,.5,i===2?C.deep:C.green,i===2?C.lime:C.mint); tx(s,p[1],x+.64,6.02,2.25,.36,{size:12.5,bold:true,color:C.body}); if(i<2) arrow(s,x+2.55,6.22,x+3.25,6.22,C.mid);});
}

// 20 Data model
{
 const s=pptx.addSlide('CONTENT'); title(s,'03 · DATA MODEL','화면의 개인화 기준을 데이터 관계로 고정했습니다','사용자·수업 배정·콘텐츠·읽음 상태를 분리해 API가 필요한 모든 상태를 저장합니다.');
 const groups=[{x:.72,w:2.6,t:'IDENTITY',fill:'E9F3EE',nodes:['users','student_profiles','professor_profiles','email_verifications']},{x:3.62,w:3.0,t:'ACADEMIC',fill:'EDF5E3',nodes:['courses','course_schedules','course_assignments','classrooms']},{x:7.02,w:2.55,t:'KNOWLEDGE',fill:'E9F3EE',nodes:['questions','answers','supplements']},{x:9.97,w:2.65,t:'MATERIAL',fill:'FDECE4',nodes:['materials','material_versions','material_files','material_reads']}];
 groups.forEach((g,gi)=>{card(s,g.x,2.23,g.w,3.92,{fill:g.fill,line:gi===3?'F4B595':C.mint2}); tx(s,g.t,g.x+.22,2.48,g.w-.44,.25,{size:10,bold:true,color:gi===3?C.orange:C.green}); g.nodes.forEach((n,i)=>{card(s,g.x+.22,3.0+i*.63,g.w-.44,.45,{fill:C.white,line:C.line}); tx(s,n,g.x+.38,3.0+i*.63,g.w-.76,.45,{size:11.3,bold:true,color:C.ink});});});
 arrow(s,3.33,4.12,3.54,4.12,C.mid); arrow(s,6.64,4.12,6.94,4.12,C.mid); arrow(s,9.59,4.12,9.89,4.12,C.orange);
 pill(s,'15 TABLES',.75,6.42,1.05,C.green,C.mint); pill(s,'FK 기반 참조 무결성',1.95,6.42,1.55,C.green,C.mint); pill(s,'읽음·숨김 상태 포함',3.65,6.42,1.55,C.green,C.mint); pill(s,'버전·파일 1:N',5.35,6.42,1.35,C.orange,C.coral);
 tx(s,'핵심 연결  users → assignments → courses → contents → visibility/read state',7.1,6.37,5.45,.38,{size:12,bold:true,color:C.body,align:'right'});
}

// 21 API
{
 const s=pptx.addSlide('CONTENT'); title(s,'03 · API DESIGN','OAS 하나로 화면·Mock Server·문서를 연결했습니다','요청·응답·예외를 계약으로 고정해 프론트엔드 개발과 백엔드 구현의 간극을 줄였습니다.');
 const metrics=[['33','PATHS'],['40','OPERATIONS'],['51','SCHEMAS']]; metrics.forEach((m,i)=>{const x=.75+i*1.66; tx(s,m[0],x,2.18,1.25,.62,{size:31,bold:true,color:i===1?C.orange:C.green}); tx(s,m[1],x,2.82,1.25,.25,{size:9,bold:true,color:C.muted});});
 card(s,.72,3.35,5.18,2.72,{fill:C.deep,line:C.deep});
 tx(s,'POST /materials/{materialId}/versions',1.05,3.72,4.55,.35,{size:13,bold:true,color:C.lime});
 tx(s,'multipart/form-data',1.05,4.18,2.0,.25,{size:10,bold:true,color:'A8C8BB'});
 tx(s,'files[]  ·  changeSummary  ·  visibility',1.05,4.58,4.2,.33,{size:13,color:C.white});
 tx(s,'201 Created  /  400 · 403 · 404 · 409',1.05,5.25,4.35,.33,{size:12.5,bold:true,color:'D9E8E2'});
 const domains=[['Auth & Users','가입·인증·계정 상태'],['Courses & Assignments','시간표·반별 교수 배정'],['Q&A','질문·답변·해결·유사 질문'],['Supplements & Materials','공개 범위·파일·버전·읽음'],['Admin','승인·활성화·학생 조회']];
 domains.forEach((d,i)=>{const y=2.18+i*.84; card(s,6.28,y,6.32,.63,{fill:i===3?C.coral:C.white,line:i===3?'F4B595':C.line}); tx(s,d[0],6.58,y,2.15,.63,{size:13.2,bold:true,color:i===3?C.orange:C.green}); tx(s,d[1],8.78,y,3.48,.63,{size:12,color:C.body});});
 pill(s,'Swagger UI',9.83,6.48,1.08,C.green,C.mint); pill(s,'OAS Mock Server',11.02,6.48,1.3,C.deep,C.lime);
}

// 22 Closing / roadmap
{
 const s=pptx.addSlide(); s.background={color:C.bg};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:4.35,h:7.5,fill:{color:C.deep},line:{color:C.deep}});
 if(fs.existsSync(LOGO)) s.addImage(contain(LOGO,.62,.55,1.8,.62));
 tx(s,'수업이 끝나도,\n지식은 계속 이어집니다.',.65,2.08,3.15,1.42,{size:26,bold:true,color:C.white});
 tx(s,'SKALog',.65,4.45,2.5,.52,{size:30,bold:true,color:C.lime});
 tx(s,'THANK YOU',.65,6.68,1.65,.25,{size:9,bold:true,color:'9DBBAD'});
 tx(s,'NEXT STEP',4.95,.8,1.5,.25,{size:10,bold:true,color:C.mid});
 tx(s,'화면을 넘어, 실제 운영으로',4.95,1.17,6.9,.5,{size:27,bold:true});
 const roads=[['01','실제 백엔드·스토리지','DB 영속화, 파일 저장소, 다운로드 권한 검증'],['02','실제 메일 인증·보안','인증 메일 발송, 세션 만료, 감사 로그'],['03','지식 검색 고도화','의미 기반 유사 질문 추천과 통합 검색'],['04','운영 지표','미해결 질문 시간, 자료 확인율, 반별 참여도']];
 roads.forEach((r,i)=>{const y=2.02+i*1.06; tx(s,r[0],5.0,y,.48,.34,{size:11,bold:true,color:i===0?C.orange:C.green}); tx(s,r[1],5.62,y,2.2,.34,{size:16,bold:true}); tx(s,r[2],7.9,y,4.55,.42,{size:12.5,color:C.body}); s.addShape(pptx.ShapeType.line,{x:5.62,y:y+.64,w:6.8,h:0,line:{color:C.line,width:1}});});
 card(s,5.0,6.45,7.4,.55,{fill:C.mint,line:C.mint2}); tx(s,'핵심 가치  |  흩어진 정보를 쌓이는 지식으로',5.25,6.45,6.9,.55,{size:14,bold:true,color:C.green,align:'center'});
}

// basic diagnostics
for (const [idx,s] of pptx._slides.entries()) {
  const bad = (s._slideObjects||[]).filter(o => o.options && (o.options.x < 0 || o.options.y < 0 || (o.options.x+o.options.w)>13.34 || (o.options.y+o.options.h)>7.51));
  if (bad.length) console.warn(`Slide ${idx+1}: ${bad.length} out-of-bounds objects`);
}

pptx.writeFile({ fileName: path.join(__dirname, 'SKALog_발표자료.pptx') });
