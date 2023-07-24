import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { Main } from "@/styles/public/main.styled";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
export const getStaticPaths = (context: GetStaticPathsContext) => {
  const filenames: Array<string> = fs.readdirSync("data/");
  const filenamesWithMarkdown: Array<string> = filenames.filter((file) => file.endsWith(".md"));
  const filenamesWithMarkdownModified: Array<string> = filenamesWithMarkdown.map((file) =>
    file.replace(".md", "")
  );
  // const slugsWithFullPath = filenamesWithMarkdownModified.map((id) => "/posts/" + id);
  const paths: Array<object> = filenamesWithMarkdownModified.map((filename) => ({
    params: { id: filename },
  }));
  console.log("\x1b[32m\n[Server:getStaticPaths]/pages/posts");
  console.log("paths : ", paths);
  // console.log(
  //   "filenamesWithMarkdownModified : ",
  //   filenamesWithMarkdownModified
  // );
  return {
    paths: paths,
    fallback: false,
    // paths: string[]
  };
};
export const getStaticProps = (context: GetStaticPropsContext) => {
  const { id }: any = context.params;
  const content = fs.readFileSync(`data/${id}.md`, "utf8");
  const matterResult = matter(content);
  const item = {
    content: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
  };
  console.log("\x1b[32m\n[Server:getStaticProps]/pages/posts");
  console.log("context.params.id : ", id);
  return { props: { item } };
};
export default function Page({ item }: any) {
  return (
    <>
      <Main>
        <section>
          <div>
            <p>{item.date}</p>
            <h1>{item.title}</h1>
            <Markdown>{item.content}</Markdown>
          </div>
        </section>
      </Main>
    </>
  );
}
