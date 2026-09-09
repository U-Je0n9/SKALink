# SKALog — UI 기준 간소화 버전

과목별 질문·답변, 교수님 보충 설명, 학습자료·버전을 공유하는 프론트엔드 데모입니다.

## 실행

```bash
cd projects
npm install
npm run dev
```

- 서비스: http://localhost:4173
- Swagger: http://localhost:4173/swagger
- API: http://localhost:4173/api

## 데모 계정

모든 데모 계정 비밀번호는 `skala1234`입니다. 별도 아이디 없이 등록 이메일로 로그인합니다.

| 역할 | 계정 | 설명 |
|---|---|---|
| 교육생 | `haneul@skala.example` | 4층 1반 |
| 교육생 | `doyun@skala.example` | 4층 4반 |
| 교육생 | `garam@skala.example` | 5층 6반 |
| 전임 교수님 | `jeongyeol@skala.example` | 백정열 |
| 실습 교수님 | `gyeongnan@skala.example` | 김경난 |
| 전임 교수님 | `seongyeol@skala.example` | 임성열 |
| 관리자 | `admin@skala.example` | 관리자 콘솔 접근 |

회원가입은 이메일 인증 없이 정보를 입력하고 관리자 승인을 받습니다. `P308 / 정나래 / 8반 / narae@skala.example` 등 새 계정도 모두 PENDING으로 접수됩니다. 관리자 계정에서 승인 후 로그인합니다.

## 현재 설계

**11개 테이블 · 60개 컬럼 · 15개 FK · 24개 API 작업(22개 경로) · 29개 스키마**입니다.

[UI·DB·API 대응표](../UI기준-DB-API-간소화.md), [DBML](../SKALA교육플랫폼-DB.dbml), [API](./SKALA_학습지식공유-API.yml), [HTML ERD](../presentation/SKALog-ERD.html), [발표용 API 목록](../presentation/SKALog-API.html)을 함께 사용합니다. 루트 API와 프로젝트 API는 동일하게 동기화합니다.

질문·답변, 과목·층별 일정·교수 배정, 자료 버전·다중 파일, 공개 범위, 개인별 읽음·숨김·확인 상태를 유지합니다. 이메일 인증·자동 승인·감사 기록·낙관적 잠금·미사용 수정 API를 제거했습니다. 과목 저장은 일정과 배정을 함께 검증하고 한 번에 반영합니다.

## 검증

```bash
node check-ui-model.mjs
node ../presentation/build_erd.cjs
```

DB 수·FK·API 참조·Prism 로딩과 가입 승인/로그인/질문/답변/자료 상태/원자적 과목 저장/기존 데모 데이터 변환을 검사합니다. 브라우저 검증 스크립트 `presentation/check-simplified-browser.cjs`는 로컬 Chrome 디버깅 포트 9334와 서비스 4173을 사용합니다.

## 목 구현 범위

브라우저 화면은 `mockApi.js`의 localStorage 데이터와 서비스 함수를 사용합니다. Swagger Try it out은 `SKALA_학습지식공유-API.yml`에서 Prism이 생성한 무상태 목 응답을 받습니다. 프론트 목 구조는 화면용 객체이며 정규화된 DB의 물리 구조와 같지는 않습니다.

실제 파일 Blob은 저장하지 않고 파일명·크기 등 메타데이터만 유지합니다. 모두 다운로드 버튼은 데모 안내를 표시하며 OAS에는 다운로드 계약이 있습니다. 유사 질문은 제목 단어 비교 데모입니다. 데모 비밀번호와 세션은 실제 인증 구현이 아닙니다. 기존 v8 localStorage 데이터는 새 버전에서 기존 사용자 작업을 유지하며 변환합니다.

이전 자료는 `../archive/pre-ui-simplification-20260909/`에 보관했습니다.
