import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { logOut, selectAuth, setCredentials } from "lib/client/store/authSlice";
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
//   console.log("\x1b[32m\n/api/auth/admin [getServerSideProps]");
//   console.log("\x1b[32msession : ", session);
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
// export function getServerSideProps(context: any) {
//   console.log("\x1b[32m\n[/auth/admin]");
//   return {
//     props: {},
//   };
// }
export default function Page() {
  const { auth }: any = useSelector((store) => store);
  const [mode, setMode]: any = useState("view");
  const initialState = {};
  //   const { accessToken } = auth;
  //   const [users, setUsers]: any = useState();
  //   const getData = async () => {
  //     try {
  //       const response = await axios({
  //         method: "get",
  //         url: `/api/users?mode=${auth?.mode}`,
  //         headers: {
  //           Authorization: `Bearer ${accessToken ? accessToken : ""}`,
  //         },
  //       });
  //       logResponse(response);
  //       setUsers(response.data.users);
  //     } catch (error) {
  //       logError(error);
  //       // console.log(error);
  //       // await refreshAuth();
  //     }
  //   };
  // useEffect(() => {
  //   getData();
  // }, [auth]);
  if (!auth.status) return null;
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          <div className="profile">
            <div className="image">
              {auth.image && <Image src={auth.image} alt={"auth.image"} width={200} height={200} />}
            </div>
            <div className="description">
              {mode === "view" && (
                <>
                  <div>
                    <h1>Profile</h1>
                    <div>
                      <h3>Name : {auth.username}</h3>
                    </div>
                    <div>
                      <h3>Role : {auth.role}</h3>
                    </div>
                  </div>
                  <button onClick={() => setMode("edit")}>Edit</button>
                </>
              )}
              {mode === "edit" && (
                <>
                  <div>
                    <h1>Profile</h1>
                    <div>
                      <span>Name :</span>
                      <input type="text" defaultValue={auth.username} />
                    </div>
                    <div>
                      <span>Image :</span>
                      <input type="text" defaultValue={auth.username} />
                    </div>
                  </div>
                  <button onClick={() => setMode("view")}>Update</button>
                </>
              )}
            </div>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    .profile {
      height: 70vh;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      > div {
        border: 2px solid;
      }
      .description {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        div {
          /* * {
            border: 2px solid;
          } */
          h1 {
            margin-bottom: 20px;
          }
        }
        button {
          width: 5rem;
          align-self: flex-end;
        }
      }
      .image {
        width: 10rem;
        img {
          height: initial;
        }
      }
    }
  }
`;
