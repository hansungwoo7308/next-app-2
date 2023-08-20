import User from "lib/server/models/User";
export const getUsers = async (req: any, res: any) => {
  // find
  const foundUsers = await User.find().select("-password").exec();
  if (!foundUsers) return res.status(404).json({ message: "Not found" });
  // output
  console.log({ foundUsers: foundUsers.map((user: any) => user.username) });
  return res.status(200).json({ users: foundUsers });
};
