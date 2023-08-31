// backend modules을 사용할 수 없다. (예: jwt.verify())
// // middleware.ts
// export function middleware(request: NextRequest) {
//   // // Clone the request headers and set a new header `x-version`
//   // const requestHeaders = new Headers(request.headers);
//   // requestHeaders.set("x-version", "13");
//   // // You can also set request headers in NextResponse.rewrite
//   // const response = NextResponse.next({
//   //   request: {
//   //     // New request headers
//   //     headers: requestHeaders,
//   //   },
//   // });
//   // // Set a new response header `x-version`
//   // response.headers.set("x-version", "13");
//   // return response;
// }
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
export default async function middleware(req: NextRequest) {
  // console.log("\x1b[33m\n[middleware]\x1b[32m");
  console.log(`\x1b[32m\n[${req.nextUrl.pathname}]:middleware`);

  // testing...
  // const { pathname } = req.nextUrl;
  // const token = await getToken({ req });
  // if (pathname.startsWith("/users")) {
  //   console.log({ token });
  // }

  // get the credentials
  const refreshToken = req.cookies.get("refreshToken");
  const session: any = await getToken({ req });
  console.log({ session });
  return;

  // if(refreshToken || session.data.)

  const { role } = session.user;
  console.log({ role });
  // console.log({ refreshToken, session });
  // protect the route (접근제한)
  if (role === "admin" || refreshToken) return NextResponse.next();
  else return NextResponse.redirect(new URL("/auth/signin", req.url));

  // next-auth
  // get the next-auth jwt token
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // get the refreshToken from cookie
  // const serializedCookie = req.headers.get("cookie");
  // const parsedCookie = cookie.parse(serializedCookie);
  // const refreshToken = parsedCookie.refreshToken;

  // const body = req.body;
  // const credentials = req.credentials;
  // const headers = req.headers;

  // check the request properties
  // console.log("req.cookies.getAll() : ", req.cookies.getAll());
  // const origin = request.headers.get("origin");
  // const regex = new RegExp("/post-list-2");
  // const regexTest = regex.test(request.url);
  // request.headers.set("Authorization", "Bearer 3...");
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("Authorization", "Bearer hfsldfhskdlfhl");
  // console.log("request : ", Object.getOwnPropertyNames(request));
  // set
  // response.headers.set("Authorization", "Bearer 2...");
  // response.cookies.set("vercel", "fast");
  // const response = NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });
  // response.headers.set("test", "test");
  // return response;
  // const { pathname } = request.nextUrl;
  // const protectedPaths = ["/auth/admin"];
  // const matchesProtectedPath = protectedPaths.some((path) =>
  //   pathname.startsWith(path)
  // );
  // if (matchesProtectedPath) {
  //   const token = await getToken({ req: request });
  //   if (!token) {
  //     // 401 unauthorized : need to redirect
  //     const url = new URL(`/auth/signin`, request.url);
  //     url.searchParams.set("callbackUrl", encodeURI(request.url));
  //     console.log("\x1b[31m401 unauthorized\x1b[0m");
  //     // console.log("url : ", url);
  //     // console.log("url.searchParams : ", url.searchParams);
  //     return NextResponse.redirect(url);
  //   }
  //   // if (token.role !== "admin") {
  //   //   // 403 forbidden : need to rewrite
  //   //   const url = new URL(`/`, request.url);
  //   //   // const url = new URL(`/403`, request.url);
  //   //   // console.log("url : ", url);
  //   //   console.log("\x1b[31m403 forbidden\x1b[0m");
  //   //   return NextResponse.rewrite(url);
  //   // }
  // }
  // return response;
}
// 로그인 상태가 아니면 로그인 페이지로 이동한다.
// export default withAuth(middleware);
export const config = {
  // matcher: ["/auth/profile"],
  matcher: ["/asdhaldaldhasd"],
};
