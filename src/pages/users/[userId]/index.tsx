import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, selectPostsByUser } from "lib/client/store/postsSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { patchData } from "lib/client/utils/fetchData";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { useEffect, useState } from "react";
import { updateUser } from "lib/client/store/usersSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
export async function getServerSideProps(context: any) {
  // get the query
  const { query } = context;
  console.log(`\x1b[32m\n[users/${query.userId}]`);

  // get the credentials
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false, // statusCode : false(307), true(308)
      },
    };
  }
  const token = await getToken({ req: context.req, raw: true });
  // console.log({ "session.user.role": session.user?.role });
  // console.log({ session, token });

  // get the user data
  const response = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v2/users`,
    // server에서 server로의 요청은 credentials를 필요로 하지 않는다?
    // server computer에서 api server로 요청을 보낼 때,
    // client로부터 받은 token을 추가하여 인증정보를 담아 요청한다.
    // withCredentials: true,
    headers: { Cookie: `next-auth.session-token=${token}` },
    // query data
    params: { userId: query.userId },
  });
  const { user } = response.data;

  // out
  return { props: { user } };
}
export default function Page({ user }: any) {
  // console.log({ user });
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const updateUser = async (data: any) => {
    console.log({ data });
  };

  // get the user
  // const { userId } = router.query;
  // const { auth, users }: any = useSelector((store) => store);
  // const user = users.find((user: any) => user._id === userId);
  // console.log({ userId, auth, users, user });
  // set the user's role
  const [role, setRole]: any = useState();
  // user > posts
  // const postsForUser = useSelector((state) => selectPostsByUser(state, Number(userId)));
  // const postTitles = postsForUser.map((post: any) => (
  //   <li key={post.id}>
  //     <Link href={`/post-list/${post.id}`}>
  //       {post.id}. {post.title}
  //     </Link>
  //   </li>
  // ));
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
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const role = e.target.role.value;
  //   try {
  //     dispatch(setLoading(true));
  //     const response: any = await patchData(`user/${userId}`, { role }, auth.accessToken);
  //     const { savedUser } = response.data;
  //     logResponse(response);
  //     dispatch(updateUser({ _id: savedUser._id, role }));
  //     dispatch(setLoading(false));
  //   } catch (error) {
  //     logError(error);
  //     // console.log(error);
  //     dispatch(setLoading(false));
  //   }
  // };
  // useEffect(() => {
  //   if (user) setRole(user.role);
  // }, [user]);
  return (
    <>
      <Main>
        <section>
          <form className="user">
            <Image src={user.image} alt={user.image} width={200} height={200} />
            <input {...register("username")} type="text" defaultValue={user.username} />
            <input {...register("email")} type="email" defaultValue={user.email} />
            <input {...register("role")} type="text" defaultValue={user.role} />
            <button onClick={handleSubmit(updateUser)}>update</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(e.target);
              }}
            >
              delete
            </button>
          </form>
          {/* {user && (
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
            </div>
          )} */}
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
    .user {
      border: 2px solid green;
      > input {
        display: block;
      }
      > img {
        width: 100px;
      }
    }
  }
`;
