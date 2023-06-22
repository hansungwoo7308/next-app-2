import verifyJWT from "lib/server/verifyJWT";
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/check]");
  switch (req.method) {
    case "GET":
      const verified = await verifyJWT(req, res);
      console.log("\x1b[33mverified : ", verified);
      // console.log("verified.success : ", verified.success);
      // console.log("verified.error : ", verified.error);
      // if (verified.error) console.log("verified.error : ", verified.error);
      if (verified.success) return res.status(200).json({ verified });
      if (verified.error) return res.status(403).json({ error: verified.error });
      break;
    default:
      break;
  }
  // const verified = verifyJWT(req, res);
  // if (verified)
  //   res.status(200).json({
  //     message: { message: "The accessToken was verified." },
  //     username: verified.username,
  //     accessToken: verified.accessToken,
  //   });
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
