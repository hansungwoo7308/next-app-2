import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import PostList from "@/components/post/list/PostList";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { getData } from "lib/client/utils/fetchData";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { openModal } from "lib/client/store/modalSlice";
// import getFormattedDate from "@/lib/getFormattedDate"
// import { getSortedPostsData, getPostData } from "@/lib/posts"
// // import { PostMetaData } from "types/postMetaData";
// import { PostMetaData } from "../../../types/PostMetaData";
export async function getServerSideProps() {
  const response = await getData("posts");
  const { posts } = response.data;
  return { props: { posts } };
}
export default function Page({ posts }: any) {
  // const [posts, setPosts]: any = useState([]);
  // const getPosts = async () => {
  //   try {
  //     const response = await getData("posts");
  //     const { posts } = response.data;
  //     setPosts(posts);
  //   } catch (error) {
  //     console.log("getPosts error : ", error);
  //   }
  // };
  // const deleteItem = async (title: any) => {
  //   // console.log("title : ", title);
  //   try {
  //     const result = await axios.delete("/api/posts", { data: { title } });
  //     console.log("delete result : ", result);
  //   } catch (error) {
  //     console.log("delete error : ", error);
  //   }
  //   getPosts();
  // };
  // useEffect(() => {
  //   getPosts();
  //   // console.log("posts : ", posts);
  // }, []);
  const dispatch = useDispatch();
  const handleCreatePost = () => {
    dispatch(openModal({ type: "CREATE_POST" }));
  };
  const handleDeletePost = (id: any) => {
    dispatch(openModal({ type: "DELETE_POST", message: "Do you want to delete?", id }));
  };
  if (!posts) return null;
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Main>
        <section>
          <PostList
            posts={posts}
            handleCreatePost={handleCreatePost}
            handleDeletePost={handleDeletePost}
          />
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
