const KEY = "skala-knowledge-v8";

const initial = {
  users: [
    { id: 1, password: "skala1234", pCode:"P001", email:"haneul@skala.example", name: "김하늘", role: "STUDENT", classNumber: 1, floor: 4, status:"ACTIVE", emailVerified:true },
    { id: 2, password: "skala1234", pCode:"P104", email:"doyun@skala.example", name: "박도윤", role: "STUDENT", classNumber: 4, floor: 4, status:"ACTIVE", emailVerified:true },
    { id: 5, password: "skala1234", pCode:"P206", email:"garam@skala.example", name: "윤가람", role: "STUDENT", classNumber: 6, floor: 5, status:"ACTIVE", emailVerified:true },
    { id: 3, password: "skala1234", employeeNo:"T1001", email:"jeongyeol@skala.example", name: "백정열", role: "PROFESSOR", classNumber: null, floor: null, status:"ACTIVE", emailVerified:true },
    { id: 6, password: "skala1234", employeeNo:"T1002", email:"gyeongnan@skala.example", name:"김경난", role:"PROFESSOR", classNumber:null, floor:null, status:"ACTIVE", emailVerified:true },
    { id: 7, password: "skala1234", employeeNo:"T1003", email:"seongyeol@skala.example", name:"임성열", role:"PROFESSOR", classNumber:null, floor:null, status:"ACTIVE", emailVerified:true },
    { id: 4, password: "skala1234", email:"admin@skala.example", name:"최관리", role:"ADMIN", classNumber:null, floor:null, status:"ACTIVE", emailVerified:true }
  ],
  roster: [
    {pCode:"P001",name:"김하늘",classNumber:1,email:"haneul@skala.example"},
    {pCode:"P104",name:"박도윤",classNumber:4,email:"doyun@skala.example"},
    {pCode:"P206",name:"윤가람",classNumber:6,email:"garam@skala.example"},
    {pCode:"P308",name:"정나래",classNumber:8,email:"narae@skala.example"}
  ],
  staffDirectory: [
    {employeeNo:"T1001",name:"백정열",email:"jeongyeol@skala.example"},
    {employeeNo:"T1002",name:"김경난",email:"gyeongnan@skala.example"},
    {employeeNo:"T1003",name:"임성열",email:"seongyeol@skala.example"},
    {employeeNo:"T1010",name:"이미래",email:"mirae@skala.example"}
  ],
  sessionUserId: null,
  courses: [
    { id: 1, title: "웹 서비스 개발 Mini-Project", code: "WEB-401", description: "서비스 기획에서 UI·API·데이터 모델까지 일관된 웹 서비스를 설계합니다.", phase: "IN_PROGRESS", period: "4층 09.08—09.10 · 5층 09.15—09.17", sessions:[{floor:4,startDate:"2026-09-08",endDate:"2026-09-10"},{floor:5,startDate:"2026-09-15",endDate:"2026-09-17"}], instructors: ["백정열", "김경난", "박보경", "조홍근", "신미영", "이상희", "김성영", "김준범"], color: "orange",
      assignments: [
        { professor:"백정열", kind:"LEAD", floors:[4,5], classes:[1,2,3,4,5,6,7,8,9,10] },
        { professor:"김경난", kind:"PRACTICE", floors:[4,5], classes:[1,10] }, { professor:"박보경", kind:"PRACTICE", floors:[4], classes:[2] },
        { professor:"조홍근", kind:"PRACTICE", floors:[4], classes:[4] }, { professor:"신미영", kind:"PRACTICE", floors:[4,5], classes:[5,7] },
        { professor:"이상희", kind:"PRACTICE", floors:[5], classes:[8] }, { professor:"김성영", kind:"PRACTICE", floors:[5], classes:[8] }, { professor:"김준범", kind:"PRACTICE", floors:[5], classes:[9] }
      ] },
    { id: 2, title: "쿠버네티스 이해 및 애플리케이션 배포", code: "CLD-410", description: "컨테이너 오케스트레이션과 애플리케이션 배포·운영을 학습합니다.", phase: "IN_PROGRESS", period: "5층 09.07—09.08 · 4층 09.18—09.21", sessions:[{floor:5,startDate:"2026-09-07",endDate:"2026-09-08"},{floor:4,startDate:"2026-09-18",endDate:"2026-09-21"}], instructors: ["정윤석", "이용우", "이상희", "박창렴", "정환열", "조재형", "박보경"], color: "blue", assignments:[{professor:"정윤석",kind:"LEAD",floors:[5],classes:[6,7,8,9,10]},{professor:"이용우",kind:"LEAD",floors:[4],classes:[1,2,3,4,5]},{professor:"이상희",kind:"PRACTICE",floors:[4,5],classes:[1,6]},{professor:"박창렴",kind:"PRACTICE",floors:[4,5],classes:[2,7]},{professor:"정환열",kind:"PRACTICE",floors:[5],classes:[8]},{professor:"조재형",kind:"PRACTICE",floors:[4,5],classes:[5,9]},{professor:"박보경",kind:"PRACTICE",floors:[4],classes:[4]}] },
    { id: 3, title: "생성형 AI 서비스 개발 (LangChain)", code: "AI-420", description: "LangChain을 활용해 생성형 AI 서비스의 흐름과 구성요소를 구현합니다.", phase: "UPCOMING", period: "5층 09.09—09.11 · 4층 09.11—09.15", sessions:[{floor:5,startDate:"2026-09-09",endDate:"2026-09-11"},{floor:4,startDate:"2026-09-11",endDate:"2026-09-15"}], instructors: ["이미애", "권기창", "장경희", "박창렴", "김범준", "김영희", "하만석", "박보경"], color: "violet", assignments:[{professor:"이미애",kind:"LEAD",floors:[5],classes:[6,7,8,9,10]},{professor:"권기창",kind:"LEAD",floors:[4],classes:[1,2,3,4,5]},{professor:"장경희",kind:"PRACTICE",floors:[5],classes:[6]},{professor:"박창렴",kind:"PRACTICE",floors:[4,5],classes:[2,7]},{professor:"김범준",kind:"PRACTICE",floors:[4],classes:[3]},{professor:"김영희",kind:"PRACTICE",floors:[4,5],classes:[1,9]},{professor:"하만석",kind:"PRACTICE",floors:[4,5],classes:[4,10]},{professor:"박보경",kind:"PRACTICE",floors:[5],classes:[10]}] },
    { id:4,title:"Spring AI",code:"AI-415",description:"Spring 기반 애플리케이션에 생성형 AI 기능을 연결합니다.",phase:"ENDED",period:"4층 08.28—09.01",sessions:[{floor:4,startDate:"2026-08-28",endDate:"2026-09-01"}],instructors:["이용우","김범준","박창렴","양성호","하만석"],color:"violet",assignments:[] },
    { id:5,title:"Agile 방법론 및 MSA 개발",code:"MSA-310",description:"애자일 협업 방식과 마이크로서비스 설계 원칙을 익힙니다.",phase:"ENDED",period:"5층 08.26—08.27 · 4층 09.02—09.03",sessions:[{floor:5,startDate:"2026-08-26",endDate:"2026-08-27"},{floor:4,startDate:"2026-09-02",endDate:"2026-09-03"}],instructors:["임성열","박보경","박창렴","이상희","김범준"],color:"blue",assignments:[{professor:"임성열",kind:"LEAD",floors:[4,5],classes:[1,2,3,4,5,6,7,8,9,10]}] },
    { id:6,title:"머신러닝 및 딥러닝 이해",code:"AI-330",description:"머신러닝과 딥러닝의 핵심 개념을 실습으로 이해합니다.",phase:"ENDED",period:"5층 09.01—09.03",sessions:[{floor:5,startDate:"2026-09-01",endDate:"2026-09-03"}],instructors:["배기주","김경난","이애본","장경희","김성영"],color:"orange",assignments:[] },
    { id:7,title:"실전 Feature Engineering",code:"DATA-350",description:"모델 성능을 높이기 위한 실전 특성 설계 기법을 학습합니다.",phase:"UPCOMING",period:"5층 09.14",sessions:[{floor:5,startDate:"2026-09-14",endDate:"2026-09-14"}],instructors:["박병선","김성영","신미영","이상희","김경난"],color:"orange",assignments:[] },
    { id:8,title:"RAG Pipeline 설계 및 구축",code:"AI-430",description:"검색 증강 생성 파이프라인을 설계하고 품질을 점검합니다.",phase:"UPCOMING",period:"5층 09.18—09.22",sessions:[{floor:5,startDate:"2026-09-18",endDate:"2026-09-22"}],instructors:["배기주","이미애","장경희","김성영","하만석"],color:"violet",assignments:[] },
    { id:9,title:"LLM과 Transformer 아키텍처",code:"AI-305",description:"Transformer 구조와 LLM의 학습·추론 원리를 이해합니다.",phase:"ENDED",period:"4층 07.23—07.24 · 5층 07.30—07.31",sessions:[{floor:4,startDate:"2026-07-23",endDate:"2026-07-24"},{floor:5,startDate:"2026-07-30",endDate:"2026-07-31"}],instructors:["임성열","박병선","김영희","박창렴","김범준"],color:"violet",assignments:[{professor:"임성열",kind:"LEAD",floors:[4],classes:[1,2,3,4,5]}] }
  ],
  questions: [
    { id: 1, courseId: 1, authorId: 1, title: "UI 흐름도에는 예외 화면도 모두 넣어야 하나요?", body: "정상 흐름 외에 빈 목록과 오류 상태를 별도 화면으로 그려야 하는지, 설명으로 표시해도 되는지 궁금합니다.", status: "OPEN", tags: ["UI 흐름", "와이어프레임"], createdAt: "2026-09-08T01:24:00Z", relatedPostId: null },
    { id: 2, courseId: 1, authorId: 2, title: "OpenAPI 응답 스키마와 DB 컬럼 이름이 달라도 되나요?", body: "API는 camelCase, DB는 snake_case를 쓰고 있는데 문서에서 매핑만 분명하면 괜찮은지 궁금합니다.", status: "RESOLVED", tags: ["OpenAPI", "DBML"], createdAt: "2026-09-08T02:10:00Z", relatedPostId: 3 },
    { id: 3, courseId: 1, authorId: 1, title: "화면별 API 목록은 어느 정도로 상세해야 하나요?", body: "버튼을 눌렀을 때 호출되는 API와 오류 응답까지 화면 설명에 연결해야 할까요?", status: "OPEN", tags: ["API", "설계"], createdAt: "2026-09-08T03:30:00Z", relatedPostId: null },
    { id: 4, courseId: 2, authorId: 2, title: "Pod가 CrashLoopBackOff일 때 확인 순서", body: "로그와 이벤트 중 무엇을 먼저 보고 원인을 좁히는 게 좋은가요?", status: "RESOLVED", tags: ["Kubernetes"], createdAt: "2026-08-18T02:00:00Z", relatedPostId: 4 }
  ],
  answers: [
    { id: 1, questionId: 1, authorId: 2, roleAtCreation: "STUDENT", body: "저희는 정상 흐름 안에 빈 상태를 작게 붙이고, 권한 오류처럼 흐름이 달라지는 경우만 별도 화면으로 정리했어요.", createdAt: "2026-09-08T02:02:00Z" },
    { id: 2, questionId: 1, authorId: 3, roleAtCreation: "PROFESSOR", body: "모든 오류를 독립 화면으로 만들 필요는 없습니다. 다만 사용자의 다음 행동이 달라지는 주요 예외는 와이어프레임이나 주석으로 분명히 보여주세요.", createdAt: "2026-09-08T03:40:00Z" },
    { id: 3, questionId: 2, authorId: 3, roleAtCreation: "PROFESSOR", body: "가능합니다. JSON의 camelCase와 DB의 snake_case를 일관되게 사용하고 변환 규칙을 명세에 한 번 명확히 기록하면 됩니다.", createdAt: "2026-09-08T04:10:00Z" }
  ],
  posts: [
    { id: 1, courseId: 1, authorId: 3, instructorKind:"LEAD", visibility:{scope:"ALL",target:null}, type: "MATERIAL", title: "웹 서비스 설계 Mini-Project 가이드", body: "서비스 정의, UI 흐름, API와 데이터 모델 산출물 작성 가이드", updatedAt: "2026-09-08T00:30:00Z", versions: [
      { id: 101, number: 3, fileName: "web-service-guide-v3.md", size: "284 KB", note: "UI·API·DB 요구사항 추적 예시를 추가했습니다." },
      { id: 102, number: 2, fileName: "web-service-guide-v2.md", size: "251 KB", note: "발표 시간 배분과 제출 체크리스트를 보완했습니다." },
      { id: 103, number: 1, fileName: "web-service-guide-v1.md", size: "218 KB", note: "최초 등록" }
    ]},
    { id: 2, courseId: 1, authorId: 3, instructorKind:"LEAD", visibility:{scope:"FLOOR",target:4}, type: "EXPLANATION", title: "4층 발표 준비 보충 설명", body: "화면 캡처는 기능 나열보다 사용자 흐름이 이어지도록 배치하고, 각 화면에서 사용하는 API를 함께 설명하세요.", updatedAt: "2026-09-08T07:20:00Z" },
    { id: 3, courseId: 1, authorId: 6, instructorKind:"PRACTICE", visibility:{scope:"CLASS",target:1}, type: "MATERIAL", title: "1반 화면설계 점검 체크리스트", body: "오늘 질의응답에서 많이 나온 항목을 기준으로 정리한 체크리스트", updatedAt: "2026-09-08T04:00:00Z", versions: [{ id: 104, number: 1, fileName: "class1-ui-checklist.txt", size: "12 KB", note: "최초 등록" }] },
    { id: 4, courseId: 2, authorId: 3, instructorKind:"LEAD", visibility:{scope:"ALL",target:null}, type: "EXPLANATION", title: "CrashLoopBackOff 디버깅 순서", body: "먼저 kubectl describe로 이벤트를 확인하고, 직전 컨테이너 로그를 조회한 다음 프로브와 리소스 제한을 점검합니다.", updatedAt: "2026-09-07T03:00:00Z" }
    ,{ id: 5, courseId: 5, authorId: 7, instructorKind:"LEAD", visibility:{scope:"ALL",target:null}, type:"MATERIAL", title:"Cloud_Agile 방법론 및 MSA 개발 보충자료", body:"교재, 실습 가이드, 코드 템플릿과 Microservice 실행용 인프라 이미지를 한곳에 모았습니다.", updatedAt:"2026-09-08T06:20:00Z", versions:[{id:105,number:1,fileName:"msa-lecture.zip",size:"1.8 GB",note:"최초 등록",files:[{name:"교재.Cloud_Agile 방법론 및 MSA 개발.pdf",type:"PDF"},{name:"가이드1.Agile_MSA_실습_가이드.pdf",type:"PDF"},{name:"가이드2.코드 템플릿 설명 문서.msa-practice_scenario.pdf",type:"PDF"},{name:"msa-lecture.zip",type:"ZIP"},{name:"msa-lecture-images.part.aa",type:"BIN"},{name:"msa-lecture-images.part.ab",type:"BIN"},{name:"msa-lecture-images.part.ac",type:"BIN"},{name:"docker-compose.local.yml",type:"YAML"}]}] }
    ,{ id: 6, courseId: 9, authorId: 7, instructorKind:"LEAD", visibility:{scope:"ALL",target:null}, type:"EXPLANATION", title:"LLM과 비전 모델은 어떻게 다를까?", body:"판별형·생성형 비전 모델과 LLM의 구조적 차이, 그리고 Physical AI까지 정리한 보충 설명입니다.", sourceFile:"/data/보충자료 예시.txt", updatedAt:"2026-09-08T07:10:00Z" }
    ,{ id: 7, courseId: 5, authorId: 7, instructorKind:"LEAD", visibility:{scope:"ALL",target:null}, type:"EXPLANATION", title:"애자일과 MSA, 왜 함께 배우는 걸까?", body:"그동안 모놀리식 애플리케이션을 중심으로 개발해왔다면 MSA는 단순히 서비스를 잘게 나누는 기술처럼 보일 수 있습니다. 하지만 실제 현장에서는 조직이 빠르게 학습하고 독립적으로 배포하기 위한 운영 방식까지 함께 바뀌어야 합니다. 그래서 MSA는 애자일 방법론과 떼어놓고 이해하기 어렵습니다.\n\n1. 애자일: 작게 만들고 빠르게 검증하는 방식\n애자일의 핵심은 문서를 줄이는 것이 아니라, 큰 요구사항을 작은 단위로 나눠 사용자 피드백을 짧은 주기로 반영하는 것입니다. 백로그를 우선순위화하고 스프린트마다 동작 가능한 결과를 만들며, 회고를 통해 다음 작업 방식을 개선합니다.\n\n2. MSA: 팀이 독립적으로 변경하고 배포할 수 있는 구조\n마이크로서비스는 업무 경계를 기준으로 서비스를 나누고 각 서비스가 자신의 데이터와 배포 주기를 책임지게 합니다. 한 서비스의 변경이 전체 배포로 이어지지 않는 장점이 있지만, API Gateway·인증·서비스 디스커버리·메시징·관측성처럼 분산 시스템의 복잡성이 추가됩니다.\n\n3. 실습 자료를 보는 순서\n먼저 교재로 애자일과 MSA의 목적을 잡고, 가이드1에서 실습 흐름을 확인한 뒤 가이드2의 코드 템플릿 구조를 살펴보세요. 이후 msa-lecture.zip을 실행하고, 분할 이미지 파일(part.aa~ac)은 하나로 합친 뒤 Docker 이미지로 불러옵니다. docker-compose.local.yml은 API Gateway, Auth Server, Eureka, Kafka 등 공통 인프라를 한 번에 준비할 때 사용합니다.\n\n마무리\n애자일은 변화에 대응하는 일의 방식이고, MSA는 그 방식을 기술적으로 뒷받침하는 선택지입니다. 서비스를 많이 나누는 것보다 팀 경계, 데이터 소유권, 독립 배포 필요성을 먼저 확인한 뒤 적절한 크기로 설계하는 것이 중요합니다.", updatedAt:"2026-09-08T08:00:00Z" }
  ],
  reads: { "1:1": 2 },
  noticeReads: {},
  noticeDismissals: {},
  emailVerifications: {}
};

const clone = value => JSON.parse(JSON.stringify(value));
const delay = (value, ms = 90) => new Promise(resolve => setTimeout(() => resolve(clone(value)), ms));
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || clone(initial); } catch { return clone(initial); } };
const save = data => localStorage.setItem(KEY, JSON.stringify(data));
const normalizeFiles = files => (files || []).map(file => ({
  name: file.name,
  size: Number(file.size) || 0,
  type: file.name.includes(".") ? file.name.split(".").pop().toUpperCase() : "FILE",
  mimeType: file.mimeType || (file.type?.includes("/") ? file.type : "application/octet-stream")
}));
const formatFileSize = files => {
  const bytes = files.reduce((sum, file) => sum + file.size, 0);
  if (!bytes) return "metadata only";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};

export const api = {
  async login(email, password) { const d=load(); const normalized=email.trim().toLowerCase();const u=d.users.find(x=>x.email?.toLowerCase()===normalized&&x.password===password); if(!u) throw new Error("이메일 또는 비밀번호를 확인해주세요."); if(u.status==="PENDING")throw new Error("관리자 승인 대기 중인 계정입니다."); if(u.status==="REJECTED"||u.status==="INACTIVE")throw new Error("사용할 수 없는 계정입니다."); d.sessionUserId=u.id; save(d); return delay(u); },
  async requestEmailVerification(email){const d=load(),normalized=email.trim().toLowerCase();if(d.users.some(x=>x.email?.toLowerCase()===normalized))throw new Error("이미 가입된 이메일입니다.");d.emailVerifications[normalized]={code:"123456",expiresAt:Date.now()+300000,attempts:0,token:null};save(d);return delay({expiresInSeconds:300});},
  async confirmEmailVerification(email,code){const d=load(),normalized=email.trim().toLowerCase(),v=d.emailVerifications[normalized];if(!v||v.expiresAt<Date.now())throw new Error("인증번호가 만료됐습니다. 다시 받아주세요.");v.attempts+=1;if(v.attempts>5)throw new Error("인증 시도 횟수를 초과했습니다.");if(v.code!==code)throw new Error("이메일 인증번호를 확인해주세요.");v.token=`email-${Date.now()}-${Math.random().toString(36).slice(2)}`;save(d);return delay({verificationToken:v.token,expiresAt:new Date(v.expiresAt).toISOString()});},
  async register(input){const d=load(),email=input.email.trim().toLowerCase(),verification=d.emailVerifications[email];if(!verification||verification.expiresAt<Date.now()||!verification.token||verification.token!==input.emailVerificationToken)throw new Error("이메일 인증을 다시 진행해주세요.");if(input.password.length<8)throw new Error("비밀번호는 8자 이상이어야 합니다.");if(d.users.some(x=>x.email?.toLowerCase()===email))throw new Error("이미 가입된 이메일입니다.");if(input.role==="STUDENT"&&!/^P\d{3}$/.test(input.pCode))throw new Error("고유번호는 P와 숫자 3자리로 입력해주세요.");if(input.role==="PROFESSOR"&&!/^T\d{4}$/.test(input.employeeNo))throw new Error("사번은 T와 숫자 4자리로 입력해주세요.");const matched=input.role==="STUDENT"?d.roster.some(r=>r.pCode===input.pCode&&r.name===input.name&&r.classNumber===Number(input.classNumber)&&r.email.toLowerCase()===email):d.staffDirectory.some(r=>r.employeeNo===input.employeeNo&&r.name===input.name&&r.email.toLowerCase()===email),id=Math.max(...d.users.map(x=>x.id),0)+1,u={id,...input,email,classNumber:input.role==="STUDENT"?Number(input.classNumber):null,floor:input.role==="STUDENT"?(Number(input.classNumber)<=5?4:5):null,status:matched?"ACTIVE":"PENDING",emailVerified:true};delete u.emailVerificationToken;d.users.push(u);delete d.emailVerifications[email];save(d);return delay({user:u,autoApproved:matched});},
  async logout(){ const d=load(); d.sessionUserId=null; save(d); return delay(true); },
  async me(){ const d=load(); return delay(d.users.find(x=>x.id===d.sessionUserId)||null); },
  async snapshot(){ const d=load(); return delay(d); },
  async createQuestion(input){ const d=load(),u=d.users.find(x=>x.id===d.sessionUserId),c=d.courses.find(x=>x.id===input.courseId); if(!u||u.status!=="ACTIVE"||!c||u.role==="ADMIN")throw new Error("질문을 작성할 수 없습니다.");if(u.role==="PROFESSOR"&&!c.assignments.some(x=>x.professor===u.name))throw new Error("담당 과목에만 질문을 작성할 수 있어요.");const id=Math.max(...d.questions.map(x=>x.id),0)+1; const q={id,authorId:d.sessionUserId,status:"OPEN",createdAt:new Date().toISOString(),tags:["새 질문"],relatedPostId:null,...input}; d.questions.push(q); save(d); return delay(q); },
  async addAnswer(questionId, body){ const d=load(); const u=d.users.find(x=>x.id===d.sessionUserId);if(!u||u.status!=="ACTIVE"||!["STUDENT","PROFESSOR"].includes(u.role)||!d.questions.some(x=>x.id===questionId))throw new Error("답변을 작성할 수 없습니다."); const a={id:Math.max(...d.answers.map(x=>x.id),0)+1,questionId,authorId:u.id,roleAtCreation:u.role,body,createdAt:new Date().toISOString()}; d.answers.push(a); save(d); return delay(a); },
  async toggleResolved(questionId){ const d=load(); const q=d.questions.find(x=>x.id===questionId); if(q.authorId!==d.sessionUserId) throw new Error("질문 작성자만 상태를 변경할 수 있어요."); q.status=q.status==="OPEN"?"RESOLVED":"OPEN"; save(d); return delay(q); },
  async markRead(postId, version){ const d=load(); d.reads[`${d.sessionUserId}:${postId}`]=Math.max(d.reads[`${d.sessionUserId}:${postId}`]||0,version); save(d); return delay(true); },
  async markNoticeRead(postId){const d=load();d.noticeReads[`${d.sessionUserId}:${postId}`]=true;save(d);return delay(true);},
  async dismissNotice(postId){const d=load();d.noticeDismissals[`${d.sessionUserId}:${postId}`]=true;save(d);return delay(true);},
  async addVersion(postId, input){ const d=load(); const u=d.users.find(x=>x.id===d.sessionUserId); const p=d.posts.find(x=>x.id===postId); if(!p||p.type!=="MATERIAL") throw new Error("학습자료를 찾을 수 없어요."); if(!u||u.role!=="PROFESSOR"||p.authorId!==u.id) throw new Error("자료를 올린 교수님만 새 버전을 등록할 수 있어요."); const latest=p.versions[0]?.number||0; if(input.expectedLatestVersion!==latest) throw new Error("다른 새 버전이 먼저 등록됐어요. 화면을 새로고침해주세요."); const files=normalizeFiles(input.files);if(!files.length)throw new Error("새 버전에 포함할 파일을 한 개 이상 선택해주세요.");const v={id:Date.now(),number:latest+1,fileName:files[0].name,files,size:formatFileSize(files),note:input.changeNote}; p.versions.unshift(v);p.updatedAt=new Date().toISOString();save(d);return delay(v); },
  async createPost(input){ const d=load(); const u=d.users.find(x=>x.id===d.sessionUserId); const c=d.courses.find(x=>x.id===input.courseId); if(!u||u.role!=="PROFESSOR") throw new Error("교수님만 글을 작성할 수 있어요."); const assignment=c.assignments.find(x=>x.professor===u.name); if(!assignment) throw new Error("이 과목에 배정된 교수님이 아니에요."); if(input.visibility.scope==="FLOOR"&&!assignment.floors.includes(Number(input.visibility.target))) throw new Error("담당하지 않은 층에는 게시할 수 없어요."); if(input.visibility.scope==="CLASS"&&!assignment.classes.includes(Number(input.visibility.target))) throw new Error("담당하지 않은 반에는 게시할 수 없어요."); const id=Math.max(...d.posts.map(x=>x.id),0)+1,files=normalizeFiles(input.files);if(input.type==="MATERIAL"&&!files.length)throw new Error("학습자료 파일을 한 개 이상 선택해주세요.");const p={id,courseId:input.courseId,authorId:u.id,instructorKind:assignment.kind,updatedAt:new Date().toISOString(),...input,files}; if(input.type==="MATERIAL")p.versions=[{id:Date.now(),number:1,fileName:files[0].name,files,size:formatFileSize(files),note:"최초 등록"}]; d.posts.push(p);save(d);return delay(p); },
  async setUserStatus(userId,status){const d=load(),me=d.users.find(x=>x.id===d.sessionUserId);if(me?.role!=="ADMIN")throw new Error("관리자 권한이 필요합니다.");const u=d.users.find(x=>x.id===userId);if(!u)throw new Error("사용자를 찾을 수 없습니다.");if(u.role==="ADMIN"&&status==="INACTIVE"&&d.users.filter(x=>x.role==="ADMIN"&&x.status==="ACTIVE").length<=1)throw new Error("마지막 활성 관리자는 비활성화할 수 없습니다.");u.status=status;save(d);return delay(u);},
  async saveCourse(input){const d=load(),me=d.users.find(x=>x.id===d.sessionUserId),{id,...fields}=input;if(me?.role!=="ADMIN")throw new Error("관리자 권한이 필요합니다.");let c;if(id){c=d.courses.find(x=>x.id===id);Object.assign(c,fields)}else{const nextId=Math.max(...d.courses.map(x=>x.id),0)+1;c={id:nextId,code:`COURSE-${String(nextId).padStart(3,"0")}`,description:"",color:"blue",phase:"UPCOMING",instructors:[],assignments:[],...fields};d.courses.push(c)}save(d);return delay(c);},
  async saveAssignment(courseId,input){const d=load(),me=d.users.find(x=>x.id===d.sessionUserId);if(me?.role!=="ADMIN")throw new Error("관리자 권한이 필요합니다.");const c=d.courses.find(x=>x.id===courseId);if(!c)throw new Error("과목을 찾을 수 없습니다.");const existing=c.assignments.find(x=>x.professor===input.professor);if(existing)Object.assign(existing,input);else c.assignments.push(input);c.instructors=[...new Set(c.assignments.map(x=>x.professor))];save(d);return delay(c);},
  async replaceTeachingAssignments(courseId,{assignments}){const d=load(),me=d.users.find(x=>x.id===d.sessionUserId);if(me?.role!=="ADMIN")throw new Error("관리자 권한이 필요합니다.");if(assignments.length!==10||![1,2,3,4,5,6,7,8,9,10].every(n=>assignments.filter(x=>x.classNumber===n&&x.professor).length===1))throw new Error("1~10반에 교수님을 한 분씩 지정해주세요.");if(new Set(assignments.map(x=>x.professor)).size!==10)throw new Error("한 교수님은 한 반에만 배정할 수 있어요.");if(assignments.some(x=>!["LEAD","PRACTICE"].includes(x.instructorKind)))throw new Error("교수님 유형을 확인해주세요.");const floor4=assignments.filter(x=>x.classNumber<=5),floor5=assignments.filter(x=>x.classNumber>=6);if(floor4.filter(x=>x.instructorKind==="LEAD").length!==1||floor5.filter(x=>x.instructorKind==="LEAD").length!==1)throw new Error("4층과 5층에서 전임 교수님을 각 한 분만 지정해주세요.");const c=d.courses.find(x=>x.id===courseId);if(!c)throw new Error("과목을 찾을 수 없습니다.");c.assignments=assignments.map(x=>({professor:x.professor,kind:x.instructorKind,floors:[x.classNumber<=5?4:5],classes:[x.classNumber]}));c.instructors=assignments.map(x=>x.professor);save(d);return delay(c);},
  async reset(){ localStorage.setItem(KEY,JSON.stringify(initial)); return delay(true); }
};
