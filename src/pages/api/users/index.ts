import verifyJWT from "lib/server/verifyJWT";

export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/users]");
  const decoded = verifyJWT(req, res);

  if (decoded)
    res.status(200).json({
      message: { message: "The accessToken was verified" },
      users: ["cat", "dog"],
      // decoded: decoded,
      // username: decoded.username,
      // email: decoded.email,
      // slicedTokens: {
      //   accessToken: accessToken.slice(-5),
      // },
    });
}
