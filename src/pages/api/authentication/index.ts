import User from "lib/core/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export default async function handler(req: any, res: any) {
  console.log("");
  console.log("\x1b[32m[Server]/api/authentication");
  // get the request
  const cookies = req.cookies;
  console.log("refreshToken : ", cookies.refreshToken);
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });
  // console.log("username : ", username);
  // console.log("password : ", password);
  // connect to db
  try {
    const URI: any = process.env.MONGODB_URI;
    const OPTIONS = { dbName: "animalDB" };
    await mongoose.connect(URI, OPTIONS);
  } catch (error) {
    console.log("connection error : ", error);
  }
  // find the username
  const foundUser = await User.findOne({ username }).exec();
  // console.log("foundUser : ", foundUser);
  if (!foundUser)
    return res
      .status(401)
      .json({ message: "Your name was not found in database." });
  // evaluate the password
  if (foundUser.password !== password)
    return res.status(401).json({ message: "Your password did not match" });
  // issue the tokens
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const accessToken = jwt.sign(
    { username: foundUser.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;
  const newRefreshToken = jwt.sign(
    { username: foundUser.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  // save the issued tokens
  foundUser.accessToken = accessToken;
  foundUser.refreshToken = newRefreshToken;
  const savedUser = await foundUser.save();
  console.log("savedUser : ", savedUser);
  // set the response
  res.setHeader("Set-Cookie", [
    `accessToken=${accessToken};path=/`,
    `refreshToken=${newRefreshToken};path=/`,
  ]);
  // `refreshToken=${refreshToken};HttpOnly;SameSite=None`
  res.status(200).json({
    username: foundUser.username,
    accessToken: accessToken,
    refreshToken: newRefreshToken,
    // message: "You are logged in.",
  });
  // res.json({ accessToken, message: "You are logged in." });
  // res.status(200).json({ ...req.body, accessToken: "jwt..." });
  console.log("");
}
