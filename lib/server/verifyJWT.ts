import jwt from "jsonwebtoken";
export default function verifyJWT(req: any, res: any) {
  console.log("[lib/server/verifyJWT]");
  // get the accessToken
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return console.log("\x1b[31mNo accessToken, No Authorization Header");
  }
  const accessToken = authorization.split(" ")[1];
  console.log("accessToken : ", accessToken.slice(-5));
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // verify the accessToken
  const accessSecret: any = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(accessToken, accessSecret, (error: any, decoded: any) => {
    if (error) {
      console.log(`\x1b[31merror : ${error.message}\x1b[0m`);
      return res.status(403).json(error);
    }
    console.log("decoded : ", decoded);
    console.log("\x1b[34mmessage : The accessToken was verified\x1b[0m");
    return res.status(200).json({
      message: { message: "The accessToken was verified" },
      decoded: decoded,
      // accessToken,
      // refreshToken: "",
      username: decoded.username,
      email: decoded.email,
      slicedTokens: {
        accessToken: accessToken.slice(-5),
        refreshToken: "",
      },
    });
  });
}
