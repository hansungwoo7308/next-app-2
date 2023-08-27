import User from "lib/server/models/User";
import { getSession } from "next-auth/react";
export const signupUser = async (req: any, res: any) => {
  console.log("\x1b[32m\n[signupUser]");
  // get
  const { username, email, password } = req.body;
  // find
  const duplicatedUser = await User.findOne({ username }).exec();
  if (duplicatedUser) return res.status(409).json({ message: "Duplicated username" });
  // create
  const user = await User.create({ username, email, password });
  // out
  res.status(201).json({ user });
};
export const checkAdmin = async (req: any, res: any) => {
  console.log("\x1b[32m\n[checkAdmin]");

  // get the credentials from session and cookies
  const session: any = await getSession({ req });
  // const { refreshToken } = req.cookies;
  // console.log({ session, refreshToken });

  // out
  if (session && session.user?.role === "admin")
    return res.status(200).json({ message: "authenticated" });
  if (!session || session.user?.role !== "admin")
    return res.status(401).json({ message: "Unauthorized" });
  else return res.status(500).json({ message: "Unknown error occured" });
};
