import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { logOut, setCredentials } from "lib/client/store/authSlice";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { useRouter } from "next/router";
import Image from "next/image";
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
export function getServerSideProps(context: any) {
  console.log("\x1b[32m\n[/auth/admin]");
  return {
    props: {},
  };
}
export default function Page() {
  const { auth }: any = useSelector((store) => store);
  const { accessToken } = auth;
  const [users, setUsers]: any = useState();
  const router = useRouter();
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
  // useEffect(() => {
  //   getData();
  // }, [auth]);
  if (!auth.status) {
    <>
      <Main>
        <section>
          <div>
            <h1>Empty...</h1>
          </div>
        </section>
      </Main>
    </>;
  }
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          {/* <div>
            <h1>Users Data</h1>
            <p>
              {users?.map((user: any, index: any) => (
                <h3 key={index}>{user}</h3>
              ))}
            </p>
          </div> */}
          <div>
            <h1>Profile</h1>
            <h3>Username : {auth.username}</h3>
            <h3>Role : {auth.role}</h3>
          </div>
          <div>
            {auth.image && <Image src={auth.image} alt={"auth.image"} width={200} height={200} />}
          </div>
        </section>
      </Main>
    </>
  );
}
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
