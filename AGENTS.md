<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Universe — Agent Guide

이 문서는 Cursor, Codex 등 **AI 에이전트**가 이 저장소에서 작업할 때 따라야 할 규칙과 사용 분류입니다.

## AI 사용 분류

### 1. AI Dev — 코드 실행 에이전트
**도구 예:** Cursor Agent, Claude Code, Codex  
**역할:** 실제 코드 작성, 수정, 리팩토링, 디버깅, 빌드/린트 확인

적합한 작업:
- 컴포넌트 / 패널 UI 구현 및 수정
- Three.js / R3F 씬 인터랙션 조정
- Tailwind 토큰·클래스 정리
- Firebase / API route 연동
- 버그 수정, 타입 오류, lint 대응

원칙:
- 요청 범위만 수정한다. 관련 없는 리팩토링·문서 추가를 하지 않는다.
- Next.js 16 문서는 `node_modules/next/dist/docs/`를 우선한다.
- 콘텐츠 변경은 `config/portfolio-data.ts`를 단일 소스로 유지한다.
- 커밋·푸시는 사용자가 명시적으로 요청할 때만 수행한다.

### 2. AI Workflow — 기획·설계 에이전트
**도구 예:** Ask / Plan 모드, 대화형 분석  
**역할:** 요구사항 정리, UX 흐름 설계, 아키텍처 검토, 구현 순서 제안

적합한 작업:
- 섹션 구조 / 인터랙션 플로우 설계
- 성능·접근성·모션 전략 검토
- 데이터 스키마 변경 제안
- 배포·환경 변수 체크리스트

원칙:
- 코드 변경이 필요하면 구현 전에 구조와 트레이드오프를 먼저 설명한다.
- Ask 모드에서는 수정하지 않고 가이드만 제공한다.

### 3. AI Review — 검수 에이전트
**역할:** 변경 diff 리뷰, 회귀 점검, 문서 정합성 확인

적합한 작업:
- PR / diff 리뷰
- 3D 성능(드로콜, 프리로드, Suspense) 점검
- `portfolio-data`와 패널 UI 필드 불일치 검사
- README / AGENTS 문서와 실제 코드 일치 여부 확인

## 작업 영역별 가이드

| 영역 | 주요 경로 | 주의 |
|------|-----------|------|
| 콘텐츠 | `config/portfolio-data.ts` | UI 하드코딩 대신 데이터 확장 |
| 3D 씬 | `components/planet/`, `BasicThreeScene.tsx` | GLB pivot, Suspense, intro 타이밍 |
| 패널 UI | `components/panel/` | Tailwind 토큰 우선, arbitrary 값 최소화 |
| 방명록 | `components/panel/Guestbook.tsx`, `firebase/`, `app/api/memo/` | 시크릿을 코드에 넣지 않음 |
| 스타일 | `tailwind.config.js`, `app/globals.css` | 디자인 토큰을 config에 정의 |
| 배포 | `.github/workflows/deploy-cloudtype.yml` | Secrets는 워크플로/환경에서만 |

## 금지 / 주의

- `.env`, 토큰, API 키를 커밋하거나 문서에 실제 값을 적지 않는다.
- 대형 GLB/이미지 최적화 없이 무분별하게 용량을 키우지 않는다.
- `Suspense` / 로딩 intro / 해시 라우팅 동작을 깨는 구조 변경을 피한다.
- 기존 시각 언어(다크 우주, accent cyan)를 임의로 바꾸지 않는다. 요청 시에만 변경한다.

## 검증

코드 변경 후 가능하면 다음을 확인한다.

```bash
yarn lint
yarn build
```

## 관련 문서

- `README.md` — 프로젝트 소개, 기능, 배포
- `CLAUDE.md` — Claude Code 전용 진입점
