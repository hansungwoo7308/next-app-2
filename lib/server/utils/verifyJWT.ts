import jwt from "jsonwebtoken";

export default async function (req: any, res: any) {
  console.log("\x1b[32m[lib/server/verifyJWT]");

  // get the accessToken
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  console.log({ accessToken });
  if (!accessToken) {
    console.log("\x1b[31mNo accessToken");
    return false;
  }

  // verify the tokens
  try {
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log("\x1b[32mverified : ", verified);
    // console.log("verified");
    return verified;
  } catch (error: any) {
    console.log(`\x1b[31merror : ${error}`);
    return res.status(403).json({ error });
  }
}
