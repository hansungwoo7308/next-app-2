import { useSelector } from "react-redux";
import PostItem from "@/components/PostItem";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
} from "lib/store/postsSlice";

import { useEffect, useState } from "react";

let renderCount = 0;

const PostList = () => {
  const [content, setContent]: any = useState("");
  const orderedPostIds = useSelector(selectPostIds);
  console.log("orderedPostIds : ", orderedPostIds);

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
      setContent(
        orderedPostIds
          .map((postId) => <PostItem key={postId} postId={postId} />)
          .slice(0, 4)
      );
    } else if (postStatus === "failed") {
      setContent(error);
    } else {
      setContent("idle");
    }
  }, [orderedPostIds]);

  renderCount++;

  return (
    <>
      <main className="post-list">
        <section>
          <h1>renderCount : {renderCount}</h1>
          <div>
            <h2>Post List</h2>
            <div>{content}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PostList;
