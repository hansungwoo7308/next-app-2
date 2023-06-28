import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useSelector } from "react-redux";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { patchData } from "lib/client/utils/fetchData";
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
  //   const initialState = {
  //     name: "",
  //     image: "",
  //     password: "",
  //     passwordConfirm: "",
  //   };
  //   const [profile, setProfile]: any = useState(initialState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordRef = useRef();
  passwordRef.current = watch("password");
  //   useEffect(() => {
  //     setProfile({ ...profile, name: auth.username });
  //     console.log("profile : ", profile);
  //   }, [auth.status]);
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
  const handleUpdate = async (data: any) => {
    // console.log("data : ", data);
    try {
      const response = await patchData("user/updatePassword", data, auth.accessToken);
      logResponse(response);
    } catch (error) {
      logError(error);
    }
    // console.log("auth.accessToken : ", auth.accessToken);
  };
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
              {auth.image && (
                <Image src={auth.image} alt={"auth.image"} width={200} height={200}></Image>
              )}
              <div>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  // onChange={changeAvatar}
                />
              </div>
            </div>
            <div className="description">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div>
                  <h1>Profile</h1>
                  <div>
                    <label htmlFor="username">Name</label>
                    <input
                      {...register("username", { required: true })}
                      type="text"
                      defaultValue={auth.username}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" defaultValue={auth.email} disabled={true} />
                  </div>
                  <div>
                    <label htmlFor="password">New Password</label>
                    <input {...register("password", { required: true })} type="password" />
                  </div>
                  <div>
                    <label htmlFor="passwordConfirm">New Password Confirm</label>
                    <input
                      {...register("passwordConfirm", {
                        required: true,
                        validate: (passwordConfirm) => passwordConfirm === passwordRef.current,
                      })}
                      type="password"
                    />
                  </div>
                </div>
                <div>
                  <button type="submit">Update</button>
                </div>
              </form>
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
      .image {
        width: 15rem;
        height: fit-content;
        position: relative;
        overflow: hidden;
        img {
          height: initial;
          border-radius: 50%;
        }
        div {
          position: absolute;
          bottom: -50%;
          left: 0;
          width: 100%;
          height: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          color: coral;
          opacity: 0;
          transition: all 0.5s;
        }
        :hover div {
          bottom: 0;
          opacity: 1;
        }
      }
      .description {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        > form {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          > div > div {
            display: flex;
            flex-direction: column;
          }
          > div:last-of-type {
            align-self: flex-end;
          }
        }
      }
    }
  }
`;
