import connectDB from "lib/server/config/connectDB";
import User from "lib/server/model/User";
import verifyJWT from "lib/server/utils/verifyJWT";
const bcrypt = require("bcrypt");
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m[api/user/updatePassword]");
  switch (req.method) {
    case "PATCH":
      await updateUser(req, res);
      break;
    default:
      break;
  }
}
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
