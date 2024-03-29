import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";

export function getStaticPaths(context: any) {
  const paths = fs
    .readdirSync("data/blogs/")
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({ params: { blog: filename.replace(".md", "") } }));

  return {
    paths: paths,
    fallback: false,
    // paths: [{ params: { blog: "test" } }],
  };
}

export function getStaticProps(context: any) {
  console.log("\x1b[32m\n[/blogs/[id]]");
  const content = fs.readFileSync(`data/blogs/${context.params.blog}.md`, "utf-8");
  const matterResult = matter(content);

  return {
    props: {
      blog: {
        date: matterResult.data.date,
        title: matterResult.data.title,
        content: matterResult.content,
      },
    },
  };
}

export default function Page({ blog }: any) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Main>
        <section>
          <div>
            <p>{blog.date}</p>
            <h1>{blog.title}</h1>
            <Markdown>{blog.content}</Markdown>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 80%;
      min-width: 500px;
      /* max-width: 800px; */
      outline: 3px solid coral;
    }
  }
`;
