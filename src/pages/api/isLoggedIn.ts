import jwt from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  console.log("");
  console.log("api/isLoggedIn");
  // get the accessToken
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];

  // verify the accessToken
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    console.log("verifiedToken : ", verifiedToken);
  } catch (error) {
    console.log("error : ", error);
    return res.status(403).json({ message: "Forbidden" });
  }

  //   const refreshToken = req.cookies.refreshToken;
  //   console.log("refreshToken : ", refreshToken);
  res.status(200).json({ verifiedToken, message: "You are logged in." });
  console.log("");
}
