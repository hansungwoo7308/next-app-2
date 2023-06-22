import verifyJWT from "lib/server/verifyJWT";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/users]");
  // console.log("req.query.mode : ", req.query.mode);
  // console.log("req.url", req.url);
  if (req.query.mode === "general") {
    // console.log("general...");
    const verified: any = await verifyJWT(req, res);
    if (verified.success) {
      const users = ["cat", "dog"];
      console.log(`\x1b[33musers : ${users}`);
      return res.status(200).json({ users });
    } else if (verified.error) {
      return res.status(401).json({ error: verified.error });
    }
  }
  if (req.query.mode === "nextauth") {
    // console.log("nextauth...");
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "You must be logged in." });
    }
    const users = ["nextauth1", "nextauth2"];
    console.log(`\x1b[33musers : ${users}`);
    return res.status(200).json({ message: "Success", users });
  }
}
