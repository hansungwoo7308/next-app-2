import jwt from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  console.log("");
  console.log("api/authentication/check");

  // get the accessToken
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];
  console.log("accessToken : ", accessToken);

  // get the refreshToken
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken : ", refreshToken);
  // if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  // verify the accessToken
  // let verifiedToken;
  // try {
  //   const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  //   verifiedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  //   console.log("verifiedToken : ", verifiedToken);
  // } catch (error) {
  //   console.log("error : ", error);
  //   return res.status(403).json({ message: "Forbidden" });
  // }

  // console.log("verifiedToken : ", verifiedToken);
  // res.status(200).json({ verifiedToken, message: "You are logged in." });
  // res.status(200).json({ refreshToken, message: "You are logged in." });
  res.status(200).json({ accessToken, refreshToken });
  console.log("");
}
