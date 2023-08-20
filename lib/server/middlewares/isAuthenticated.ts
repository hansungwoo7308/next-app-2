import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
// import cookie from "cookie";
export const isAuthenticated = async (req: any, res: any, next: any) => {
  console.log("\x1b[32m\n[middleware/isAuthenticated]");
  // console.log(Object.keys(req));

  // get the credentials from session and cookies
  // const cookies = cookie.parse(req.headers.cookie)
  const session = await getSession({ req });
  const token = await getToken({ req });
  const { refreshToken } = req.cookies;
  console.log({ session });
  // console.log({ token, session, refreshToken });
  if (!session) throw new Error("No session");
  // if (!refreshToken) throw new Error("No refreshToken");
  await next();

  // if (session) {
  //   req.user = session.user;
  // }
};
