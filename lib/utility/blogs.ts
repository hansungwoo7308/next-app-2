import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

const BLOG_DIRECTORY = join(process.cwd(), "/content/blogs");

const filenames = fs
  .readdirSync(BLOG_DIRECTORY)
  .filter((filename) => filename.endsWith(".md"));
const blogs = filenames.map((filename, index) => {
  const contents = fs.readFileSync(`data/blogs/${filename}`, "utf-8");
  const matterResult = matter(contents);
  return {
    index: index,
    date: matterResult.data.date,
    title: matterResult.data.title,
    blog: filename.replace(".md", ""),
  };
});

// const contents = getContents(BLOG_DIRECTORY)

export default {
  filenames: filenames,
  blogs: blogs,
};
