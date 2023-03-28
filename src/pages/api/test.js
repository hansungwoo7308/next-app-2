import mongoose from "mongoose";
import User from "lib/core/model/User";

export default async function handler(req, res) {
  //   console.log("test handler");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "bananaDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoose connected...");
    const payload = await User.find({}).populate("name").exec();
    console.log("payload : ", payload);
    res.status(200).json({ success: true, payload });
  } catch (error) {
    console.error("connection error : ", error);
  }

  //   res.status(200).json({ message: "test message" });
}
