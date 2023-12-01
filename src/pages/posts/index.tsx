import Head from "next/head";
import getMarkdown from "lib/server/getMarkdown";
import PostListWithMarkdown from "@/components/post/list/PostListWithMarkdown";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { GetStaticPropsContext } from "next";
import styled from "styled-components";
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
  const list = getMarkdown("data");
  // const list = getMarkdown("data/posts");
  console.log("\x1b[32m\n[/posts]");
  console.log("Markdown list : ", list);
  return { props: { list } };
};

export default function Page({ list }: any) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <PostListWithMarkdown list={list} path={"posts"} />
        </section>
      </Main>
    </>
  );
}

const Main = styled(PublicMain)`
  > section {
    > div {
      width: 80%;
      max-width: 800px;
      height: 50vh;
      outline: 3px solid green;
    }
  }
`;
