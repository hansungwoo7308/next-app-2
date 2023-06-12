import jwt from "jsonwebtoken";
export default function verifyJWT(req: any, res: any) {
  console.log("[lib/server/verifyJWT]");
  // get the tokens
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  if (!accessToken) {
    console.log("\x1b[31mNo accessToken");
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("accessToken : ", accessToken?.slice(-5));
  // if (!authorization?.startsWith("Bearer ")) {
  // }
  // verify the tokens
  const accessSecret: any = process.env.ACCESS_TOKEN_SECRET;
  const result: any = jwt.verify(accessToken, accessSecret, (error: any, decoded: any) => {
    if (error) {
      console.log(`\x1b[31mThe accessToken was expired.\x1b[0m`);
      res.status(403).json({ message: "The accessToken was expired." });
      return false;
    }
    console.log("decoded : ", decoded);
    console.log("\x1b[34mThe accessToken was verified\x1b[0m");

    return decoded;
  });
  return result;
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
