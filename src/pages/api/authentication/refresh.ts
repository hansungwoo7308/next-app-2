import User from "lib/client/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export default async function handler(req: any, res: any) {
  console.log("");
  console.log("\x1b[32mapi/authentication/refresh");
  // get the accessToken
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];
  console.log("accessToken : ", accessToken);
  // get the refreshToken
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken : ", refreshToken);
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
  // find the user
  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log("foundUser : ", foundUser);
  if (!foundUser) return res.status(403).json({ message: "Forbidden" });
  // verify the refreshToken
  let verifiedToken;
  try {
    const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;
    verifiedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log("verifiedToken : ", verifiedToken);
  } catch (error) {
    console.log("error : ", error);
    return res.status(403).json({ message: "Forbidden" });
  }
  // issue the new tokens
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const newAccessToken = jwt.sign(
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
  foundUser.accessToken = newAccessToken;
  foundUser.refreshToken = newRefreshToken;
  const savedUser = await foundUser.save();
  console.log("savedUser : ", savedUser);
  // set the payload
  res.setHeader("Set-Cookie", [
    `accessToken=${newAccessToken};path=/`,
    `refreshToken=${newRefreshToken};path=/`,
  ]);
  res.status(200).json({
    username: foundUser.username,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
  console.log("");
}
