/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  // 서버 측 라우팅을 지원하는 기능
  // source에 설정된 경로로 요청이 들어오면, destination에 설정된 경로로 응답한다.
  // source > destination 으로 rewrites한다.
  async rewrites() {
    return [
      // {
      // 클라이언트 측에서 요청한 경로
      // "/api/login"
      // "/api/isLoggedIn"
      // source: "/api/:path*",
      // 서버 측에서 실제로 요청을 처리할 경로
      // destination: "http://localhost:3000/api/:path*",
      //
      // headers: {
      //   "Access-Control-Allow-Credentials": "true",
      // },
      // },
      {
        source: "/no-page",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
