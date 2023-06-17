import verifyJWT from "lib/server/verifyJWT";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/users]");
  console.log("req.url", req.url);
  console.log("req.query", req.query);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }
  return res.status(200).json({ message: "Success", users: ["nextauth1", "nextauth2"] });

  const decoded = verifyJWT(req, res);
  if (decoded) {
    const users = ["cat", "dog"];
    res.status(200).json({
      message: { message: "The accessToken was verified" },
      users,
    });
    console.log(`\x1b[33musers : ${users}`);
  }
}
