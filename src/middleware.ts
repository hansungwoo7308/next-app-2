// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
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
import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  // console.log("");
  // console.log("\x1b[32mmiddleware");
  // request.headers.set("Authorization", "Bearer 3...");
  // console.log("request.headers : ", request.headers);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", "Bearer hfsldfhskdlfhl");
  // console.log("requestHeaders : ", requestHeaders);

  // console.log("cookies : ", request.cookies);
  // console.log("cookies : ", request.cookies.getAll());
  // console.log("refreshToken : ", request.cookies.get("refreshToken"));
  // if (!request.cookies.get("accessToken"))
  //   console.log("accessToken does not exist");
  // console.log("request : ", Object.getOwnPropertyNames(request));
  // console.log("request.credentials : ", request.credentials);
  // const { authorization }: any = request.headers;
  // console.log("authorization : ", authorization);
  // console.log("request.credentials : ", typeof request.credentials);
  // set
  // console.log("request.headers.cookie : ", request.headers.get("cookie"));
  // console.log("typeof request.headers : ", typeof request.headers);
  // console.log("asdads : ", request.headers.get("Authorization"));
  // console.log("test : ", test);
  // response.headers.set("Authorization", "Bearer 2...");
  // console.log("response : ", response);
  // response.cookies.set("vercel", "fast");
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("test", "test");
  // console.log("");
  return response;
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
  matcher: ["/"],
  // matcher: ["/:path*"],
  // matcher: ["/api/users"],
  // matcher: ["/user-list"],
  // matcher: ["/auth/admin"],
  // matcher: ["/about", "/auth/admin"],
};
