import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import { useEffect, useRef, useState } from "react";

import fs from "fs";
import matter from "gray-matter";
import axios from "axios";

import Modal from "../../components/Modal";
import { Main } from "@/styles/posts.styled";
import MarkdownPostList from "@/components/list/MarkdownPostList";
import PostList from "@/components/list/PostList";
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
export default function Page({ itemsWithContents }: any) {
  // Related to PostList
  const [posts, setPosts]: any = useState([]);
  // console.log("posts : ", posts);
  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      const data = await response.data;
      setPosts(data);
    } catch (error) {
      console.log("getPosts error : ", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const handleDelete = async (title: any) => {
    // console.log("title : ", title);
    try {
      const result = await axios.delete("/api/posts", { data: { title } });
      console.log("delete result : ", result);
    } catch (error) {
      console.log("delete error : ", error);
    }
    getPosts();
  };
  // const openModal = () => {
  //   modalBackgroundRef.current.style.display = "block";
  //   modalBackgroundRef.current.style.background = "rgba(0,0,0,0.5)";
  //   modalRef.current.style.display = "block";
  // };
  // const closeModal = () => {
  //   modalBackgroundRef.current.style.display = "none";
  //   modalRef.current.style.display = "none";
  // };
  // Related to Modal
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCreate = async ({ title, content }: any) => {
    try {
      await axios.post("/api/posts", { title, content });
    } catch (error) {
      console.log("createPost error : ", error);
    }
    getPosts();
  };
  useEffect(() => {
    console.log("isOpen: ", isOpen);
  }, [isOpen]);
  renderCount++;
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <PostList list={posts} open={handleOpen} deleteItem={handleDelete} />
          {isOpen && <Modal close={handleClose} create={handleCreate} />}
          {/* <MarkdownPostList list={itemsWithContents} /> */}
        </section>
      </Main>
    </>
  );
}
