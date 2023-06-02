import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import PostList from "@/components/post/list/PostList";
import getMarkdown from "lib/server/getMarkdown";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { GetStaticPropsContext } from "next";
import styled from "styled-components";
// import getFormattedDate from "@/lib/getFormattedDate"
// import { getSortedPostsData, getPostData } from "@/lib/posts"
// // import { PostMetaData } from "types/postMetaData";
// import { PostMetaData } from "../../../types/PostMetaData";
export function getStaticProps(context: GetStaticPropsContext) {
  console.log("\x1b[32m");
  console.log("[Server:getStaticProps]/pages/post-list-2");
  const list = getMarkdown("data/posts");
  console.log("");
  return { props: { list } };
}
let renderCount = 0;
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
          {isOpen && <Modal closeModal={handleClose} createItem={handleCreate} />}
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div:first-of-type {
      width: 70%;
      height: 70vh;
      max-width: 1000px;
    }
    // set the size of Modal Component
    > div:last-of-type {
      width: 100%;
      height: 100%;
    }
  }
`;
