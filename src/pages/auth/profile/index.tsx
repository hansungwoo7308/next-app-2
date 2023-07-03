import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { getData, patchData } from "lib/client/utils/fetchData";
import { setLoading, setNotify } from "lib/client/store/notifySlice";
import axios from "axios";
import Link from "next/link";
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
  const { auth, orders }: any = useSelector((store) => store);
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
  const handleUpdateUser = async (data: any) => {
    // get
    const { password, image } = data;
    // upload image to cloud
    let uploaded: any;
    if (image) {
      uploaded = await uploadImageToCloudinary(image);
    }
    // update the user
    try {
      dispatch(setLoading(true));
      const payload = { password, image: uploaded[0].secure_url };
      const response = await patchData("user/update", payload, auth.accessToken);
      // set
      logResponse(response);
      dispatch(
        setNotify({
          status: "success",
          message: "The User Data has been updated.",
          visible: true,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      // set
      logError(error);
      dispatch(
        setNotify({
          status: "error",
          message: "The User Data has not been updated.",
          visible: true,
        })
      );
      dispatch(setLoading(false));
    }
  };
  const uploadImageToCloudinary = async (images: any) => {
    // let media;
    let array = [];
    for (const v of images) {
      const formData: any = new FormData();
      formData.append("file", v);
      formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
      formData.append("cloud_name", process.env.CLOUD_NAME);
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
        method: "POST",
        data: formData,
      });
      const { public_id, secure_url } = response.data;
      //   console.log("data : ", response.data);
      array.push({ public_id, secure_url });
    }
    // console.log("array : ", array);
    return array;
  };
  useEffect(() => {
    if (!auth.accessToken) return;
    const getOrder = async () => {
      const response = await getData("order", auth.accessToken);
      // console.log("data : ", response.data);
      logResponse(response);
    };
    try {
      getOrder();
    } catch (error) {
      logError(error);
    }
  }, []); // get the order
  if (!auth.status) return null;
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          <div className="profile">
            <form onSubmit={handleSubmit(handleUpdateUser)}>
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
                    {...register("image", {
                      required: true,
                      //   onChange: (e) => {
                      //     handleChangeImage(e);
                      //   },
                    })}
                    type="file"
                    // name="file"
                    // id="file_up"
                    accept="image/*"
                    // multiple
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
          <div className="order">
            <h1>Order List</h1>
            <table>
              <thead>
                <tr>
                  <td>id</td>
                  <td>data</td>
                  <td>total</td>
                  <td>delivered</td>
                  <td>action</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr>
                    <td>
                      <Link href={`order/${order._id}`}>{order._id}</Link>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.total}</td>
                    <td>{order.delivered ? "delivered" : "Not delivered"}</td>
                    <td>
                      {order.paid ? "paid" : "Not paid"}
                      {/* {order.paid ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      padding: 1rem;
      flex: 1;
      display: flex;
      > form {
        width: 100%;
        height: 100%;
        border: 2px solid;
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
    .order {
      height: 70vh;
      flex: 2;
      > table {
        width: 100%;
        border: 2px solid;
        td {
          border: 2px solid yellowgreen;
        }
        thead {
          text-transform: uppercase;
        }
      }
    }
  }
`;
