import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import axios from "axios";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { setCredentials } from "lib/client/store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { postData } from "lib/client/utils/fetchData";
import { setLoading, setNotify } from "lib/client/store/notifySlice";
export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [loading, setLoading]: any = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();
  const handleSigninWithNextauth = async (data: any) => {
    console.log("data: ", data);
    // await signIn("credentials", {
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    //   callbackUrl: "/auth/admin",
    //   // redirect: false,
    // });
    try {
      // setLoading(true);
      const response = await signIn("credentials", { ...data, callbackUrl: "/auth/admin" });
      // logResponse(response);
      console.log(response);
      dispatch(setCredentials({ mode: "nextauth", username: "nextauth", accessToken: "nextauth" }));
      // setLoading(false);
    } catch (error) {
      // logError(error);
      // setLoading(false);
    }
  };
  const handleSigninGenerally = async (data: any) => {
    try {
      dispatch(setLoading(true));
      const response = await postData("authentication/login", data);
      const { username, role, image, accessToken } = response.data;
      logResponse(response);
      dispatch(
        setCredentials({ mode: "general", status: true, username, role, image, accessToken })
      );
      dispatch(setLoading(false));
      dispatch(setNotify({ message: "Login Success", visible: true }));
      router.push("/auth/profile");
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  const setHeader = (accessToken: any) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };
  useEffect(() => {
    setFocus("email");
  }, []);
  return (
    <>
      <Head>
        <title>signin</title>
      </Head>
      <Main>
        <section>
          <form>
            <h1>Signin</h1>
            <input {...register("email", { required: true })} type="text" placeholder="email" />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="password"
            />
            <button onClick={handleSubmit(handleSigninGenerally)}>Sign in genernally</button>
            <button onClick={handleSubmit(handleSigninWithNextauth)}>Sign in with next-auth</button>
            {/* <button onClick={handleSigninWithNextauth}>Sign in with next-auth</button> */}
            {/* <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/auth/signup");
              }}
            >
              Sign Up
            </button> */}
          </form>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    display: flex;
    flex-direction: column;
    > form {
      width: 70%;
      max-width: 500px;
      height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;
      border: 2px solid green;
      border-radius: 1rem;
      padding: 20px;
      > input {
        width: 50%;
        padding: 8px;
        outline: none;
        border: 3px solid royalblue;
        /* border: 3px solid steelblue; */
        /* border: 3px solid dodgerblue; */
        border-radius: 5px;
        :hover,
        :focus {
          border: 3px solid var(--color-focus);
        }
      }
      > button:nth-of-type(1) {
        background-color: lightcoral;
      }
      > button:nth-of-type(2) {
        background-color: lightblue;
      }
      > button {
        /* all: unset; */
        width: 50%;
        background-color: darkgray;
        color: white;
        /* outline: none; */
        border: none;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
        :hover {
          background-color: #000;
        }
      }
      @media (width<1000px) {
        width: 70%;
        max-width: 500px;
      }
      @media (width<500px) {
        width: 90%;
      }
    }
  }
`;
