import User from "lib/client/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/refresh]");
  // get the refreshToken
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken : ", refreshToken);
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
  // get the accessToken
  const authorization = req.headers.authorization;
  const accessToken = authorization?.split(" ")[1];
  console.log("accessToken : ", accessToken);
  // find the user
  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log("foundUser : ", foundUser);
  console.log("foundUser.name : ", foundUser.name);

  if (!foundUser) return res.status(403).json({ message: "Forbidden" });
  // verify the refreshToken
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;
  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    async (error: any, decoded: any) => {
      if (error) {
        console.log("verify error : ", error);
        // foundUser.refreshToken = [...newRefreshTokenArray];
        // const result = await foundUser.save();
        // console.log(`result : `, result);
      }
      if (error || foundUser.username !== decoded.username)
        return res.status(403);
      console.log("decoded(inner) : ", decoded);
      // 1) issue the accessToken and refreshToken
      // const roles = Object.values(foundUser.roles);
      // const accessToken = jwt.sign(
      //   { UserInfo: { username: decoded.username, roles: roles } },
      //   process.env.ACCESS_TOKEN_SECRET,
      //   { expiresIn: "10s" }
      // );
      // const newRefreshToken = jwt.sign(
      //   { username: foundUser.username },
      //   process.env.REFRESH_TOKEN_SECRET,
      //   { expiresIn: "1m" }
      // );
      // 2) save a newRefreshTokenArray in database
      // foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      // const result = await foundUser.save();
      // console.log("result : ", result);
      // 3) set the response
      // res.cookie("jwt", newRefreshToken, {
      //   httpOnly: true,
      //   sameSite: "None",
      //   secure: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // }); // input value of maxAge is one day.
      // res.json({ roles, accessToken, newRefreshToken });
    }
  );
  // console.log("decoded(outer) : ", decoded);
  // issue the new tokens
  const newAccessToken = jwt.sign(
    { username: foundUser.name },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
  const newRefreshToken = jwt.sign(
    { username: foundUser.name },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  // save the issued tokens
  // foundUser.accessToken = newAccessToken;
  foundUser.refreshToken = newRefreshToken;
  const savedUser = await foundUser.save();
  console.log("\x1b[32msavedUser : ", savedUser);
  // set the payload
  res.setHeader("Set-Cookie", [
    // `accessToken=${newAccessToken};path=/`,
    `refreshToken=${newRefreshToken};path=/`,
  ]);
  res.status(200).json({
    username: foundUser.name,
    accessToken: newAccessToken,
    // refreshToken: newRefreshToken,
  });
  console.log("accessToken : ", newAccessToken);
  console.log("");
}
