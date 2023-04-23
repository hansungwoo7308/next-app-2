import { useSelector } from "react-redux";
import PostItem from "@/components/posts/PostItem";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
} from "lib/store/postsSlice";

import { useEffect, useState } from "react";

let renderCount = 0;

const PostList = () => {
  // internal data
  const [content, setContent]: any = useState("");
  // external data
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

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
            {/* <h2>Post List</h2> */}
            {/* <div>{content}</div> */}
            {postStatus === "loading" ? (
              <h1>Loading</h1>
            ) : postStatus === "succeeded" ? (
              orderedPostIds
                .map((postId) => <PostItem key={postId} postId={postId} />)
                .slice(0, 4)
            ) : postStatus === "failed" ? (
              <h1>{error}</h1>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
};

export default PostList;
