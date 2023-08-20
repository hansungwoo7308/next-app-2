import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
import verifyJWT from "lib/server/utils/verifyJWT";
// import bcrypt from 'bcrypt'
connectDB();
export default async function (req: any, res: any) {
  console.log("\n\x1b[32m[api/user]");
  switch (req.method) {
    case "GET":
      console.log("GET");
      await getUsers(req, res);
      break;
    case "PATCH":
      console.log("PATCH");
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
    const verified: any = await verifyJWT(req, res);
    // update
    const { password, image } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 12);
    const foundUser = await User.findOne({ _id: verified.id });
    if (!foundUser) return res.status(404).json({ message: "Not found" });
    console.log("\x1b[32mfoundUser : ", foundUser);
    foundUser.password = password;
    foundUser.image = image;
    console.log("\x1b[32mupdatedUser : ", foundUser);

    // if (password && image) {
    //   // updatedUser = await User.findOneAndUpdate(
    //   //   { _id: verified.id },
    //   //   // { password: hashedPassword }
    //   //   { password: password, image: image }
    //   // );
    // }
    // else if (password) {
    //   console.log("password : ", password);
    //   updatedUser = await User.findOneAndUpdate(
    //     { _id: verified.id },
    //     // { password: hashedPassword }
    //     { password: password }
    //   );
    // } else if (image) {
    //   console.log("image : ", image);
    //   updatedUser = await User.findOneAndUpdate(
    //     { _id: verified.id },
    //     // { password: hashedPassword }
    //     { image: image }
    //   );
    // }
    // output
    return res.status(200).json({ updatedUser: foundUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
// const updatePassword = async (req: any, res: any) => {
//   try {
//     // verify
//     const verified = await verifyJWT(req, res);
//     // update the password
//     const { password } = req.body;
//     // const hashedPassword = await bcrypt.hash(password, 12);
//     const updatedPassword = await User.findOneAndUpdate(
//       { _id: verified.id },
//       // { password: hashedPassword }
//       { password: password }
//     );
//     // output
//     console.log("\x1b[32mupdatedPassword : ", updatedPassword);
//     return res.status(200).json({ updatedPassword });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };
