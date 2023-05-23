// import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
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
  const authorization = req.headers.authorization;
  const accessToken = authorization?.split(" ")[1];
  console.log("accessToken : ", accessToken);
  if (!accessToken) {
    console.log("");
    return res.status(200).json({ message: "Forbidden" });
  }
  console.log("");
  return res.status(200).json({ message: "Protected Data" });
}
