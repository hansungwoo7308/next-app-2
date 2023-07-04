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
    // console.log("req.body : ", req.body);
    // console.log("file : ", file);
    // const hashedPassword = await bcrypt.hash(password, 12);
    let updatedUser;
    if (password && image) {
      console.log("password : ", password);
      console.log("image : ", image);
      updatedUser = await User.findOneAndUpdate(
        { _id: verified.id },
        // { password: hashedPassword }
        { password: password, image: image }
      );
    } else if (password) {
      console.log("password : ", password);
      updatedUser = await User.findOneAndUpdate(
        { _id: verified.id },
        // { password: hashedPassword }
        { password: password }
      );
    } else if (image) {
      console.log("image : ", image);
      updatedUser = await User.findOneAndUpdate(
        { _id: verified.id },
        // { password: hashedPassword }
        { image: image }
      );
    }
    // output
    console.log("\x1b[32mupdatedUser : ", updatedUser);
    return res.status(200).json({ updatedUser });
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
