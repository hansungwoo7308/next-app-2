import PostAuthor from "./PostAuthor";
import Time from "./Time";
import Reactions from "./Reactions";
import Link from "next/link";

import { useSelector } from "react-redux";
import { selectPostById } from "lib/store/postsSlice";

// post props가 변경되지 않으면, 리렌더링하지 않는다. (memo)
const PostItem = ({ postId }: any) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <li>
      <Link href={`post-list/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      {/* <p>{post.body.substring(0, 75)}</p> */}
      <Time timestamp={post.date} />
      {/* <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p> */}
      {/* <Reactions post={post} /> */}
    </li>
  );
};
export default PostItem;
