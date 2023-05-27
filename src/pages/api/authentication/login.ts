import User from "lib/client/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/login]");
  // get the request
  const cookies = req.cookies;
  // console.log("refreshToken : ", cookies.refreshToken);
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and Password are required." });
  // connect to db
  try {
    const URI: any = process.env.MONGODB_URI;
    const OPTIONS = { dbName: "bananaDB" };
    // const OPTIONS = { dbName: "animalDB" };
    await mongoose.connect(URI, OPTIONS);
  } catch (error) {
    console.log("connection error : ", error);
  }
  // find the email
  const foundUser = await User.findOne({ email }).exec();
  // console.log("foundUser : ", foundUser);
  if (!foundUser)
    return res
      .status(401)
      .json({ message: "Your email was not found in database." });
  // evaluate the password
  if (foundUser.password !== password)
    return res.status(401).json({ message: "Your password did not match" });
  // issue the tokens
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const accessToken = jwt.sign(
    { email: foundUser.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
  const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;
  const newRefreshToken = jwt.sign(
    { email: foundUser.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  // save the issued tokens
  // foundUser.accessToken = accessToken;
  foundUser.refreshToken = newRefreshToken;
  const savedUser = await foundUser.save();
  console.log("savedUser : ", savedUser);
  // set the response
  res.setHeader("Set-Cookie", [
    // `accessToken=${accessToken};path=/`,
    `refreshToken=${newRefreshToken};path=/`,
  ]);
  // `refreshToken=${refreshToken};HttpOnly;SameSite=None`
  res.status(200).json({
    email: foundUser.email,
    accessToken: accessToken,
    // refreshToken: newRefreshToken,
    // message: "You are logged in.",
  });
  console.log("accessToken : ", accessToken);
  // res.json({ accessToken, message: "You are logged in." });
  // res.status(200).json({ ...req.body, accessToken: "jwt..." });
  console.log("");
}
