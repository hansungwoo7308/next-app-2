import Head from "next/head";
import Link from "next/link";

import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";

export const getStaticPaths = (context: any) => {
  const filenames = fs
    .readdirSync("data/blogs/")
    .filter((filename) => filename.endsWith(".md")) // only get the markdown files
    .map((filename) => ({ params: { blog: filename.replace(".md", "") } }));

  //   console.log("");
  //   filenames.map((filename) =>
  //     console.log("\x1b[32mfilename.params : %s\x1b[0m", filename.params)
  //   );
  //   console.log("");

  return {
    // paths: [{ params: { blog: "test" } }],
    paths: filenames,
    fallback: false,
  };
};

export const getStaticProps = (context: any) => {
  const content = fs.readFileSync(
    `data/blogs/${context.params.blog}.md`,
    "utf-8"
  );
  const matterResult = matter(content);

  console.log("");
  //   console.log("\x1b[32mmatterResult : %s\x1b[0m", matterResult.content);
  //   console.log("context.params.blog : ", context.params.blog);
  console.log("");

  return {
    props: {
      blog: {
        date: matterResult.data.date,
        title: matterResult.data.title,
        content: matterResult.content,
      },
      //   test: "test",
    },
  };
};

const Blog = ({ blog }: any) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className="blog">
        <section>
          <div>
            <p>{blog.date}</p>
            <h1>{blog.title}</h1>
            <Markdown>{blog.content}</Markdown>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
