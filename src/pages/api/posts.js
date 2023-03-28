import connectDB from "../../../lib/config/connectDB";
import Post from "../../../lib/core/model/Post";

export default async function handler(req, res) {
  // connect to database
  try {
    await connectDB();
  } catch (error) {
    console.log("connection error : ", error);
  }

  console.log("");
  console.log("/api/posts/");

  // get posts
  if (req.method === "GET") {
    console.log("req.method === 'GET'");
    try {
      console.log("Post.find({})");
      const result = await Post.find({});
      console.log("result : ", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("getPosts error : ", error);
      res.status(400).json(error);
    }
  }

  // create a post
  if (req.method === "POST") {
    // get the request data
    const data = req.body;
    console.log("req.method === 'POST'");
    try {
      console.log(`Post.create({${data}})`);
      const result = await Post.create({
        title: data.title,
        content: data.content,
      });
      console.log("result : ", result);
      res.json(200).json({ result });
    } catch (error) {
      console.log("create error : ", error);
      res.status(400).json(error);
    }
  }

  console.log("");
}
