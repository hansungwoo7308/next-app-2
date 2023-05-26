import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import axios from "axios";
const Main = styled(PublicMain)`
  > section {
    display: flex;
    flex-direction: column;
    > form {
      width: 50%;
      min-width: 500px;
      height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;
      border: 3px solid green;
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
    }
  }
`;
export default function Page() {
  const router = useRouter();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleSigninWithNextauth = async (e: any) => {
    e.preventDefault();
    await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: "/auth/admin",
      // redirect: false,
    });
  };
  const handleSigninGenerally = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/authentication/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      const data = response.data;
      console.log("response : ", response);
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/restricted");
    } catch (error) {
      console.log("error : ", error);
    }
  };
  return (
    <>
      <Head>
        <title>signin</title>
      </Head>
      <Main>
        <section>
          <form>
            <h1>Signin</h1>
            <input
              name="email"
              type="text"
              placeholder="email"
              ref={emailRef}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              ref={passwordRef}
            />
            <button onClick={handleSigninWithNextauth}>
              Sign in with next-auth
            </button>
            <button onClick={handleSigninGenerally}>Sign in genernally</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/auth/signup");
              }}
            >
              Create new account
            </button>
          </form>
        </section>
      </Main>
    </>
  );
}
