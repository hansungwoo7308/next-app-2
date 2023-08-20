import { getSession } from "next-auth/react";
export const isAuthenticated = async (req: any, res: any, next: any) => {
  const cookies = req.headers.cookies;
  console.log({ cookies });
  const session = await getSession({ req });
  // if (!session) return next(new Error("No session"));
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    next();
    return;
  }
  req.user = session.user;
  next();
};
