import mongoose from "mongoose";

// make a schema
const postSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

// make a model
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
