import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import Link from "next/link";

import { useSelector } from "react-redux";
import { selectPostById } from "lib/store/postsSlice";

// post props가 변경되지 않으면, 리렌더링하지 않는다. (memo)
const PostItem = ({ postId }: any) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <div>
      <Link href={`post-list/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.body.substring(0, 75)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </div>
  );
};
export default PostItem;
