## 📌 개요

이 프로젝트는 **Next.js 15**를 기반으로 개발되었으며, **Volta**를 이용한 자동 환경 구성을 지원합니다.  
프로젝트의 실행 환경 및 기술 스택, 코드 구조, 브랜치 관리 방식을 정리합니다.

---

## 🚀 런타임 환경

기본적으로 **Volta**를 이용하여 자동으로 환경을 구성할 수 있습니다.  
Volta를 사용하지 않는 경우, 아래 스펙을 참고하여 수동으로 설정해주세요.

- **Node.js**: `22.14.0`
- **pnpm**: `10.6.3`

## 설치 및 실행

### 패키지 설치

pnpm install

### 개발 서버 실행

pnpm dev

## 🛠 기술 스택

### 📌 프론트엔드

- **Next.js 15** - React 기반의 풀스택 프레임워크
- **TypeScript** - 정적 타입 언어로 코드 안정성 확보
- **Emotion** - Runtime CSS in JS 라이브러리
- **React Query** - 서버 상태 관리 라이브러리
- **Zustand** - 간결한 전역 상태 관리 라이브러리

### 📌 개발 도구

- **pnpm 10.6.3** - 패키지 관리 도구
- **Node.js 22.14.0** - 런타임 환경
- **ESLint & Prettier** - 코드 품질 및 스타일 자동화
- **Volta** - Node.js 및 패키지 매니저 버전 관리

### 📌 기타

- **Axios** - HTTP 요청 처리
- **dayjs** - 날짜 라이브러리

---

## 🌿 브랜치 관리 전략

### 📌 브랜치 구조

- **`main`**: 배포 가능한 안정적인 코드만 관리
- **`release`**: 긴급 패치 브랜치 (배포 후 발생한 이슈 해결)
- **`develop`**: 최신 개발 기능이 통합되는 브랜치
- **`feature/branch-name`**: 개별 기능 개발을 위한 브랜치
- **`fix/branch-name`**: 버그 수정 브랜치
- **`hotfix/branch-name`**: 긴급 패치 브랜치 (배포 후 발생한 이슈 해결)

### 📌 브랜치 사용 규칙

1. `main` 브랜치는 직접 푸시 ❌, PR(풀 리퀘스트)로만 머지
2. 새로운 기능 개발 시 `develop` 에서 `feature/기능명` 브랜치 생성 후 작업
3. 버그 수정은 `fix/버그명` 브랜치에서 진행
4. 작업 완료 후 `develop` 브랜치로 PR 생성 후 코드 리뷰 진행
5. 배포 전 `develop` → `release` → `main` 으로 머지하여 릴리즈 진행
6. 핫픽스 건은 `main` 에서 `hotfix/기능명` 브랜치 생성 후 `main`, `release`, `develop` 브랜치로 머지진행행

### 📌 커밋 메시지 규칙

커밋 메시지는 다음 형식을 따릅니다.

#### ✅ 타입(Type) 목록

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **refactor**: 코드 리팩토링
- **Style**: 스타일 변경 (UI 수정, CSS 변경 등)
- **docs**: 문서 추가/수정 (README, 주석 등)
- **chore**: 설정 변경, 패키지 설치 등
- **build**: ci/cd, docker 등

## 문제 및 해결

- url공유를 통해 게임화면에 바로 진입할 수 있습니다. 이말은 도메인적으로 해석했을때, 사전에 명시되어있지 않은 문자가 url라우팅을 통해 전달할 수 있다는 부작용을 가지고 있습니다. 따라서 해당 문자가 올바른가에 대한 검증로직을 진행하여야 하며, 검증로직이후의 행위가 정의되어야 합니다. url에서는 암호화를 통해 정답이 노출되지 않았으나, 사전API를 사용하기 위해선 원본데이터를 전달하여야 합니다. 이 과정에서 사용자는 해당 정답을 확인할 수 있습니다. 이를 처리하기 위해 내부api라우팅을 추가 하여, 앱에서 api서버로 암호화된 데이터를 전달하고 api서버에서 복호화하여 사전API에 전달하는 sever to server방식을 적용하였습니다. 하지만 응답데이터에서 원본데이터를 확인할 수 있는 문제가 남아있어서, api서버에서 응답데이터에 대한 암호화과정과 앱에서의 복호화과정을 추가해야합니다.

- next route를 통해 api라우트를 하나 제공해두었지만, cors에 대한 보안 및 로컬호스트에서 간간히 통신이 멈추는 현상이 발생하여 해결해야합니다.

- 이전에 진행하던 상태를 유지하기 위해, 로컬스토리지를 사용했습니다. 하지만 이전에 진행하던 상태에 대한 지원범위는 언제든지 변경되어질 가능성이 있기때문에 WordleUtils라는 인터페이스를 통해 상태유지를 위한 비지니스로직을 제공해두었습니다.

- 게임라운드 및 글자수는 변경될 가능성이 있는 데이터입니다. 따라서 현재는 constant로 두었지만, state로 관리하여 여러 형태의 게임을 제공할 수 있게 설계하는것이 바람직해보입니다.

- 튜토리얼버튼을 통해 게임화면에 들어왔을때, 게임상태가 유지되는 버그가 있습니다. 이전에 진행하던 상태에 대한 유지시점은 게임화면을 진입했을 때가 아닌, 5개의 글자를 한번 검증했을때 입니다. 따라서 튜토리얼버튼을 통한 게임화면에서 게임상태에 따라 초기화여부를 결정해서 적용해야 합니다.

- ui는 컴파운드 컴포넌트 패턴을 적용하여 상위단계의 의미있는 컴포넌트에서 스타일 및 비지니스로직을 확장할 수 있게 작성합니다.
