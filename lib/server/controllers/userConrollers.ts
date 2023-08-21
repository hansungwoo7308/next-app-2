import User from "lib/server/models/User";
export const getUser = async (req: any, res: any) => {
  console.log("\x1b[32m\n<userController/getUser>");
  // get
  const { userId } = req.query;
  // find
  const foundUser = await User.findById(userId).select("-password").exec();
  if (!foundUser) return res.status(404).json({ message: "Not found" });
  // out
  console.log({ foundUser });
  res.status(200).json({ user: foundUser });
};
export const getUsers = async (req: any, res: any) => {
  console.log("\x1b[32m\n<userController/getUsers>");
  // get
  const { userId } = req.query;
  if (userId) return getUser(req, res);
  // find
  const foundUsers = await User.find().select("-password").exec();
  if (!foundUsers) return res.status(404).json({ message: "Not found" });
  // out
  console.log({ foundUsers: foundUsers.map((user: any) => user.username) });
  res.status(200).json({ users: foundUsers });
};
export const updateUser = async (req: any, res: any) => {
  console.log("\x1b[32m\n<userController/updateUser>");
  // find
  const { userId } = req.query;
  const { role } = req.body;
  const foundUser = await User.findOne({ _id: userId }).exec();
  if (!foundUser) return res.status(404).json({ message: "Not found" });
  // console.log("foundUser.role : ", foundUser.role);
  // update
  foundUser.role = role;
  const savedUser = await foundUser.save();
  // console.log("savedUser.role : ", savedUser.role);
  return res.status(200).json({ savedUser });
};
export const deleteUser = async (req: any, res: any) => {
  console.log("\x1b[32m\n<userController/deleteUser>");
  // get
  const { userId } = req.query;
  // delete
  const deletedUser = await User.deleteOne({ _id: userId }).exec();
  if (!deletedUser) return res.status(404).json({ message: "Not found" });
  console.log({ deleteUser });
  // out
  return res.status(200).json({ deletedUser });
};
