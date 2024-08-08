## Stock Pedia

React와 NestJS를 사용하여 개발한 주식 종목 검색 애플리케이션입니다. 사용자는 주식 종목을 검색하고 관련 정보를 확인할 수 있습니다.

### <a href="https://www.stockpedia.online/" target="_blank">STOCKPEDIA 홈페이지</span></a>

<br/><br/>

## Features

- KOSPI/KOSDAQ/KONEX 상장 목록 검색
- 검색 회사의 상세 정보 조회
- 차트 / 재무재표 / 관련 뉴스 / 투자 의견 조회
  <br/><br/>

## Configuration and Running the Project

1.  **백엔드 및 프론트엔드 환경변수 설정:**

    - `client` 디렉토리와 `server` 디렉토리에 `.env.development` 파일을 생성합니다.
    - 필요한 환경 변수(예: 데이터베이스 연결 문자열, API 키, API 엔드포인트 등)를 추가합니다.

2.  **프로젝트 실행:**

        - **백엔드 서버 시작하기:**

            ```bash
            cd server
            npm install --legacy-peer-deps
            npm run start:dev
            ```

        - **프론트엔드 개발 서버 시작하기:**

            ```bash
            cd client
            npm install --legacy-peer-deps
            npm run start:dev
            ```

        - 웹 브라우저를 열고 `http://localhost:3000`으로 이동하여 애플리케이션을 확인합니다.

    <br/><br/>

## 사용 방법

1. 검색창에 주식 종목을 입력합니다.
2. 선택한 주식의 상세 정보를 확인합니다.
