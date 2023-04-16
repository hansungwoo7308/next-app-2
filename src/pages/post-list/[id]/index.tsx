import { useSelector } from "react-redux";
import { selectPostById } from "lib/store/postsSlice";

import PostAuthor from "@/components/PostAuthor";
import TimeAgo from "@/components/TimeAgo";
import ReactionButtons from "@/components/ReactionButtons";

import { useRouter } from "next/router";
import Link from "next/link";

const PostItem = () => {
  const router = useRouter();
  const { id } = router.query;

  const post = useSelector((state) => selectPostById(state, Number(id)));

  if (!post) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  return (
    <>
      <main className="post-item">
        <section>
          <div className="post-single-page">
            <h1>Post Item</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
              <PostAuthor userId={post.userId} />
              <TimeAgo timestamp={post.date} />
            </p>
            <Link className="edit" href={`/post-list/edit/${post.id}`}>
              <button>Edit Post</button>
            </Link>
            <ReactionButtons post={post} />
          </div>
        </section>
      </main>
    </>
  );
};
export default PostItem;
