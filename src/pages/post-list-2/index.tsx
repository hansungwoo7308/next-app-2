import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "../../components/Modal";
import { Main } from "@/styles/posts.styled";
import { GetStaticPropsContext } from "next";
// import getFormattedDate from "@/lib/getFormattedDate"
// import { getSortedPostsData, getPostData } from "@/lib/posts"
// // import { PostMetaData } from "types/postMetaData";
// import { PostMetaData } from "../../../types/PostMetaData";
export const getStaticProps = (context: GetStaticPropsContext) => {
  console.log("\x1b[32m");
  console.log("[Server:getStaticProps]/pages/post-list-2");
  // get the filenames
  const filenames: Array<string> = fs.readdirSync("data/posts");
  // console.log("filenames : ", filenames);
  // get the filenames with markdown
  const filenamesWithMarkdown: Array<string> = filenames.filter((filename) =>
    filename.endsWith(".md")
  );
  // console.log("filenamesWithMarkdown : ", filenamesWithMarkdown);
  // get items with the contents from third party library
  const itemsWithContents: Array<object> = filenamesWithMarkdown.map(
    (filename) => {
      const contents = fs.readFileSync(`data/posts/${filename}`, "utf-8");
      const matterResult = matter(contents);
      // console.log(`${filename} contents : `, contents);
      // console.log(`${filename} mattered contents : `, matterResult);

      // return an item
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        filename: filename.replace(".md", ""),
        // subtitle: matterResult.data.subtitle,
        // slug: filename.replace(".md", ""),
      };
    }
  );
  console.log("itemsWithContents : ", itemsWithContents);
  console.log("");
  return {
    props: {
      itemsWithContents,
    },
  };
};
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
  // useEffect(() => {
  //   getPosts();
  // }, []);
  renderCount++;
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
              {itemsWithContents.map((item: any, index: any) => (
                <li key={index}>
                  <h5>{item.date}</h5>
                  <Link href={`post-list-2/${item.filename}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  {/* <button
                    onClick={(e: any) => {
                      e.preventDefault();
                      // deletePost(post.title);
                    }}
                  >
                    Delete
                  </button> */}
                </li>
              ))}
              {/* {posts.map((post: any, index: any) => (
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
              ))} */}
            </ul>
            <div>
              <button onClick={openModal}>Create a post</button>
            </div>
          </div>
          {/* <div ref={modalBackgroundRef} onClick={closeModal} />
          <Modal
            modalRef={modalRef}
            createPost={createPost}
            closeModal={closeModal}
          /> */}
        </section>
      </Main>
    </>
  );
}
