import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "../../components/Modal";
import axios from "axios";
import { Main } from "@/styles/posts.styled";
import Link from "next/link";
// import getFormattedDate from "@/lib/getFormattedDate"
// import { getSortedPostsData, getPostData } from "@/lib/posts"

// import fs from "fs";
// import matter from "gray-matter";
// // import { PostMetaData } from "types/postMetaData";
// import { PostMetaData } from "../../../types/PostMetaData";
// export const getStaticPaths = (context: any) => {
//   // const slugs = markDownPosts.map((file) => file.replace(".md", ""));
//   // const slugsWithFullPath = slugs.map((slug) => "/posts/" + slug);
//   // const slugsWithParams = slugs.map((slug) => ({
//   //   params: {
//   //     slug: slug,
//   //   },
//   // }));
//   console.log("");
//   //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
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
// export const getStaticProps = (context: any) => {
//   // get the files
//   const files = fs.readdirSync("data/");
//   // get the files with markdown
//   const filesWithMarkDown = files.filter((file) => file.endsWith(".md"));
//   // get items with the contents from third party library
//   const itemsWithContents: PostMetaData[] = filesWithMarkDown.map(
//     (fileName) => {
//       const contents = fs.readFileSync(`data/${fileName}`, "utf-8");
//       const matterResult = matter(contents);
//       // return an item
//       return {
//         title: matterResult.data.title,
//         date: matterResult.data.date,
//         subtitle: matterResult.data.subtitle,
//         slug: fileName.replace(".md", ""),
//       };
//     }
//   ) as [];
//   //   console.log("\x1b[32mcontext in getStaticProps : %s\x1b[0m", context);
//   //   console.log("\x1b[32mcontext : %s\x1b[0m", context);
//   //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
//   //   console.log("\x1b[32mfilesWithMarkDown : %s\x1b[0m", filesWithMarkDown);
//   //   console.log("\x1b[32mposts : %s\x1b[0m", posts);
//   // console.log("");
//   // itemsWithContents.map((item) =>
//   //   console.log("\x1b[32mitem : %s\x1b[0m", item)
//   // );
//   // console.log("files : ", files);
//   // console.log("");
//   return {
//     props: {
//       itemsWithContents,
//     },
//   };
// };
// variables
let renderCount = 0;
renderCount++;
export default function Posts({ itemsWithContents }: any) {
  // internal
  const [posts, setPosts]: any = useState([]);
  const modalRef: any = useRef();
  const modalBackgroundRef: any = useRef();
  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      const data = await response.data;
      setPosts(data);
    } catch (error) {
      console.log("getPosts error : ", error);
    }
  };
  const createPost = async ({ title, content }: any) => {
    try {
      await axios.post("/api/posts", { title, content });
    } catch (error) {
      console.log("createPost error : ", error);
    }
    getPosts();
  };
  const deletePost = async (title: any) => {
    // console.log("title : ", title);
    try {
      const result = await axios.delete("/api/posts", { data: { title } });
      console.log("delete result : ", result);
    } catch (error) {
      console.log("delete error : ", error);
    }
    getPosts();
  };
  const openModal = () => {
    modalBackgroundRef.current.style.display = "block";
    modalBackgroundRef.current.style.background = "rgba(0,0,0,0.5)";
    modalRef.current.style.display = "block";
  };
  const closeModal = () => {
    modalBackgroundRef.current.style.display = "none";
    modalRef.current.style.display = "none";
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <div>
            <ul>
              {posts.map((post: any, index: any) => (
                <li key={index}>
                  <Link href={`post-list-2/${post.title}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <p>{post.content}</p>
                  <button
                    onClick={(e: any) => {
                      e.preventDefault();
                      deletePost(post.title);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <button onClick={openModal}>Create a post</button>
            </div>
          </div>
          <div ref={modalBackgroundRef} onClick={closeModal} />
          <Modal
            modalRef={modalRef}
            createPost={createPost}
            closeModal={closeModal}
          />
        </section>
      </Main>
    </>
  );
}
