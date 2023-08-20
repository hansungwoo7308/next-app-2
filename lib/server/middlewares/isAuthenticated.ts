import { getSession } from "next-auth/react";
export const isAuthenticated = async (req: any, res: any, next: any) => {
  // get the cookies
  // const cookies = req.headers.cookies;
  // console.log({ cookies });

  // get the session
  const session = await getSession({ req });
  if (!session) return next(new Error("No session"));
  // if (!session) {
  //   res.status(401).json({ message: "Unauthorized" });
  //   next();
  //   return;
  // }

  // set the context req object property
  req.user = session.user;
  next();
};
