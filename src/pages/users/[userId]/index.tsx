import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, selectPostsByUser } from "lib/client/store/postsSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { patchData } from "lib/client/utils/fetchData";
import logError from "lib/client/log/logError";
import { setLoading } from "lib/client/store/notifySlice";
import logResponse from "lib/client/log/logResponse";
import { useEffect, useState } from "react";
import { updateUser } from "lib/client/store/usersSlice";
export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  // get the user
  const { userId } = router.query;
  const { auth, users }: any = useSelector((store) => store);
  const user = users.find((user: any) => user._id === userId);
  // set the user's role
  const [role, setRole]: any = useState();
  // user > posts
  const postsForUser = useSelector((state) => selectPostsByUser(state, Number(userId)));
  const postTitles = postsForUser.map((post: any) => (
    <li key={post.id}>
      <Link href={`/post-list/${post.id}`}>
        {post.id}. {post.title}
      </Link>
    </li>
  ));
  // const postsForUser = useSelector((state) => {
  //   // allPosts = []
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post: any) => post.userId === Number(userId));
  // });
  // console.log("postsForUser : ", postsForUser);
  const handleChange = (e: any) => {
    if (role === "admin") setRole("user");
    else setRole("admin");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const role = e.target.role.value;
    try {
      dispatch(setLoading(true));
      const response: any = await patchData(`user/${userId}`, { role }, auth.accessToken);
      const { savedUser } = response.data;
      logResponse(response);
      dispatch(updateUser({ _id: savedUser._id, role }));
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      // console.log(error);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);
  return (
    <>
      <Main>
        <section>
          {user && (
            <div>
              <h1>User Page (Managed by Administrator)</h1>
              <p>Username : {user.username}</p>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="checkbox"
                    name="role"
                    id="role"
                    value={role}
                    onChange={handleChange}
                    checked={role === "admin"}
                  />
                  <label htmlFor="role">{role}</label>
                </div>
                <button type="submit">Update</button>
              </form>
              {/* <h3>{`${user?.name}'s post list`}</h3> */}
              {/* <ol>{postTitles}</ol> */}
            </div>
          )}
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
