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
            <h2>Post List</h2>
            <div>{content}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PostList;
