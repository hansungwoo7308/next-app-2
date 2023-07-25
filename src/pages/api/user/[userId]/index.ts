import connectDB from "lib/server/config/connectDB";
import verifyJWT from "lib/server/utils/verifyJWT";
import User from "lib/server/model/User";
import Product from "lib/server/model/Product";
connectDB();
export default async function (req: any, res: any) {
  console.log(`\x1b[32m[api/user/[${req.query.userId}]]`);
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
    default:
      break;
  }
}
const updateRole = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
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
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteUser = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // find
    const { userId } = req.query;
    const deletedUser = await User.findByIdAndDelete(userId).exec();
    if (!deletedUser) return res.status(404).json({ message: "Not found" });
    // console.log("foundUser.role : ", foundUser.role);
    return res.status(200).json({ deletedUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
