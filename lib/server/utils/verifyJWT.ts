import jwt from "jsonwebtoken";
export default async function (req: any, res: any) {
  console.log("\x1b[32m[lib/server/verifyJWT]");
  // get the accessToken
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  if (!accessToken) {
    console.log("\x1b[31mNo accessToken");
    // return res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  // console.log("accessToken : ", accessToken?.slice(-5));
  // verify the tokens
  try {
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log("\x1b[32mverified : ", verified);
    return verified;
  } catch (error: any) {
    console.log(`\x1b[31merror : ${error}`);
    // res.status(403).json({ error });
    return false;
    // return error;
  }
  // return verified;
  // if (verifiedAccessToken) return console.log("verifiedAccessToken");
  // const refreshSecret: any = process.env.REFRESH_TOKEN_SECRET;
  // const verifiedRefreshToken: any = jwt.verify(
  //   refreshToken,
  //   refreshSecret,
  //   (error: any, decoded: any) => {
  //     if (error) {
  //       console.log(`\x1b[31mThe refreshToken was expired.\x1b[0m`);
  //       res.status(403).json({ message: "The refreshToken was expired." });
  //       return false;
  //     }
  //     console.log("decoded : ", decoded);
  //     console.log("\x1b[34mThe refreshToken was verified\x1b[0m");
  //     res.status(200).json({
  //       message: { message: "The refreshToken was verified" },
  //       decoded: decoded,
  //       username: decoded.username,
  //       email: decoded.email,
  //       slicedTokens: {
  //         refreshToken: refreshToken.slice(-5),
  //       },
  //     });
  //     return true;
  //   }
  // );
  // if (verifiedRefreshToken) return console.log("verifiedRefreshToken");
}
