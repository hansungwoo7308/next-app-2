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
  // const filename = context.params["post-item"];
  const { "post-item": filename }: any = context.params;
  // console.log("filename : ", filename);
  const content = fs.readFileSync(`data/posts/${filename}.md`, "utf-8");
  // matter : markdown file 내부의 header 부분의 title, date... 등을 객체형태로 가지고 오기위한 모듈?
  const matteredContent = matter(content);
  // console.log("matteredContent : ", matteredContent);
  // console.log("content : ", content);
  // console.log("context.params : ", context.params);
  // const filenames = fs.readFileSync(`data/posts/${}`)
  const postItem = {
    filename,
    date: matteredContent.data.date,
    content: matteredContent.content,
  };
  return { props: { postItem } };
}
export default function index({ postItem }: any) {
  return (
    <Main>
      <section>
        <div>
          <div>
            <h5>{postItem.date}</h5>
            <h1>{postItem.filename}</h1>
          </div>
          <Markdown>{postItem.content}</Markdown>
        </div>
      </section>
    </Main>
  );
}
