import { useSelector } from "react-redux";
// import {
//   selectAllPosts,
//   getPostsStatus,
//   getPostsError,
// } from "lib/store/postsSlice";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
} from "lib/store/postsSlice";

import PostItem from "./PostItem";
import { useEffect, useState } from "react";

let renderCount = 0;

const PostsList = () => {
  const [content, setContent] = useState("");

  const orderedPostIds = useSelector(selectPostIds);
  console.log("orderedPostIds : ", orderedPostIds);

  // const postList = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  // const orderedList = postList
  //   .slice() // make the new array // copied new array
  //   .sort((a: any, b: any) => b.date.localeCompare(a.date))
  //   .map((post: any) => <PostItem key={post.id} post={post} />)
  //   .slice(0, 4);

  useEffect(() => {
    if (postStatus === "loading") {
      setContent("loading");
    } else if (postStatus === "succeeded") {
      // setContent(orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />));
    } else if (postStatus === "failed") {
      setContent(error);
    } else {
      setContent("idle");
    }
  }, [orderedPostIds]);

  renderCount++;

  return (
    <div className="posts-list">
      <h1>renderCount : {renderCount}</h1>
      <h2>Post List</h2>
      <div>{content}</div>
    </div>
  );
};
export default PostsList;
