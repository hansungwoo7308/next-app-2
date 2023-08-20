import connectDB from "../../../../lib/server/config/connectDB";
import Post from "../../../../lib/server/models/Post";
connectDB();
export default async function handler(req: any, res: any) {
  console.log("\x1b[32m\n[api/posts/]");
  switch (req.method) {
    case "GET":
      await getPosts(req, res);
      break;
    case "POST":
      await createPost(req, res);
      break;
    case "DELETE":
      await deletePost(req, res);
      break;
    default:
      break;
  }
}
const getPosts = async (req: any, res: any) => {
  try {
    const foundPosts = await Post.find({});
    console.log(
      "foundPosts : ",
      foundPosts.map((post: any) => post._id)
    );
    return res.status(200).json({ posts: foundPosts });
  } catch (error) {
    console.log("getPosts error : ", error);
    return res.status(400).json(error);
  }
};
const createPost = async (req: any, res: any) => {
  try {
    const data = req.body;
    const newPost = await Post.create({
      title: data.title,
      content: data.content,
    });
    console.log("newPost : ", newPost);
    return res.status(200).json({ newPost });
  } catch (error) {
    console.log("create error : ", error);
    return res.status(400).json(error);
  }
};
const deletePost = async (req: any, res: any) => {
  const { _id } = req.body;
  try {
    const deletedPost = await Post.findByIdAndDelete(_id, { new: true });
    // const deletedPost = await Post.deleteOne({ title: { $in: title } });
    return res.status(200).json({ deletedPost });
  } catch (error) {
    console.log("delete error : ", error);
  }
};
