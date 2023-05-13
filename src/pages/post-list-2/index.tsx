import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import { useEffect, useRef, useState } from "react";

import fs from "fs";
import matter from "gray-matter";
import axios from "axios";

import Modal from "../../components/Modal";
import { Main } from "@/styles/pages/post-list.styled";
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
  const list: Array<object> = filenamesWithMarkdown.map((filename) => {
    const contents = fs.readFileSync(`data/posts/${filename}`, "utf-8");
    const matterResult = matter(contents);
    // console.log(`${filename} contents : `, contents);
    // console.log(`${filename} mattered contents : `, matterResult);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      filename: filename.replace(".md", ""),
    };
  });
  console.log("list : ", list);
  console.log("");
  return { props: { list } };
};
let renderCount = 0;
renderCount++;
export default function Page({ list }: any) {
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
  useEffect(() => {
    getPosts();
  }, []);

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

  renderCount++;
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <PostList
            list={posts}
            path={"post-list-2"}
            openModal={handleOpen}
            deleteItem={handleDelete}
          />
          {isOpen && (
            <Modal closeModal={handleClose} createItem={handleCreate} />
          )}
          {/* <MarkdownPostList list={list} /> */}
        </section>
      </Main>
    </>
  );
}
