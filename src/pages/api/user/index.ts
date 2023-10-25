import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
import verifyJWT from "lib/server/utils/verifyJWT";
import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt'

connectDB();

export default async function (req: any, res: any) {
  console.log(`\x1b[33m\n[api/user]:::[${req.method}]\x1b[0m`);
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      break;
    case "PATCH":
      await updateUser(req, res);
      break;
    default:
      break;
  }
}

const getUsers = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    // console.log("verified.role : ", verified.role);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // find
    // const hashedPassword = await bcrypt.hash(password, 12);
    const foundUsers = await User.find().select("-password").exec();
    if (!foundUsers) return res.status(404).json({ message: "Not found" });
    // output
    // console.log("foundUsers.length : ", foundUsers.length);
    console.log({ foundUsers: foundUsers.map((user: any) => user.username) });
    return res.status(200).json({ users: foundUsers });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req: any, res: any) => {
  try {
    // verify
    // const verified: any = await verifyJWT(req, res);
    const authorization = req.headers.authorization || req.headers.Authorization;
    const accessToken = authorization?.split(" ")[1];
    if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
    const verified: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!verified) return res.status(403).json({ message: "Forbidden" });
    console.log({ verified });

    // update
    const { password, image } = req.body;
    console.log({ password, image });
    // const hashedPassword = await bcrypt.hash(password, 12);
    const foundUser = await User.findOne({ _id: verified.id });
    if (!foundUser) return res.status(404).json({ message: "Not found" });
    console.log({ foundUser });
    if (password) foundUser.password = password;
    if (image) foundUser.image = image;

    // save
    const savedUser = await foundUser.save();
    console.log({ savedUser });

    // output
    return res.status(200).json({ user: savedUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
