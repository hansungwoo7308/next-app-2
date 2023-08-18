import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styled from "styled-components";
import { setLoading, setNotify } from "lib/client/store/notifySlice";
import { patchData } from "lib/client/utils/fetchData";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
export default function Profile() {
  const auth = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const [image, setImage]: any = useState();
  const passwordRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  passwordRef.current = watch("password");
  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    console.log({ file });
    if (!file) return dispatch(setNotify({ status: "error", message: "No file", visible: true }));
    if (file.size > 1024 * 1024)
      return dispatch(setNotify({ status: "error", message: "Oversize", visible: true }));
    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch(
        setNotify({ status: "error", message: "incorrected image file", visible: true })
      );
    setImage(file);
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
  const handleUpdateUser = async (data: any) => {
    dispatch(setLoading(true));
    // get
    const { password, image } = data;
    // upload image to cloud (and create an image url)
    const uploaded = await uploadImageToCloudinary(image);
    // console.log("uploaded : ", uploaded);
    // update the user
    try {
      const payload = { password, image: uploaded[0].secure_url };
      const response = await patchData("user", payload, auth.accessToken);
      const { image } = response.data.updatedUser;
      // set
      logResponse(response);
      // dispatch(setAuthImage({ image }));
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
  if (!auth.accessToken) return null;
  // console.log({ image });
  return (
    <Box>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="image">
          <Image
            // src={URL.createObjectURL(image) || auth.user.image}
            // src={image ? URL.createObjectURL(image) : auth.user?.image}
            src={auth.user?.image || URL.createObjectURL(image)}
            alt={"auth.image"}
            width={200}
            height={200}
          ></Image>
          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              // name="file"
              // id="file_up"
              // multiple
            />
          </div>
        </div>
        <div className="description">
          <div>
            <h1>Profile</h1>
            <div>
              <label htmlFor="role">Role</label>
              <input type="text" id="role" value={auth.role} disabled />
            </div>
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
              <input type="email" id="email" value={auth.email} disabled />
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
    </Box>
  );
}
const Box = styled.div`
  height: 70vh;
  padding: 1rem;
  flex: 1;
  > form {
    width: 100%;
    height: 100%;
    display: flex;
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
`;
