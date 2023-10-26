// backend modules을 사용할 수 없다. (예: jwt.verify())
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
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequest) {
  // console.log(`\x1b[34m\n[${req.nextUrl.pathname}]:middleware\x1b[30m`);

  // get the credentials
  const refreshToken = req.cookies.get("refreshToken");
  const session: any = await getToken({ req });
  // console.log({ session });

  if (session) return NextResponse.redirect(new URL("/", req.url));

  return;

  // const { role } = session.user;
  // if (role === "admin" || refreshToken) return NextResponse.next();
  // else return NextResponse.redirect(new URL("/auth/signin", req.url));
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
}

// export default withAuth(middleware);
export const config = {
  // matcher: ["/auth/profile"],
  matcher: ["/auth/signin", "/auth/signup"],
};
