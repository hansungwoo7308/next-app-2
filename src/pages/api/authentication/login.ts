import User from "lib/client/model/User";
import mongoose from "mongoose";
import connectDB from "lib/client/config/connectDB";
import { createAccessToken, createRefreshToken } from "lib/server/utils/createJWT";
// connectDB();
export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/login]");
  // get the request (추출)
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required." });
  // connect to db (연결)
  try {
    const URI: any = process.env.MONGODB_URI;
    const OPTIONS = { dbName: "bananaDB" };
    // const OPTIONS = { dbName: "animalDB" };
    await mongoose.connect(URI, OPTIONS);
  } catch (error) {
    console.log("connection error : ", error);
  }
  // find(search) the email (탐색)
  const foundUser = await User.findOne({ email }).exec();
  // console.log("foundUser : ", foundUser);
  if (!foundUser) return res.status(401).json({ message: "Your email was not found in database." });
  // evaluate(verify) the password (검증)
  if (foundUser.password !== password)
    return res.status(401).json({ message: "Your password did not match" });
  // issue the tokens (발급)
  const payload = { username: foundUser.username, email: foundUser.email };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  // save the issued tokens to DB (저장:database)
  foundUser.refreshToken = refreshToken;
  const savedUser = await foundUser.save();
  // console.log("savedUser : ", savedUser);
  // set the response for Client (저장:client)
  res.setHeader("Set-Cookie", [
    // `accessToken=${accessToken};path=/`,
    `refreshToken=${refreshToken};path=/`,
  ]);
  // `refreshToken=${refreshToken};HttpOnly;SameSite=None`
  res.status(200).json({
    message: { message: "Logged In" },
    username: foundUser.username,
    accessToken: accessToken,
    refreshToken: refreshToken,
    slicedTokens: {
      accessToken: accessToken.slice(-5),
      refreshToken: refreshToken.slice(-5),
    },
  });
  console.group("\x1b[34mLogged In\x1b[0m");
  console.log(`\x1b[33maccessToken : ${accessToken.slice(-5)}\x1b[0m`);
  console.log(`\x1b[33mrefreshToken : ${refreshToken.slice(-5)}\x1b[0m`);
  console.groupEnd();
}
