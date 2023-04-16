// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // export function middleware(request) {
// export function middleware(request: NextRequest) {
//   console.log("");
//   console.log("\x1b[31mMiddleware\x1b[0m");
//   console.log("");

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

export const config = {
  // matcher: ["/:path*"],
  // matcher: ["/404"],
  // matcher: ["/auth/admin"],
  // matcher: ["/about", "/auth/admin"],
};

// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const protectedPaths = ["/auth/admin"];
  // const matchesProtectedPath = protectedPaths.some((path) =>
  //   pathname.startsWith(path)
  // );
  // console.log("");
  // console.log("\x1b[32mMiddleware\x1b[0m");
  // // console.log("pathname : ", pathname);
  // // console.log("matchesProtectedPath : ", matchesProtectedPath);
  // // const token = await getToken({ req: request });
  // // console.log("token : ", token);
  // console.log("request.url : ", request.url);
  // console.log("");

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

  return NextResponse.next();
}
