import User from "lib/server/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDB from "lib/server/config/connectDB";
import { createAccessToken, createRefreshToken } from "lib/server/utils/createJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/refresh]");
  // get the tokens
  // const authorization = req.headers.authorization;
  // const accessToken = authorization?.split(" ")[1];
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  console.log("\x1b[32mrefreshToken : ", refreshToken?.slice(-5));
  if (!refreshToken) {
    console.log(`\x1b[31mNo refreshToken.\x1b[0m`);
    return res.status(401).json({ message: "Unauthorized" });
  }
  // find the user
  const foundUser = await User.findOne({ refreshToken }).exec();
  // console.log("foundUser : ", foundUser);
  if (!foundUser) {
    console.log(`\x1b[31mThe foundUser do not exist.\x1b[0m`);
    return res.status(401).json({ message: "The foundUser do not exist." });
  }
  // verify the refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error: any, decoded: any) => {
    if (error) {
      console.log(`\x1b[31mThe refreshToken was expired.\x1b[0m`);
      return res.status(403).json({ error });
      // foundUser.refreshToken = [...newRefreshTokenArray];
      // const result = await foundUser.save();
      // console.log(`result : `, result);
    }
    // if (error || foundUser.username !== decoded.username) return res.status(403);
    // issue the new tokens
    const payload = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      image: decoded.image,
    };
    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken(payload);
    // save the issued tokens
    foundUser.refreshToken = newRefreshToken;
    const savedUser = await foundUser.save();
    // console.log("savedUser : ", savedUser);
    // set the payload
    console.log("decodedUser : ", decoded);
    res.setHeader("Set-Cookie", [`refreshToken=${newRefreshToken};path=/`]);
    res.status(200).json({
      username: decoded.username,
      role: decoded.role,
      image: decoded.image,
      accessToken: newAccessToken,
      slicedTokens: {
        accessToken: newAccessToken?.slice(-5),
        refreshToken: newRefreshToken?.slice(-5),
      },
    });
    // console.log("\x1b[34mThe accessToken and refreshToken were refreshed.\x1b[0m");
    console.log("\x1b[33mnewAccessToken : ", newAccessToken?.slice(-5));
    console.log("\x1b[33mnewRefreshToken : ", newRefreshToken?.slice(-5));
  });
}
