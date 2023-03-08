import User from "../../../lib/core/model/User";
import mongoose from "mongoose";

export default async function handler(req, res) {
  // log
  console.log("");
  console.log("\x1b[32mapi/auth/signin\x1b[0m");

  // get the data
  const { email, password } = req.body;

  // // connect to database
  // try {
  //   await mongoDB;
  //   console.log(`\x1b[33mConnected to bananaDB\x1b[0m`);
  // } catch (error) {
  //   console.error(`\x1b[31mConnection Error : \x1b[0m`, error);
  // }

  // // find the user
  console.log("\x1b[33mFinding a User...\x1b[0m");
  const foundUser = await User.findOne({ email });
  // const foundUser = await User.find(
  //   (user) => user.email === email && user.password === password
  // );
  if (!foundUser) {
    console.log("\x1b[31mfoundUser does not exist.");
    return res
      .status(404)
      .json({ message: "foundUser does not exist in bananaDB" });
  }
  console.log("\x1b[33mfoundUser : ", foundUser);

  // set the response
  res.status(200).json({ message: "You are signed in.", foundUser });
  console.log("");
}
