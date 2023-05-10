import { useSelector } from "react-redux";
import { selectPostById } from "lib/store/postsSlice";
import PostAuthor from "@/components/posts/PostAuthor";
import Time from "@/components/posts/Time";
import Reactions from "@/components/posts/Reactions";
import { useRouter } from "next/router";
import Link from "next/link";
export default function PostItem() {
  const router = useRouter();
  const { id } = router.query;
  const post = useSelector((state) => selectPostById(state, Number(id)));
  if (!post)
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  return (
    <>
      <main className="post-item">
        <section>
          <div>
            {/* <h1>Post Item</h1> */}
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>
              Author : <PostAuthor userId={post.userId} />
              <br />
              Time : <Time timestamp={post.date} />
            </p>
            <Reactions post={post} />
            <Link className="edit" href={`/post-list/edit/${post.id}`}>
              <button>Edit Post</button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
