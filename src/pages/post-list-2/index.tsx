import Head from "next/head";
import PostList from "@/components/post/list/PostList";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { getData } from "lib/client/utils/fetchData";
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
  const dispatch = useDispatch();
  const handleCreatePost = () => {
    dispatch(openModal({ type: "CREATE_POST" }));
  };
  const handleDeletePost = (id: string) => {
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
