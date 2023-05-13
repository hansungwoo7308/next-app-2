import { GetServerSidePropsContext } from "next";
import fs from "fs";
import matter from "gray-matter";
import { Main } from "@/styles/public/main.styled";
import Markdown from "markdown-to-jsx";
type Props = {
  params: {
    "post-item": string;
  };
};
export function getServerSideProps(context: GetServerSidePropsContext) {
  const { "post-item": filename }: any = context.params;
  // const content = fs.readFileSync(`data/posts/${filename}.md`, "utf-8");
  // const matteredContent = matter(content);
  // console.log("matteredContent : ", matteredContent);
  // console.log("content : ", content);
  // console.log("context.params : ", context.params);
  // const filenames = fs.readFileSync(`data/posts/${}`)
  // const postItem = {
  //   filename,
  //   date: matteredContent.data.date,
  //   content: matteredContent.content,
  // };
  const postItem = { filename };
  return { props: { postItem } };
}
export default function index({ postItem }: any) {
  return (
    <Main>
      <section>
        <div>
          <div>
            {/* <h5>{postItem.date}</h5> */}
            <h1>{postItem.filename}</h1>
          </div>
          {/* <Markdown>{postItem.content}</Markdown> */}
        </div>
      </section>
    </Main>
  );
}
