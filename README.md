## 🚀 프로젝트 데모

하단의 링크를 누르면 개발에 사용된 디자인 시스템 데모 페이지를 확인하실 수 있습니다. :)
서비스 데모는 `Production` 환경에서 NextJS API Router가 일부 정상적으로 동작하지 않는 이슈가 있어 제외하였습니다.

- **[📚 디자인 시스템](https://29cm-frontend-assignment.vercel.app/)** 바로가기

## 🏁 실행 방법

### 개발 환경 설정하기

이 프로젝트는 `Node.js "^18"`를 기준으로 개발하였습니다. 이를 `package.json`의 `engines` 필드에 명시하여 반드시 해당 버전에서만 개발 및 배포가 가능하도록 했습니다.

```json
{
  "engines": {
    "node": "^18"
  }
}
```

다음 명령어를 입력하여 해당하는 버전을 설치 및 사용해 주세요.

```
nvm install v18
nvm use v18
```

### 설치 및 메인 서비스 실행하기

이제 패키지의 의존성을 설치하여 개발 환경을 실행할 수 있습니다.

```
yarn install
yarn dev
```

### 디자인 시스템 실행하기

위의 단계를 먼저 진행하여 모든 의존성을 설치했다면, 다음 명령어를 입력하여 `Storybook` 기반 디자인 시스템 개발 서버를 실행할 수 있습니다.

```
yarn storybook
```

## 🔧 주요 기술 스택

서비스 및 개발환경 설정에서 중요하다고 생각하는 스택만 나열하였습니다.

#### Cores

- Nextjs: `v13.4.4`
  - `react@18.2.0`
  - `react-dom@18.2.0`
- `@tanstack/react-query`
- `sass`

서버 상태를 `react-query`에 위임하여 개발 생산성을 높이고 **[stale-while-revalidate](https://web.dev/stale-while-revalidate/)** 방식에 따라 개발자가 전략적으로 사용할 수 있습니다. 이에 따라 클라이언트 단의 전역 상태에 대한 의존도가 줄어들게 되었습니다.

스타일은 컴포넌트 단위의 모듈을 생성하여 글로벌 스코프에서 스타일 오염이 발생하지 않도록 `SASS`와 `CSS Module`을 함께 사용하였습니다.

#### Components

- `@radix-ui/react-checkbox`
- `@radix-ui/react-radio-group`
- `react-number-format`
- `react-responsive-modal`
- `react-toastify`

공통 컴포넌트 중 구현에 많은 시간이 소요되는 것으로 예상되는 요소들은 외부 라이브러리를 기반으로 구현하였습니다. `UI 프레임워크`를 사용하기 보다 필요한 구성요소에 대하여 선별적으로 설치하여 사용하였습니다.

#### Utilities

- `classnames`
- `react-fast-compare`

`classnames`는 `CSS Module`을 기반으로 만든 Component를 사용자가 클래스명을 기반으로 커스터 마이징할 수 있도록 컴포넌트 내부에서 사용합니다.

`react-fast-compare`는 제품 목록 페이지에서 `React.memo`로 wrapping한 컴포넌트의 `React.ReactNode[]`를 값으로 사용한 `Props`를 비교하기 위해 사용하였습니다.

### Design System

- `Storybook`

개발단에서 컴포넌트, 훅 단위로 개발하였습니다. 그리고 이를 `Common`, `{FeatureModuleName}` 단위로 각각 구분하여 문서화하였습니다.

```bash
📚 @Storybook
├─ Common/
│  ├─ Components/ ## 공통 컴포넌트를 문서화합니다.
│  ├─ Hooks/ ## 공통 훅을 문서화합니다.
│  ├─ Layouts/ ## 공통 레이아웃 컴포넌트를 문서화합니다.
└─ {FeatureModuleName}/
   └─ Components/ ## 해당 기능의 컴포넌트를 문서화합니다.
```

## 📁 프로젝트 디렉토리 구조

```bash
📦 @29cm_frontend_assignment
├─ public/
├─ src/
│  ├─ app/ ## Nextjs 13의 App Router를 사용합니다.
│  │  ├─ api/ ## Api Router를 사용하여 가상의 서버를 구성합니다.
│  │  └─ {pageName} ## 실제 페이지 요소를 구성합니다.
│  ├─ components/ ## 공통 컴포넌트를 관리합니다.
│  ├─ layouts/ ## 레이아웃 요소를 관리합니다.
│  ├─ icons/ ## 아이콘 요소를 관리합니다.
│  ├─ hooks/ ## 공통 훅을 관리합니다.
│  ├─ styles/ ## SASS 전역 스타일 및 공통 변수와 유틸 함수 등을 관리합니다.
│  ├─ utils/ ## 공통 유틸 함수를 관리합니다.
│  ├─ libs/ ## 라이브러리 요소를 프로젝트에 맞게 변형하여 사용하는 요소들을 관리합니다.
│  ├─ features ## 기능 단위로 모듈을 분리하여 하위 디렉토리로 관리합니다.
│  │  └─ {featureModuleName}
│  │     ├─ index.ts ## 해당 기능에서 사용하는 모듈은 index.ts에서 Named export합니다.
│  │     ├─ components/
│  │     ├─ hooks/
│  │     ├─ stores/
│  │     └─ queries/
│  └─ mockers/ ## API Mocker
├─ .storybook ## 디자인 시스템 Storybook의 설정 구성
├─ package.json
└─ yarn.lock
```

## 🧰 주요 기능

#### 메인 서비스 - 제품 목록(/products)

- 제품 목록을 5개 단위로 Pagination하여 출력합니다.
- 제품 목록을 불러오는 경우 Skeleton UI를 출력합니다.
- 제품 목록의 장바구니 아이콘으로 해당 제품을 담거나 제거할 수 있습니다.
- 장바구니에 최대 3개까지 담을 수 있으며, 초과하여 담는 경우 Error Toast를 출력합니다.

#### 메인 서비스 - 장바구니(/cart)

- 장바구니 목록을 출력합니다.
- 장바구니의 아이템을 제거하거나 수량을 변경할 수 있습니다.
- 장바구니 목록에서 구매하기 위해 선택 여부를 토글할 수 있습니다.
- 가격 테이블 섹션에서 쿠폰을 선택하여 가격 상세 내역을 확인할 수 있습니다.

#### 디자인 시스템

- Common, Features 단위로 컴포넌트, 훅, 레이아웃을 개발 및 문서화하였습니다.
