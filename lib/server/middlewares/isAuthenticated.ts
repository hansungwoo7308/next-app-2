import { getSession } from "next-auth/react";
import cookie from "cookie";
export const isAuthenticated = async (req: any, res: any, next: any) => {
  console.log("\x1b[32m\n[middleware/isAuthenticated]");
  // console.log(Object.keys(req));

  // get the credentials from session and cookies
  // const cookies = cookie.parse(req.headers.cookie)
  const session = await getSession({ req });
  const { refreshToken } = req.cookies;
  console.log({ session, refreshToken });
  if (!session) console.log("No session");
  if (!refreshToken) console.log("No refreshToken");
  await next();

  // if (session) {
  //   req.user = session.user;
  // }

  // if (!session) return new Error("No session");
  // if (!session) return next(new Error("No session"));
  // if (!session || !refreshToken) {
  //   if(!session)
  //   res.status(401).json({ message: "No session" });
  //   if(!refreshToken)
  //   res.status(401).json({ message: "No refreshToken" });
  //   // next();
  //   return;
  // }

  // set the context req object property
};
