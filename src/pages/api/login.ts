import User from "lib/core/model/User";
import mongoose from "mongoose";

export default async function handler(req: any, res: any) {
  // console.log("req.cookies : ", req.cookies);
  // console.log("req.body : ", req.body);

  // get the request
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });
  // console.log("username : ", username);
  // console.log("password : ", password);

  // connect to db
  const URI: any = process.env.MONGODB_URI;
  const OPTIONS = { dbName: "animalDB" };
  await mongoose.connect(URI, OPTIONS);

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
  const accessToken = "accessToken";
  const refreshToken = "refreshToken";
  foundUser.refreshToken = refreshToken;
  const savedUser = await foundUser.save();
  console.log("savedUser : ", savedUser);

  // set the response
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken};HttpOnly;SameSite=None`
  );
  res.json({ accessToken, message: "You are logged in." });
  // res.status(200).json({ ...req.body, accessToken: "jwt..." });
}
