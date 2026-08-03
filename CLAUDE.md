@AGENTS.md

# Claude Code Guide

이 파일은 **Claude Code**가 이 저장소를 다룰 때의 진입점입니다.  
공통 규칙과 AI 사용 분류는 `AGENTS.md`를 따릅니다.

## Claude에서 우선할 분류

### AI Dev (구현)
코드 수정, Three.js/R3F 인터랙션, 패널 UI, Firebase/API, lint·build 수정에 사용한다.

- Next.js 16은 학습 데이터보다 `node_modules/next/dist/docs/`를 우선한다.
- 포트폴리오 문구·프로젝트 목록·갤러리·아키텍처는 `config/portfolio-data.ts`에서 관리한다.
- 불필요한 파일 생성, 광범위 리팩토링, 요청하지 않은 커밋을 하지 않는다.

### AI Workflow (설계)
요구사항이 모호하거나 UX/씬 구조 결정이 필요하면 먼저 설계를 정리한다.

- 행성 탐험 UX, 카메라, Suspense intro, 패널 전환 흐름을 깨지 않는지 검토한다.
- 구현 전에 변경 범위와 대안을 짧게 제시한다.

### AI Review (검수)
작업 후 또는 리뷰 요청 시 아래를 확인한다.

- `portfolio-data` 필드와 패널 컴포넌트 props 정합성
- 3D 성능(프리로드, 인스턴스 clone, Suspense 경계)
- Cloudtype 배포 워크플로·환경 변수 누락 여부
- README / AGENTS 문서와 실제 동작 일치

## 빠른 컨텍스트

| 항목 | 내용 |
|------|------|
| 앱 | Next.js App Router 포트폴리오 |
| 핵심 UX | 행성 클릭 → 패널, 해시 라우팅 |
| 콘텐츠 소스 | `config/portfolio-data.ts` |
| 배포 | GitHub Actions → Cloudtype (`main`) |

상세 규칙: `AGENTS.md`  
프로젝트 개요: `README.md`
