import jwt from "jsonwebtoken";
export default function verifyJWT(req: any, res: any) {
  console.log("[lib/server/verifyJWT]");
  // get the authorization header
  const authorization = req.headers.authorization || req.headers.Authorization;
  // console.log("authorization : ", authorization);
  if (!authorization?.startsWith("Bearer ")) return "unauthorized";
  // get the accessToken
  const accessToken = authorization.split(" ")[1];
  console.log("accessToken : ", accessToken);
  if (!accessToken) {
    res.status(401).json("Unauthorized");
    return "unauthorized";
  }
  // verify the accessToken
  const secret: any = process.env.ACCESS_TOKEN_SECRET;
  const decoded = jwt.verify(
    accessToken,
    secret,
    (error: any, decoded: any) => {
      if (error) {
        console.log("error : ", error);
        res.status(403).json(error);
        return "Forbidden";
      }
      console.log("decoded : ", decoded);
      res.status(200).json({ email: decoded.email });
      return decoded.email;
    }
  );
  return decoded;
}
