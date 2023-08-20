import User from "lib/server/models/User";
export const getUsers = async (req: any, res: any) => {
  console.log("\x1b[32m\n[userController]");
  // find
  const foundUsers = await User.find().select("-password").exec();
  if (!foundUsers) return res.status(404).json({ message: "Not found" });
  // out
  console.log({ foundUsers: foundUsers.map((user: any) => user.username) });
  res.status(200).json({ users: foundUsers });
};
