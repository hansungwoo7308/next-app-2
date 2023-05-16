import { useSelector } from "react-redux";
import { selectPostById } from "lib/store/postsSlice";
import PostAuthor from "@/components/post/item/PostAuthor";
import Time from "@/components/post/item/Time";
import Reactions from "@/components/post/item/Reactions";
import { useRouter } from "next/router";
import Link from "next/link";
import { Main } from "@/styles/pages/post-item.styled.js";
export default function PostItem() {
  const router = useRouter();
  const { "post-id": id } = router.query;
  const post = useSelector((state) => selectPostById(state, Number(id)));
  console.log("post : ", post);
  if (!post)
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  return (
    <>
      <Main>
        <section>
          <div>
            <h1>Post Item : {id}</h1>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>
              Author : <PostAuthor userId={post.userId} />
              <br />
              Time : <Time timestamp={post.date} />
            </p>
            <Reactions post={post} />
            <Link href={`/post-list/edit/${post.id}`}>
              <button>Edit Post</button>
            </Link>
          </div>
        </section>
      </Main>
    </>
  );
}
