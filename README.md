# Portfolio Universe

인터랙티브 포트폴리오 사이트입니다.
태양계를 모티브로 한 3D 우주에서 행성을 선택해 경력, 기술, 프로젝트, 아키텍처를 탐험합니다.

## 소개

단순한 정적 이력서 페이지가 아니라, **스크롤이 아닌 행성 탐험**으로 콘텐츠를 탐색하는 포트폴리오입니다.

- React Three Fiber로 구현한 3D 태양계 씬
- 행성 클릭 / 키보드 탐색으로 섹션 이동
- Framer Motion 기반 패널 UI 전환
- Firebase 방명록, 프로젝트 갤러리 등 인터랙션 포함

컨셉: **Journey through my Frontend Universe**

## 주요 기능

### 3D Universe
- 태양과 행성 GLB 모델, 궤도선, 스파클/스타필드
- 행성별 공전·자전 속도 및 자전축 설정
- 행성 드래그로 제자리 회전, 궤도 드래그로 공전 위상 조절
- 행성 선택 시 카메라 포커싱 및 콘텐츠 패널 오픈
- Suspense 로딩 후 scale / fade intro 연출

### 콘텐츠 패널
| 행성 | 내용 |
|------|------|
| About | 자기소개, 커리어 지표 |
| Career | 경력 타임라인 |
| Skills | 기술 스택 선택형 카드 |
| Projects | Role / Key Features / Contributions / Stack |
| Architecture | Monorepo, HLS, Payment, CI/CD 플로우 |
| Gallery | 프로젝트별 스크린샷 목록 + 확대 모달 |
| Contact | 연락처 |
| Guestbook | Firebase 기반 방명록 |

### 인터랙션 / UX
- URL 해시 기반 섹션 상태 (`#about`, `#projects` …)
- `←` `→` 패널 이동, `ESC` 우주 맵 복귀
- `prefers-reduced-motion` 대응
- 하단 행성 내비게이션

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| 3D | Three.js, React Three Fiber, Drei |
| UI / Motion | Tailwind CSS, Framer Motion, GSAP |
| Data | TanStack Query, Firebase |
| Deploy | Cloudtype, GitHub Actions |

## 시작하기

```bash
# 의존성 설치
yarn

# 개발 서버
yarn dev

# 프로덕션 빌드
yarn build
yarn start
```

### 환경 변수

`.env`에 Firebase 등 공개용 키를 설정합니다.

```bash
NEXT_PUBLIC_API_KEY=your_firebase_api_key
```

Cloudtype 배포 시 GitHub Secrets의 `NEXT_PUBLIC_API_KEY`가 주입됩니다.

## 프로젝트 구조

```text
app/                  # Next.js App Router, API routes
components/
  planet/             # 태양, 행성, 궤도, Universe 씬
  panel/              # 섹션별 콘텐츠 패널
  BasicThreeScene.tsx # Canvas / 로딩 / 배경
  PortfolioExperience.tsx
config/
  portfolio-data.ts   # 포트폴리오 콘텐츠 소스
  orbit.ts            # 궤도 계산
firebase/             # Firebase 연결 및 방명록
public/
  gallery/            # 프로젝트 스크린샷
  *.glb               # 행성 / 태양 모델
```

콘텐츠 수정은 주로 `config/portfolio-data.ts`에서 합니다.

## 배포

**Cloudtype**에 GitHub Actions로 자동 배포합니다.

- 트리거: `main` 브랜치 push
- 워크플로: `.github/workflows/deploy-cloudtype.yml`
- 프로젝트: `jungwook3176/my-planets`
- 런타임: Node.js 24, `yarn` install / `yarn build`
- 필요 Secrets: `CLOUDTYPE_TOKEN`, `GHP_TOKEN`, `NEXT_PUBLIC_API_KEY`

```bash
git push origin main
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `yarn dev` | 개발 서버 |
| `yarn build` | 프로덕션 빌드 |
| `yarn start` | 빌드 결과 실행 |
| `yarn lint` | ESLint |

## AI 에이전트

이 저장소는 Cursor / Claude Code / Codex 등 AI 에이전트와 함께 작업하도록 구성되어 있습니다.  
사용 분류와 규칙은 `AGENTS.md`, `CLAUDE.md`를 참고하세요.
