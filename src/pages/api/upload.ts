import mongoose from "mongoose";
import db from "../../../data/db.json";
// import Todo from "lib/core/model/Todo";
import User from "lib/core/model/User";

const URI: any = process.env.MONGODB_URI;
const OPTIONS: any = {
  dbName: "appleDB",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default async function handler(req: any, res: any) {
  try {
    await mongoose.connect(URI, OPTIONS);
    console.log("mongoose connected...");
    await User.insertMany(db.users);
    // await Todo.insertMany(db.todos);
    // const payload = await User.find({}).populate("name").exec();
    // console.log("payload : ", payload);
    res.status(200).json({ message: "upload success" });
  } catch (error) {
    console.error("connection error : ", error);
  }
}
