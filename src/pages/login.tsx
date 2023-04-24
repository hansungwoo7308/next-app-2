// internal
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// style
import { Main } from "../styles/login.styled";

// external
import { useDispatch } from "react-redux";
import { setCredentials } from "lib/store/authSlice";
import { useLoginMutation } from "lib/utility/authApiSlice";
// import { useLoginMutation } from "lib/utility/authApiSlice";
// nextauth
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  // internal
  const userRef: any = useRef();
  // const errRef: any = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   userRef.current?.focus();
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [username, password]);

  // external
  const [login, { isLoading }] = useLoginMutation();
  // console.log("useLoginMutation() : ", useLoginMutation());

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // backend
      // unwrap : payload를 추출한다.
      const userData = await login({ username, password }).unwrap();
      console.log("userData : ", userData);

      // frontend
      dispatch(setCredentials({ ...userData, username }));
      setUsername("");
      setPassword("");
      // router.push("/welcome");
    } catch (err: any) {
      console.log("error : ", err);
      // if (!err?.originalStatus) {
      //   // isLoading: true until timeout occurs
      //   setErrMsg("No Server Response");
      // } else if (err.originalStatus === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.originalStatus === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }
    }
  };

  // nextauth
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   console.log("session : ", session);
  //   console.log("status : ", status);
  // }, [status]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Main>
        <section>
          <div>
            {/* {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h1>Employee Login</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                    placeholder="username"
                  />
                  <input
                    type="password"
                    id="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="password"
                  />
                  <button>Sign In</button>
                </form>
              </>
            )} */}
            {
              // session ? (
              //   <h1>You are logged in.</h1>
              // ) :
              <>
                {/* <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p> */}
                <h1>Employee Login</h1>
                <form
                  onSubmit={
                    handleSubmit
                    // (e) => {
                    // e.preventDefault();
                    // handleSubmit();
                    // // signIn("google", {
                    //   // callbackUrl: "/welcome",
                    // });
                    // }
                  }
                >
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                    placeholder="username"
                  />
                  <input
                    type="password"
                    id="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="password"
                  />
                  <button>Sign In</button>
                </form>
              </>
            }
          </div>
        </section>
      </Main>
    </>
  );
};

export default Login;
