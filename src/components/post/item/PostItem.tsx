import Link from "next/link";
import { useSelector } from "react-redux";
import { selectPostById } from "lib/client/store/postsSlice";
import Time from "./Time";
import PostAuthor from "./PostAuthor";
import Reactions from "./Reactions";
import { useEffect } from "react";
// post props가 변경되지 않으면, 리렌더링하지 않는다. (memo)
export default function PostItem({ postId }: any) {
  const post = useSelector((state) => selectPostById(state, postId));
  const { posts, users }: any = useSelector((store) => store);
  const author = users.find((user: any) => user.id === post.userId);
  useEffect(() => {
    if (users.length > 0) console.log("users : ", users);
  }, [users]);
  useEffect(() => {
    if (author) console.log("author : ", author);
  }, [author]);
  return (
    <li>
      <Link href={`post-list/${post.id}`}>
        <h3>{post.title}</h3>
        <Time timestamp={post.date} />
        {/* <span>{author}</span> */}
        {/* <p>{post.body.substring(0, 75)}</p> */}
        {/* <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p> */}
        {/* <Reactions post={post} /> */}
      </Link>
    </li>
  );
}
