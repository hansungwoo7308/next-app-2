import User from "lib/core/model/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  console.log("");
  console.log("api/authentication");
  // get the request
  const cookies = req.cookies;
  console.log("cookies : ", cookies);

  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });
  // console.log("username : ", username);
  // console.log("password : ", password);

  // connect to db
  try {
    const URI: any = process.env.MONGODB_URI;
    const OPTIONS = { dbName: "animalDB" };
    await mongoose.connect(URI, OPTIONS);
  } catch (error) {
    console.log("connection error : ", error);
  }

  // find the username
  const foundUser = await User.findOne({ username }).exec();
  console.log("foundUser : ", foundUser);
  if (!foundUser)
    return res
      .status(401)
      .json({ message: "Your name was not found in database." });

  // evaluate the password
  if (foundUser.password !== password)
    return res.status(401).json({ message: "Your password did not match" });

  // issue tokens
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  const accessToken = jwt.sign(
    { username: foundUser.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  foundUser.accessToken = accessToken;
  foundUser.refreshToken = refreshToken;
  const savedUser = await foundUser.save();
  console.log("savedUser : ", savedUser);

  // set the response
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken}`
    // `refreshToken=${refreshToken};httpOnly`
    // `refreshToken=${refreshToken};HttpOnly;SameSite=None`
  );
  res.json({ accessToken, message: "You are logged in." });
  // res.json({ accessToken, message: "You are logged in." });
  // res.status(200).json({ ...req.body, accessToken: "jwt..." });
  console.log("");
}
