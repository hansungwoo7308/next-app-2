import connectDB from "../../../../lib/config/connectDB";
import Post from "../../../../lib/core/model/Post";
export default async function handler(req: any, res: any) {
  console.log("\x1b[32m");
  console.log("[Server]/api/posts/");
  // connect to database
  try {
    await connectDB();
  } catch (error) {
    console.log("connection error : ", error);
  }
  // get posts
  if (req.method === "GET") {
    // console.log("[Server]/api/posts/");
    try {
      const foundPosts = await Post.find({});
      console.log("foundPosts : ", foundPosts);
      res.status(200).json(foundPosts);
    } catch (error) {
      console.log("getPosts error : ", error);
      res.status(400).json(error);
    }
  }
  // create a post
  if (req.method === "POST") {
    // console.log("[Server]/api/posts/");
    // get the request data
    const data = req.body;
    try {
      const newPost = await Post.create({
        title: data.title,
        content: data.content,
      });
      console.log("newPost : ", newPost);
      res.status(200).json({ newPost });
    } catch (error) {
      console.log("create error : ", error);
      res.status(400).json(error);
    }
  }
  // delete the post
  if (req.method === "DELETE") {
    // console.log("req.body : ", req.body);
    const { title } = req.body;
    console.log("data to delete : ", title);
    try {
      const result = await Post.deleteOne({ title: { $in: title } });
      console.log("delete result : ", result);
    } catch (error) {
      console.log("delete error : ", error);
    }
    res
      .status(200)
      .json({ message: "Successfully deleted.", deletedData: title });
  }
  console.log("");
}