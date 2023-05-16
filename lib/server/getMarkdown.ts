import fs from "fs";
import matter from "gray-matter";
import { PostMetaData } from "types/PostMetaData";

export default function getMarkdown() {
  // get the filenames
  const filenames: Array<string> = fs.readdirSync("data/");
  // console.log("filenames : ", filenames);
  // get the filenames with markdown
  const filenamesWithMarkdown: Array<string> = filenames.filter((filename) =>
    filename.endsWith(".md")
  );
  // console.log("filenamesWithMarkdown : ", filenamesWithMarkdown);
  // get items with the contents from third party library
  const list: Array<PostMetaData> = filenamesWithMarkdown.map((fileName) => {
    const contents = fs.readFileSync(`data/${fileName}`, "utf-8");
    const matterResult = matter(contents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      filename: fileName.replace(".md", ""),
      // subtitle: matterResult.data.subtitle,
    };
  }) as [];
  return list;
}
