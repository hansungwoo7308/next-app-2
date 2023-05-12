import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { PostMetaData } from "../../../types/PostMetaData";
import { Main } from "@/styles/posts.styled";
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
//   // console.log("files : %s\x1b[0m", files);
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
export const getStaticProps = (context: any) => {
  // get the files from directory
  const files: Array<string> = fs.readdirSync("data/");
  console.log("files : ", files);
  // get the markdown files
  const filesWithMarkDown = files.filter((file) => file.endsWith(".md"));
  console.log("filesWithMarkDown : ", filesWithMarkDown);
  // get items with the contents from third party library
  const itemsWithContents: PostMetaData[] = filesWithMarkDown.map(
    (fileName) => {
      const contents = fs.readFileSync(`data/${fileName}`, "utf-8");
      const matterResult = matter(contents);
      // return an item
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        subtitle: matterResult.data.subtitle,
        slug: fileName.replace(".md", ""),
      };
    }
  ) as [];
  //   console.log("\x1b[32mcontext in getStaticProps : %s\x1b[0m", context);
  //   console.log("\x1b[32mcontext : %s\x1b[0m", context);
  //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
  //   console.log("\x1b[32mfilesWithMarkDown : %s\x1b[0m", filesWithMarkDown);
  //   console.log("\x1b[32mposts : %s\x1b[0m", posts);
  // console.log("");
  // itemsWithContents.map((item) =>
  //   console.log("\x1b[32mitem : %s\x1b[0m", item)
  // );
  // console.log("files : ", files);
  // console.log("");
  return {
    props: {
      itemsWithContents,
    },
  };
};
let renderCount = 0;
renderCount++;
export default function Posts({ itemsWithContents }: any) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <div>
            {typeof window &&
              itemsWithContents.map((item: any, index: any) => (
                <Link key={index} href={`/posts/${item.slug}`}>
                  <h3>{item.date}</h3>
                  <h1>{item.title}</h1>
                </Link>
              ))}
          </div>
        </section>
      </Main>
    </>
  );
}
