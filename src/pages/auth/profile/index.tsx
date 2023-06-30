import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { patchData } from "lib/client/utils/fetchData";
import { setLoading, setNotify } from "lib/client/store/notifySlice";
import axios from "axios";
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
  const [image, setImage]: any = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordRef = useRef();
  passwordRef.current = watch("password");
  const dispatch = useDispatch();
  const handleChangeImage = (e: any) => {
    // console.log("e.target : ", e.target);
    console.log("e.target.value : ", e.target.value);
    const file = e.target.files[0];
    if (!file) return dispatch(setNotify({ status: "error", message: "No file", visible: true }));
    if (file.size > 1024 * 1024)
      return dispatch(setNotify({ status: "error", message: "Oversize", visible: true }));
    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch(
        setNotify({ status: "error", message: "incorrected image file", visible: true })
      );
    setImage(file);
  };
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
    const files = Array.from(data.file);
    uploadImage(files);
    // try {
    //   dispatch(setLoading(true));
    //   const response = await patchData("user/update", data, auth.accessToken);
    //   logResponse(response);
    //   dispatch(setLoading(false));
    // } catch (error) {
    //   logError(error);
    //   dispatch(setLoading(false));
    // }
  };
  const uploadImage = async (images: any) => {
    // let media;
    let temp = [];
    for (const v of images) {
      const formData: any = new FormData();
      formData.append("file", v);
      formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
      formData.append("cloud_name", process.env.CLOUD_NAME);
      const CLOUD_API_BASE_URL: any = process.env.CLOUD_API_BASE_URL;
      // fetch
      //   const response = await fetch("https://api.cloudinary.com/v1_1/dzktdrw7o/upload", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   const data = await response.json();
      //   console.log("data : ", data);

      // axios
      //   console.log("CLOUD_API_BASE_URL : ", typeof CLOUD_API_BASE_URL);
      //   const test = "https://api.cloudinary.com/v1_1/dzktdrw7o/upload";
      const response = await axios({
        url: process.env.CLOUD_API_BASE_URL,
        // url: "https://api.cloudinary.com/v1_1/dzktdrw7o/upload",
        method: "POST",
        data: formData,
      });
      console.log("response.data : ", response.data);
    }
  };
  useEffect(() => {
    console.log("image : ", image);
  }, [image]);
  if (!auth.status) return null;
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          <div className="profile">
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="image">
                {auth.image && (
                  <Image
                    src={image ? URL.createObjectURL(image) : auth.image}
                    alt={"auth.image"}
                    width={200}
                    height={200}
                  ></Image>
                )}
                <div>
                  <input
                    {...register("file", {
                      required: true,
                      //   onChange: (e) => {
                      //     handleChangeImage(e);
                      //   },
                    })}
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                </div>
              </div>
              <div className="description">
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
              </div>
            </form>
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
      padding: 20px;
      > form {
        height: 100%;
        display: flex;
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
