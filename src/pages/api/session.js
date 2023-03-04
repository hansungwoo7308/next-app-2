import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth/[...nextauth]";

const SECRET = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // const token = await getToken({
  //   req,
  //   secret: SECRET,
  //   raw: true,
  // });

  console.log("");
  console.log("\x1b[32m/api/session\x1b[0m");
  // console.log("token : ", token);
  console.log("session : ", session);
  console.log("");

  // console.log("req.body : ", req.body);
  res.status(200).json({
    // id: 1,
    // email: req.body.email,
    // password: req.body.password,
    // role: "admin",
    // message: "/api/test...",
    session,
  });
}
