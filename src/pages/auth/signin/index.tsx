import { setCredentials } from "lib/client/store/authSlice"; // lib
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { useForm } from "react-hook-form"; // modules
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { Main as PublicMain } from "@/styles/public/main.styled"; // style
import styled from "styled-components";
import { setLoading } from "lib/client/store/loadingSlice";
import { postData } from "lib/client/utils/fetchData";

export async function getServerSideProps({ req, res }: any) {
  console.log(`\x1b[33m\n[${req.url}]:::[${req.method}]\x1b[30m`);
  const session = await getSession({ req });
  // console.log({ session });
  const providers = await getProviders();

  return { props: { session, providers } };
}

export default function Page(props: any) {
  console.log({ props });

  // exteranl
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
  const session = useSession();

  // internal
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();

  const handleSigninWithGeneral = async (data: any) => {
    try {
      dispatch(setLoading(true));
      const response = await postData("v2/auth/signin", data);
      const { username, role, image, accessToken } = response.data;
      const credentials = { user: { username, image, role }, accessToken };
      logResponse(response);
      dispatch(setCredentials(credentials));
      dispatch(setLoading(false));
      toast.success("Login Success");
      router.push("/auth/profile");
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error(error.status);
    }
  };
  const handleSigninWithCredentials = async (data: any) => {
    try {
      setLoading(true);
      const { email, password } = data;
      const { callbackUrl }: any = router.query;
      // console.log({ email, password, callbackUrl });
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: callbackUrl || "/",
      });
      console.log({ response });
      setLoading(false);
      toast.success("Signed In");
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
      toast.error(error.message);
    }
  };
  const handleSigninWithNaver = async (e: any) => {
    e.preventDefault();
    const result = await signIn("naver", { redirect: true, callbackUrl: "/auth/profile" });
    console.log({ result });
  };

  useEffect(() => setFocus("email"), []);

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
            <button onClick={handleSubmit(handleSigninWithGeneral)}>Sign in without Library</button>
            <button onClick={handleSubmit(handleSigninWithCredentials)}>
              Sign in with Credentials
            </button>
            <button onClick={handleSigninWithNaver}>Sign in with Naver</button>
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
