import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectAcessToken, setCredentials } from "lib/client/store/authSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
const Box = styled.div`
  display: flex;
  > button,
  div {
    min-width: 70px;
    /* outline: 2px solid red; */
    > a {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;
export default function AuthButton(props: any) {
  // console.log("\x1b[33m\n[AuthButton]");
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(selectAcessToken);
  // next-auth
  const { data, status } = useSession();
  // console.log("status : ", status);
  // console.log("data : ", data);
  const checkAuth = async (accessToken: any) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/authentication/check",
        headers: {
          Authorization: `Bearer ${accessToken ? accessToken : ""}`,
        },
      });
      logResponse(response);
      dispatch(setCredentials({ username: response.data.username, accessToken }));
    } catch (error) {
      logError(error);
      refreshAuth();
    }
  };
  const refreshAuth = async () => {
    try {
      // const token = localStorage.getItem("accessToken");
      const response = await axios({
        method: "get",
        url: "/api/authentication/refresh",
      });
      const accessToken = response.data.accessToken;
      logResponse(response);
      setXmlHttpRequestHeader(accessToken);
      localStorage.setItem("accessToken", accessToken);
      dispatch(setCredentials({ username: response.data.username, accessToken }));
    } catch (error) {
      logError(error);
      dispatch(logOut());
    }
  };
  const setXmlHttpRequestHeader = (accessToken: any) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // console.log("refreshAuth timeout...(60 seconds)");
    // setTimeout(() => {
    //   refreshAuth();
    // }, 1000 * 60);
  };
  const logoutAuth = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        url: "/api/authentication/logout",
      });
      logResponse(response);
      localStorage.removeItem("accessToken");
      dispatch(logOut());
      router.push("/");
    } catch (error) {
      logError(error);
    }
  };
  useEffect(() => {
    // console.log("checking auth...");
    const accessToken = localStorage.getItem("accessToken");
    checkAuth(accessToken);
  }, []);
  // });
  return (
    <Box>
      {/* {status === "authenticated" ? (
        <>
          <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
          <div>
            <Link href={"/auth/admin"}>Admin</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <a href="">Auth({auth ? "true" : "false"})</a>
          </div>
          <div>
            <Link href={"/auth/signin"}>Sign in</Link>
          </div>
          <div>
            <Link href={"/auth/signup"}>Sign up</Link>
          </div>
        </>
      )} */}
      {auth ? (
        <>
          <button onClick={logoutAuth}>Sign out</button>
          <div>
            <Link href={"/auth/admin"}>Admin</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link href={"/auth/signin"}>Sign in</Link>
          </div>
          <div>
            <Link href={"/auth/signup"}>Sign up</Link>
          </div>
        </>
      )}
    </Box>
  );
}
