import verifyJWT from "lib/server/verifyJWT";
export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/check]");
  const decoded = verifyJWT(req, res);
  if (decoded)
    res.status(200).json({
      message: { message: "The accessToken was verified." },
    });
  // get the accessToken
  // const authorization = req.headers.authorization;
  // const accessToken = authorization.split(" ")[1];
  // console.log("accessToken : ", accessToken);
  // get the refreshToken
  // const cookies = req.cookies;
  // const refreshToken = cookies.refreshToken;
  // console.log("refreshToken : ", refreshToken);
  // if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  // res.status(200).json({ verifiedToken, message: "You are logged in." });
  // res.status(200).json({ refreshToken, message: "You are logged in." });
  // res.status(200).json({ refreshToken });
  // console.log("");
}
