import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { PostMetaData } from "../../../types/PostMetaData";
import { GetStaticPropsContext } from "next";
import { Main } from "@/styles/posts.styled";
import PostListWithMarkdown from "@/components/list/PostListWithMarkdown";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import getFormattedDate from "@/lib/getFormattedDate"
// import { getSortedPostsData, getPostData } from "@/lib/posts"
// // import { PostMetaData } from "types/postMetaData";
// export const getStaticPaths = (context: any) => {
//   // const slugs = markDownPosts.map((file) => file.replace(".md", ""));
//   // const slugsWithFullPath = slugs.map((slug) => "/posts/" + slug);
//   // const slugsWithParams = slugs.map((slug) => ({
//   //   params: {
//   //     slug: slug,
//   //   },
//   // }));
//   console.log("\x1b[32m");
//   console.log("[Server:Static-Site-Generate]/pages/posts");
//   // console.log("filenames : %s\x1b[0m", filenames);
//   //   console.log("\x1b[32mmarkDownPosts : %s\x1b[0m", markDownPosts);
//   //   console.log("\x1b[32mslugs : %s\x1b[0m", slugs);
//   // console.log("\x1b[32mslugsWithDir : %s\x1b[0m", slugsWithFullPath);
//   // console.log("\x1b[32mslugsWithParams : %s\x1b[0m", slugsWithParams);
//   console.log("");
//   return {
//     // paths: [{ params: { slug: "data1" } }],
//     //   paths: slugsWithParams,
//     paths: [
//       "/posts",
//       //   "/posts/data2",
//       //   "/posts/data3",
//       //   "/posts/data4",
//       //   "/posts/data5",
//     ],
//     fallback: false,
//   };
// };
export const getStaticProps = (context: GetStaticPropsContext) => {
  console.log("\x1b[32m");
  console.log("[Server:getStaticProps]/pages/posts");
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
  console.log("");
  return { props: { list } };
};
let renderCount = 0;
renderCount++;
export default function Posts({ list }: any) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <PostListWithMarkdown list={list} path={"posts"} />
        </section>
      </Main>
    </>
  );
}
