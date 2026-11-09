# OctoFit Tracker 프런트엔드

React 19, Vite, Bootstrap, React Router를 사용하는 OctoFit Tracker 프레젠테이션 계층입니다.

## 실행

API와 MongoDB를 실행한 뒤 프런트엔드 개발 서버를 시작합니다.

```bash
npm --prefix octofit-tracker/frontend install
npm --prefix octofit-tracker/frontend run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## API 주소 설정

GitHub Codespaces에서는 프런트엔드 디렉터리에 `.env.local` 파일을 만들고 Codespace 이름을 설정하세요.

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

`VITE_CODESPACE_NAME`이 설정되면 API 요청은 `https://<codespace-name>-8000.app.github.dev/api/<resource>/`로 전송됩니다. 값을 설정하지 않으면 로컬 개발용 `http://localhost:8000/api/<resource>/`을 사용하므로 `https://undefined-8000...` 주소가 만들어지지 않습니다. 환경 변수 변경 후에는 Vite 개발 서버를 다시 시작하세요.