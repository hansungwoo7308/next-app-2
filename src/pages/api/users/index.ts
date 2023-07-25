import verifyJWT from "lib/server/utils/verifyJWT";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/users]");
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      break;
    default:
      break;
  }
  // console.log("req.query.mode : ", req.query.mode);
  // if (req.query.mode === "general") {
  // }
  // if (req.query.mode === "nextauth") {
  //   const session = await getServerSession(req, res, authOptions);
  //   if (!session) {
  //     return res.status(401).json({ message: "You must be logged in." });
  //   }
  //   const users = ["nextauth1", "nextauth2"];
  //   console.log(`\x1b[33musers : ${users}`);
  //   return res.status(200).json({ message: "Success", users });
  // }
}
const getUsers = async (req: any, res: any) => {
  const verified: any = await verifyJWT(req, res);
  if (!verified) return res.status(401).json({ message: "Unauthorized" });
  const users = ["cat", "dog"];
  // out
  console.log({ users });
  return res.status(200).json({ users });
};
