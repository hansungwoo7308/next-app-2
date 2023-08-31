/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  env: {
    BASE_URL: "https://next-app-2-taupe.vercel.app",
    // BASE_URL: "https://next-app-2-zup2.vercel.app/",
    // database
    MONGODB_URL: process.env.MONGODB_URI,
    // jwt
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    // cloudinary env
    CLOUD_NAME: "dzktdrw7o",
    CLOUD_UPDATE_PRESET: "nextjs_store",
    CLOUD_API_BASE_URL: "https://api.cloudinary.com/v1_1/dzktdrw7o/upload",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // next-auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
    domains: ["res.cloudinary.com"],
  },
  // compiler: {
  //   styledComponents:
  // }
  async headers() {
    return [
      {
        // source: "/:path*",
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },

  // 서버 측 라우팅을 지원하는 기능
  // source에 설정된 경로로 요청이 들어오면, destination에 설정된 경로로 응답한다.
  // source > destination 으로 rewrites한다.
  // async rewrites() {
  //   return [
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
  //     {
  //       source: "/no-page",
  //       destination: "/",
  //     },
  //   ];
  // },
};
module.exports = nextConfig;
