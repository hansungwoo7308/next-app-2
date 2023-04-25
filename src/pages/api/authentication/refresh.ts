import User from "lib/core/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  console.log("");
  console.log("api/authentication/refresh");

  // get the refreshToken
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken : ", refreshToken);
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  if (!cookies?.refreshToken)
    return res.status(401).json({ message: "Unauthorized" });
  res.status(200).json({ message: "test......." });
  console.log("");
}
