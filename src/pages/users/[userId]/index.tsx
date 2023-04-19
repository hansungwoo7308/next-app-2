import { useSelector } from "react-redux";
import { selectUserById } from "lib/store/usersSlice";
import { selectAllPosts, selectPostsByUser } from "lib/store/postsSlice";
import { useRouter } from "next/router";
import Link from "next/link";

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  // find the user in the store
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // const postsForUser = useSelector((state) => {
  //   // allPosts = []
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post: any) => post.userId === Number(userId));
  // });

  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post: any) => (
    <li key={post.id}>
      <Link href={`/post-list/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <>
      <main className="user">
        <section>
          <div>
            <h1>User Page</h1>
            <h3>{user?.name}'s post list</h3>
            <ol>{postTitles}</ol>
          </div>
        </section>
      </main>
    </>
  );
};

export default User;
