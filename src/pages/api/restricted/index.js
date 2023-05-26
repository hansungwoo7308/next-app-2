// import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import jwt from "jsonwebtoken";
import verifyJWT from "lib/server/verifyJWT";
export default async function index(req, res) {
  // const session = await getServerSession(req, res, authOptions);
  // if (session) {
  //   res.send({
  //     content:
  //       "This is protected content. You can access this content because you are signed in.",
  //   });
  // } else {
  //   res.send({
  //     error:
  //       "You must be signed in to view the protected content on this page.",
  //   });
  // }
  console.log("\x1b[32m");
  console.log("[api/restricted]");
  const result = verifyJWT(req, res);
  console.log("result : ", result);
  // if (!result) return res.status(444).json("expired333");
  // return res.status(222).json(result);
  console.log("");
}
