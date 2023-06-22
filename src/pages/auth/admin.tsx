import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectAuth, setCredentials } from "lib/client/store/authSlice";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
// import { getServerSession } from "next-auth";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";
// export async function getServerSideProps(context) {
//   // const session = await getSession(context);
//   const session = await getServerSession(context.req, context.res, authOptions);
//   console.log("");
//   console.log("\x1b[32m/api/auth/admin [getServerSideProps]");
//   console.log("\x1b[32msession : ", session);
//   console.log("");
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 80%;
      height: 70vh;
      padding: 20px;
      > h1 {
        margin-bottom: 20px;
      }
    }
  }
`;
export function getServerSideProps(context: any) {
  console.log("\x1b[32m\n[/auth/admin]");
  return {
    props: {},
  };
}
export default function Page() {
  const auth = useSelector(selectAuth);
  const { accessToken } = auth;
  const [users, setUsers]: any = useState();
  // console.log("\x1b[34m");
  // console.log("[pages/admin]");
  // // console.log("session : ", session);
  // console.log("");
  const getData = async () => {
    try {
      // const accessToken = localStorage.getItem("accessToken");
      const response = await axios({
        method: "get",
        url: `/api/users?mode=${auth?.mode}`,
        headers: {
          Authorization: `Bearer ${accessToken ? accessToken : ""}`,
        },
      });
      logResponse(response);
      setUsers(response.data.users);
    } catch (error) {
      logError(error);
      // console.log(error);
      // await refreshAuth();
    }
  };
  // const refreshAuth = async () => {
  //   try {
  //     // const token = localStorage.getItem("accessToken");
  //     const response = await axios({
  //       method: "get",
  //       url: "/api/authentication/refresh",
  //     });
  //     const accessToken = response.data.accessToken;
  //     logResponse(response);
  //     setXmlHttpRequestHeader(accessToken);
  //     localStorage.setItem("accessToken", accessToken);
  //     dispatch(setCredentials({ username: response.data.username, accessToken }));
  //     getData();
  //   } catch (error) {
  //     logError(error);
  //     dispatch(logOut());
  //   }
  // };
  // const setXmlHttpRequestHeader = (accessToken: any) => {
  //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   // console.log("refreshAuth timeout...(60 seconds)");
  //   // setTimeout(() => {
  //   //   refreshAuth();
  //   // }, 1000 * 60);
  // };
  useEffect(() => {
    getData();
  }, [auth]);
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          {/* {status === "authenticated" && (
            <div>
              <h1>Admin</h1>
              <p>name : {session.user.name}</p>
              <p>email : {session.user.email}</p>
              <p>role : {session.user.role}</p>
            </div>
          )} */}
          {/* <div>
            <h1>Admin (Protected Page)</h1>
            <p>{test}</p>
          </div> */}
          {auth ? (
            <div>
              <h1>Users Data</h1>
              <p>
                {users?.map((user: any, index: any) => (
                  <h3 key={index}>{user}</h3>
                ))}
              </p>
            </div>
          ) : (
            <div>
              <h1>Restricted</h1>
            </div>
          )}
        </section>
      </Main>
    </>
  );
}
