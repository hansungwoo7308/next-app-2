import verifyJWT from "lib/server/utils/verifyJWT";
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/authentication/check]");
  switch (req.method) {
    case "GET":
      const verified = await verifyJWT(req, res);
      if (verified) return res.status(200).json({ verified });
    // console.log("\x1b[33mverified : ", verified);
    // break;
    default:
      break;
  }
}
