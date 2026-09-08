const KEY = "skala-knowledge-v1";

const initial = {
  users: [
    { id: 1, loginId: "student1", password: "1234", name: "김하늘", role: "STUDENT", classNumber: 1 },
    { id: 2, loginId: "student4", password: "1234", name: "박도윤", role: "STUDENT", classNumber: 4 },
    { id: 3, loginId: "professor", password: "1234", name: "이서준", role: "PROFESSOR", classNumber: null },
    { id: 4, loginId: "admin", password: "1234", name: "최관리", role: "ADMIN", classNumber: null }
  ],
  sessionUserId: null,
  courses: [
    { id: 1, title: "생성형 AI와 LLM", code: "AI-401", description: "생성형 AI의 원리부터 RAG·파인튜닝까지 함께 탐구합니다.", phase: "IN_PROGRESS", period: "08.24 — 09.18", instructors: ["이서준", "정유진"], color: "violet" },
    { id: 2, title: "클라우드 네이티브", code: "CLD-210", description: "컨테이너, Kubernetes와 MSA 운영 패턴을 학습합니다.", phase: "ENDED", period: "07.28 — 08.21", instructors: ["한지우"], color: "blue" },
    { id: 3, title: "AI 웹 서비스 설계", code: "WEB-307", description: "서비스 기획에서 API·데이터 모델까지 일관된 설계를 만듭니다.", phase: "UPCOMING", period: "09.21 — 10.02", instructors: ["이서준"], color: "orange" }
  ],
  questions: [
    { id: 1, courseId: 1, authorId: 1, title: "LoRA에서 rank 값은 어떻게 정하면 좋을까요?", body: "rank를 높일수록 항상 성능이 좋아지는지, 실습에서는 어떤 기준으로 시작하면 좋을지 궁금합니다.", status: "OPEN", tags: ["LoRA", "파인튜닝"], createdAt: "2026-09-08T01:24:00Z", relatedPostId: null },
    { id: 2, courseId: 1, authorId: 2, title: "RAG 검색 결과가 자꾸 엉뚱하게 나옵니다", body: "chunk size와 overlap을 바꿔도 관련 없는 문서가 검색됩니다. 임베딩 모델부터 확인해야 할까요?", status: "RESOLVED", tags: ["RAG", "검색"], createdAt: "2026-09-07T05:10:00Z", relatedPostId: 3 },
    { id: 3, courseId: 1, authorId: 1, title: "프롬프트 캐싱은 어떤 상황에서 효과적인가요?", body: "반복 요청이 많은 경우 비용과 응답 시간이 실제로 얼마나 줄어드는지 궁금합니다.", status: "OPEN", tags: ["프롬프트"], createdAt: "2026-09-06T06:30:00Z", relatedPostId: null },
    { id: 4, courseId: 2, authorId: 2, title: "Pod가 CrashLoopBackOff일 때 확인 순서", body: "로그와 이벤트 중 무엇을 먼저 보고 원인을 좁히는 게 좋은가요?", status: "RESOLVED", tags: ["Kubernetes"], createdAt: "2026-08-18T02:00:00Z", relatedPostId: 4 }
  ],
  answers: [
    { id: 1, questionId: 1, authorId: 2, roleAtCreation: "STUDENT", body: "저는 8부터 시작해서 검증 손실을 보고 16으로 올렸어요. 데이터가 작을 때는 높은 rank가 과적합되기도 했습니다.", createdAt: "2026-09-08T02:02:00Z" },
    { id: 2, questionId: 1, authorId: 3, roleAtCreation: "PROFESSOR", body: "좋은 질문입니다. rank는 표현력과 학습 비용의 균형입니다. 실습 규모라면 8 또는 16에서 시작하고, 동일 조건에서 검증 지표를 비교해 결정하세요.", createdAt: "2026-09-08T03:40:00Z" },
    { id: 3, questionId: 2, authorId: 3, roleAtCreation: "PROFESSOR", body: "먼저 검색 결과 상위 문서의 원문과 질문 표현을 비교하세요. 그 다음 chunk 경계, 임베딩 모델 순서로 범위를 좁히면 됩니다.", createdAt: "2026-09-07T06:10:00Z" }
  ],
  posts: [
    { id: 1, courseId: 1, authorId: 3, type: "MATERIAL", title: "LoRA 파인튜닝 실습 가이드", body: "실습 환경 설정과 학습 파라미터 해설", updatedAt: "2026-09-08T00:30:00Z", versions: [
      { id: 101, number: 3, fileName: "lora-lab-v3.md", size: "284 KB", note: "학습률 권장 범위와 트러블슈팅 예시를 추가했습니다." },
      { id: 102, number: 2, fileName: "lora-lab-v2.md", size: "251 KB", note: "Apple Silicon 환경 설정을 보완했습니다." },
      { id: 103, number: 1, fileName: "lora-lab-v1.md", size: "218 KB", note: "최초 등록" }
    ]},
    { id: 2, courseId: 1, authorId: 3, type: "EXPLANATION", title: "어텐션을 직관적으로 이해하는 세 가지 관점", body: "어텐션은 입력의 모든 부분을 똑같이 보지 않고, 현재 출력에 필요한 정보에 가중치를 주는 과정입니다. Query는 지금 찾고 싶은 것, Key는 각 정보의 표지, Value는 실제 내용으로 생각해볼 수 있습니다.", updatedAt: "2026-09-07T07:20:00Z" },
    { id: 3, courseId: 1, authorId: 3, type: "MATERIAL", title: "RAG 품질 점검 체크리스트", body: "검색 품질을 단계별로 확인하는 체크리스트", updatedAt: "2026-09-06T04:00:00Z", versions: [{ id: 104, number: 1, fileName: "rag-checklist.txt", size: "12 KB", note: "최초 등록" }] },
    { id: 4, courseId: 2, authorId: 3, type: "EXPLANATION", title: "CrashLoopBackOff 디버깅 순서", body: "먼저 kubectl describe로 이벤트를 확인하고, 직전 컨테이너 로그를 조회한 다음 프로브와 리소스 제한을 점검합니다.", updatedAt: "2026-08-17T03:00:00Z" }
  ],
  reads: { "1:1": 2 }
};

const clone = value => JSON.parse(JSON.stringify(value));
const delay = (value, ms = 90) => new Promise(resolve => setTimeout(() => resolve(clone(value)), ms));
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || clone(initial); } catch { return clone(initial); } };
const save = data => localStorage.setItem(KEY, JSON.stringify(data));

export const api = {
  async login(loginId, password) { const d=load(); const u=d.users.find(x=>x.loginId===loginId&&x.password===password); if(!u) throw new Error("아이디 또는 비밀번호를 확인해주세요."); d.sessionUserId=u.id; save(d); return delay(u); },
  async logout(){ const d=load(); d.sessionUserId=null; save(d); return delay(true); },
  async me(){ const d=load(); return delay(d.users.find(x=>x.id===d.sessionUserId)||null); },
  async snapshot(){ const d=load(); return delay(d); },
  async createQuestion(input){ const d=load(); const id=Math.max(...d.questions.map(x=>x.id),0)+1; const q={id,authorId:d.sessionUserId,status:"OPEN",createdAt:new Date().toISOString(),tags:["새 질문"],relatedPostId:null,...input}; d.questions.push(q); save(d); return delay(q); },
  async addAnswer(questionId, body){ const d=load(); const u=d.users.find(x=>x.id===d.sessionUserId); const a={id:Math.max(...d.answers.map(x=>x.id),0)+1,questionId,authorId:u.id,roleAtCreation:u.role,body,createdAt:new Date().toISOString()}; d.answers.push(a); save(d); return delay(a); },
  async toggleResolved(questionId){ const d=load(); const q=d.questions.find(x=>x.id===questionId); if(q.authorId!==d.sessionUserId) throw new Error("질문 작성자만 상태를 변경할 수 있어요."); q.status=q.status==="OPEN"?"RESOLVED":"OPEN"; save(d); return delay(q); },
  async markRead(postId, version){ const d=load(); d.reads[`${d.sessionUserId}:${postId}`]=Math.max(d.reads[`${d.sessionUserId}:${postId}`]||0,version); save(d); return delay(true); },
  async reset(){ localStorage.setItem(KEY,JSON.stringify(initial)); return delay(true); }
};
