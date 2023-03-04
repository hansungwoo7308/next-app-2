import User from "../../../../lib/core/model/User";
import mongoDB from "../../../../lib/mongodb";

const usersDatabase = {
  users: [
    {
      email: "tom@tom",
      password: "123",
      name: "tom",
      role: "admin",
      id: "001",
    },
    {
      email: "jack@jack",
      password: "123",
      name: "jack",
      role: "user",
      id: "002",
    },
  ],
  setUsers(data) {
    this.users = data;
  },
  addUser(data) {
    this.users = [...this.users, data];
  },
};

export default async function handler(req, res) {
  // log
  console.log("");
  console.log("\x1b[32mapi/auth/signin\x1b[0m");

  // get the data
  const { email, password } = req.body;

  // connect to database
  try {
    await mongoDB;
    console.log(`\x1b[33mConnected to bananaDB\x1b[0m`);
  } catch (error) {
    console.error(`\x1b[31mConnection Error : \x1b[0m`, error);
  }

  // find the user
  console.log("\x1b[33mCreating a new User...\x1b[0m");
  const foundUser = await User.find(
    (user) => user.email === email && user.password === password
  );
  if (!foundUser) {
    console.log("\x1b[31mfoundUser does not exist.");
    return res
      .status(404)
      .json({ message: "foundUser does not exist in bananaDB" });
  }
  console.log("\x1b[33mfoundUser : ", foundUser);

  // set the response
  res.status(200).json(foundUser);
  console.log("");
}
