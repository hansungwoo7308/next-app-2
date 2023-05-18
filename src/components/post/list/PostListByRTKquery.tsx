import {
  getPostsError,
  getPostsStatus,
  selectPostIds,
} from "lib/client/store/postsSlice";
import { useSelector } from "react-redux";
import PostItem from "@/components/post/item/PostItem";
import Link from "next/link";
import { Box } from "@/styles/components/post/PostListByRTKquery.styled";
export default function PostListByRTKquery() {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  return (
    <Box>
      <h2>CDN Post List (Static)</h2>
      <ul>
        {typeof window && postStatus === "loading" ? (
          <h1>Loading</h1>
        ) : postStatus === "succeeded" ? (
          orderedPostIds.map((postId) => (
            <PostItem key={postId} postId={postId} />
          ))
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
