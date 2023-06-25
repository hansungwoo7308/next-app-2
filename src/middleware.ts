// backend modules을 사용할 수 없다. (예: jwt.verify())
// server에서 response를 최종적으로 보내기 전에 사전작업(전처리)을 하기 위한 곳
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
import verifyJWT from "lib/server/utils/verifyJWT";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const cookie = require("cookie");
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log(`\x1b[33m\n[${pathname}]:middleware`);
  const accessToken: any = req.headers.get("authorization");
  // console.log("accessToken : ", accessToken);

  // next-auth
  // get the next-auth jwt token
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("req.nextUrl : ", req.nextUrl);
  // console.log("req.url : ", req.url);
  // if (pathname === "/") {
  //   console.log("next-auth token : ", token);
  //   if (!token) console.log("\x1b[31mYou dont have a token.");
  // }

  // get the refreshToken from cookie
  // const serializedCookie = req.headers.get("cookie");
  // const parsedCookie = cookie.parse(serializedCookie);
  // const refreshToken = parsedCookie.refreshToken;
  // console.log("serializedCookie : ", serializedCookie);
  // console.log("parsedCookie : ", parsedCookie);
  // console.log("refreshToken : ", refreshToken);

  // protect the routes
  // const refreshToken = req.cookies.get("refreshToken")?.value;
  // if (pathname === "/restricted" && !refreshToken) {
  //   console.log("No refreshToken");
  //   console.log("Redirecting to page [/auth/signin]...");
  //   return NextResponse.rewrite(new URL("/auth/signin", req.nextUrl));
  // }

  // if (pathname === "/api/restricted") {
  //   // const body = req.body;
  //   // const credentials = req.credentials;
  //   // const headers = req.headers;
  //   // get the accessToken
  //   // const authorization = req.headers.get("authorization");
  //   // const accessToken = authorization?.split(" ")[1];
  //   // console.log("accessToken : ", accessToken);
  //   // get the refreshToken
  //   // const refreshToken = req.headers
  //   // if (!accessToken) {
  //   //   // console.log("Redirected.");
  //   //   // return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  //   //   // return NextResponse.redirect(new URL("/auth/signin", req.url));
  //   //   // console.log("Rewrited.");
  //   //   // return NextResponse.rewrite(new URL("auth/signin", req.url));
  //   // }
  //   // console.log("request body : ", body);
  //   // console.log("request credentials : ", credentials);
  //   // console.log("request headers : ", headers);
  //   // console.log("request authorization : ", authorization);
  // }
  // check the request properties
  // console.log("req.url : ", req.url);
  // console.log("req.cookies : ", req.cookies);
  // console.log("req.cookies.getAll() : ", req.cookies.getAll());
  // const origin = request.headers.get("origin");
  // const regex = new RegExp("/post-list-2");
  // const regexTest = regex.test(request.url);
  // request.headers.set("Authorization", "Bearer 3...");
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("Authorization", "Bearer hfsldfhskdlfhl");
  // console.log("refreshToken : ", request.cookies.get("refreshToken"));
  // if (!request.cookies.get("accessToken"))
  //   console.log("accessToken does not exist");
  // console.log("request : ", Object.getOwnPropertyNames(request));
  // console.log("request.credentials : ", request.credentials);
  // const { authorization }: any = request.headers;
  // console.log("request.credentials : ", typeof request.credentials);
  // set
  // console.log("request.headers.cookie : ", request.headers.get("cookie"));
  // console.log("asdads : ", request.headers.get("Authorization"));
  // response.headers.set("Authorization", "Bearer 2...");
  // response.cookies.set("vercel", "fast");
  // const response = NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });
  // response.headers.set("test", "test");
  return NextResponse.next();
  // return response;
  // // if (!cookie) return NextResponse.redirect("http://localhost:3000/");
  // const { pathname } = request.nextUrl;
  // const protectedPaths = ["/auth/admin"];
  // const matchesProtectedPath = protectedPaths.some((path) =>
  //   pathname.startsWith(path)
  // );
  // // console.log("pathname : ", pathname);
  // // console.log("matchesProtectedPath : ", matchesProtectedPath);
  // // const token = await getToken({ req: request });
  // // console.log("token : ", token);
  // console.log("request.url : ", request.url);
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
export const config = {
  matcher: [
    "/api/authentication/:path*",
    // "/",
    // "/api/restricted/:path*",
    // "/restricted/:path*",
  ],
  // matcher: ["/api/users"],
  // matcher: ["/auth/admin"],
};
