import connectDB from "lib/server/config/connectDB";
import User from "lib/server/model/User";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/v2/auth/signup]\x1b[0m");
  // console.log("req.method : ", req.method);
  // get the payload
  const { name, email, password, passwordConfirm } = req.body;
  // check the method
  if (req.method !== "POST")
    return res.status(400).json({ message: "Your request is not POST method." });
  // check for duplicate name in the database
  const duplicatedUser = await User.findOne({ name: name }).exec();
  if (duplicatedUser) {
    // Conflict(충돌) // 새로운 사용자등록하려는데, 데이터베이스에 이미 있는 경우는 에러코드를 설정한다.
    console.log("\x1b[31mduplicatedUser exist.\x1b[0m");
    return res.status(409).end();
  }
  // create a new User
  // console.log("\x1b[33mCreating a new User...\x1b[0m");
  try {
    const newUser = await User.create({ name, email, password, role: "admin" });
    console.log("\x1b[33mnewUser : ", newUser);
    console.log("");
    // set the response
    res.status(201).json({ message: "New user created.", newUser: newUser, success: true });
  } catch (error: any) {
    console.error(`\x1b[31mCreation Error : \x1b[0m`, error);
    console.log("");
    // set the response
    res.status(500).json({ message: error.message });
  }
}
