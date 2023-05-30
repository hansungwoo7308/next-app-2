import { useEffect, useState } from "react";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAcessToken } from "lib/client/store/authSlice";
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
  // console.log("\x1b[32m");
  // console.log("[pages/auth/admin]");
  // console.log("");
  return {
    props: {},
  };
}
export default function Page() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAcessToken);
  const { data: session, status }: any = useSession();
  // console.log("\x1b[34m");
  // console.log("[pages/admin]");
  // // console.log("session : ", session);
  // console.log("");
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("/api/restricted", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = response.data;
      console.log("data : ", data);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
              <h1>Private Page</h1>
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
