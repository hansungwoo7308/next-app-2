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
import { useState } from "react";
export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId } = router.query;
  const { auth, users }: any = useSelector((store) => store);
  const user = users.find((user: any) => user._id === userId);
  const [role, setRole] = useState("user");
  const handleTest = async () => {
    try {
      dispatch(setLoading(true));
      const response = await patchData(`user/${userId}`, { role: "" }, auth.accessToken);
      logResponse(response);
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  // console.log("users : ", users);
  // console.log("user : ", user);
  // console.log("userId : ", userId);
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
  const handleRole = (e: any) => {
    if (role === "admin") setRole("user");
    else setRole("admin");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("payload : ", e.target.role.value);
    const role = e.target.role.value;
    try {
      dispatch(setLoading(true));
      const response = await patchData(`user/${userId}`, { role }, auth.accessToken);
      logResponse(response);
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <Main>
        <section>
          {user && (
            <div>
              <h1>User Page</h1>
              <p>Username : {user.username}</p>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="checkbox"
                    name="role"
                    id="role"
                    value={role}
                    onClick={handleRole}
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
