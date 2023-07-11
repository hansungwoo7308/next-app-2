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
  console.log("\x1b[32m\n[Server:getStaticProps]/pages/post-list-2");
  const list = getMarkdown("data/posts");
  return { props: { list } };
}
export default function Page({ list }: any) {
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
  const deleteItem = async (title: any) => {
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
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const createItem = async ({ title, content }: any) => {
    try {
      await axios.post("/api/posts", { title, content });
    } catch (error) {
      console.log("createItem error : ", error);
    }
    getPosts();
  };
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <PostList
            list={posts}
            // path={"post-list-2"}
            openModal={openModal}
            deleteItem={deleteItem}
          />
          {modal && <Modal action={createItem} close={closeModal} />}
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
  }
`;
