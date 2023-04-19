import mongoose from "mongoose";
import Todo from "lib/core/model/Todo";
import db from "../../../data/db.json";
// import User from "lib/core/model/User";

const URI: any = process.env.MONGODB_URI;
const OPTIONS: any = {
  dbName: "bananaDB",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default async function handler(req: any, res: any) {
  try {
    await mongoose.connect(URI, OPTIONS);
    console.log("mongoose connected...");
    await Todo.insertMany(db.todos);
    // const payload = await User.find({}).populate("name").exec();
    // console.log("payload : ", payload);
    res.status(200).json({ success: true, payload: db });
  } catch (error) {
    console.error("connection error : ", error);
  }
}
