const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // '/api'로 시작하는 요청을 프록시로 보냄
      target: `${process.env.REACT_APP_HOST}`, // 백엔드 서버 주소 (환경 변수에서 가져옴)
      changeOrigin: true, // CORS 우회 설정
    })
  );
};
/**
 *  1️⃣ 프록시(proxy) 설정이 필요한 이유
React 개발 서버 (localhost:3000)와 백엔드 서버 (localhost:5000 등)의 출처(origin)가 다르면 CORS 오류가 발생할 수 있음.
이를 해결하기 위해 React 개발 서버에서 백엔드로 직접 요청하는 것이 아니라, 프록시 서버를 통해 API 요청을 우회시킴.
 */

/**
 * .
🚀 2️⃣ 주요 코드 설명
1️⃣ createProxyMiddleware('/api', { target: ${process.env.REACT_APP_HOST} })
→ /api로 시작하는 요청을 REACT_APP_HOST(백엔드 서버 주소)로 프록시함.

2️⃣ target: process.env.REACT_APP_HOST
→ .env 파일에 저장된 백엔드 서버 URL을 사용하여 요청을 보냄.
→ 예: .env 파일에 REACT_APP_HOST=http://localhost:5000 이라면, /api 요청이 http://localhost:5000/api로 전달됨.

3️⃣ changeOrigin: true
→ CORS 문제 해결을 위해 프록시 서버의 origin을 백엔드 서버의 origin으로 변경
→ 백엔드 서버가 localhost:3000을 차단하더라도, 프록시 서버가 대신 요청하여 API 응답을 받을 수 있음.


 */

/*
📌 동작 방식 (요청 흐름)
💡 프록시 없이 API 요청하면?
React App (localhost:3000) ❌ → 직접 API 요청 (http://localhost:5000/api)  → CORS 오류 발생 🚨

💡 프록시를 사용하면?
React App (localhost:3000) → 프록시 서버 (localhost:3000/api) → 백엔드 서버 (http://localhost:5000/api) ✅
✔ React는 /api로 요청을 보내지만, 프록시 서버가 이를 http://localhost:5000/api로 변환하여 백엔드로 전달함!
*/

/**
 * ✔ CORS 문제 없이 API 요청을 백엔드로 전달
✔ 환경 변수(.env)를 활용해 유동적으로 백엔드 서버 주소 관리
✔ React 개발 환경에서 API 요청을 더 간단하게 처리 (경로 변경 없이 사용 가능)

🚀 즉, 이 프록시 설정 덕분에 React 클라이언트에서 API를 편리하게 사용할 수 있고, CORS 오류 없이 개발 가능!
 */
