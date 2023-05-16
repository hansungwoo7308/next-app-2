import mongoose from "mongoose";
import User from "lib/client/model/User";
// import db from "../../../data/db.json";

const URI: any = process.env.MONGODB_URI;
const OPTIONS: any = {
  // dbName: "appleDB",
  dbName: "animalDB",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const users = [
  {
    id: 1,
    username: "dog",
    password: "123",
  },
  {
    id: 2,
    username: "cat",
    password: "123",
  },
  {
    id: 3,
    username: "monkey",
    password: "123",
  },
];

export default async function handler(req: any, res: any) {
  try {
    await mongoose.connect(URI, OPTIONS);
    console.log("mongoose connected...");
    await User.insertMany(users);
    // await Todo.insertMany(db.todos);
    // const payload = await User.find({}).populate("name").exec();
    // console.log("payload : ", payload);
    res.status(200).json({ message: "upload success" });
  } catch (error) {
    console.error("connection error : ", error);
  }
}
