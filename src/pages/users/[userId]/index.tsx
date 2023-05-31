import { useSelector } from "react-redux";
import { selectUserById } from "lib/client/store/usersSlice";
import { selectAllPosts, selectPostsByUser } from "lib/client/store/postsSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  const router = useRouter();
  const { userId } = router.query;
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  // const postsForUser = useSelector((state) => {
  //   // allPosts = []
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post: any) => post.userId === Number(userId));
  // });
  const postsForUser = useSelector((state) => selectPostsByUser(state, Number(userId)));
  const postTitles = postsForUser.map((post: any) => (
    <li key={post.id}>
      <Link href={`/post-list/${post.id}`}>
        {post.id}. {post.title}
      </Link>
    </li>
  ));
  // console.log("postsForUser : ", postsForUser);
  return (
    <>
      <Main>
        <section>
          <div>
            <h1>User Page</h1>
            <h3>{`${user?.name}'s post list`}</h3>
            <ol>{postTitles}</ol>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 70%;
      height: 70%;
      max-width: 700px;
    }
  }
`;
