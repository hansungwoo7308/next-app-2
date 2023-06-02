import { getPostsError, getPostsStatus, selectPostIds } from "lib/client/store/postsSlice";
import { useSelector } from "react-redux";
import PostItem from "@/components/post/item/PostItem";
import Link from "next/link";
import styled from "styled-components";
export default function PostListByRTKquery() {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  return (
    <Box>
      <h2>post-list (Static : CDN)</h2>
      <ul>
        {typeof window && postStatus === "loading" ? (
          <h1>Loading</h1>
        ) : postStatus === "succeeded" ? (
          orderedPostIds.map((postId) => <PostItem key={postId} postId={postId} />).slice(0, 5)
        ) : // .slice(0, 4)
        postStatus === "failed" ? (
          <h1>{error}</h1>
        ) : null}
      </ul>
      <Link href={"/post-list/add"}>
        <button>Create a new post item</button>
      </Link>
    </Box>
  );
}
const Box = styled.div`
  > ul {
    /* outline: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 15px;
    > li {
      outline: 2px solid;
    }
  }
  > a > button {
    padding: 20px;
  }
`;
