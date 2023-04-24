import mongoose from "mongoose";

export default async function handler(req: any, res: any) {
  try {
    const result = await mongoose.disconnect();
    console.log("result : ", result);
  } catch (error) {
    console.log("error : ", error);
  }
  res.status(200).json({ message: "disconnected" });
}
