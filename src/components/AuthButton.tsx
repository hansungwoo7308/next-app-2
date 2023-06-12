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
import { getData } from "lib/client/utils/fetchData";
type Auth = {
  method?: "general" | "nextauth";
  status?: false;
};
export default function AuthButton(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [auth, setAuth]: any = useState<Auth>({ status: false });
  const generalAuth = useSelector(selectAcessToken);
  const { data: nextAuth, status } = useSession();
  const checkAuth = async (accessToken: any) => {
    try {
      // const response = await axios({
      //   method: "get",
      //   url: "/api/authentication/check",
      //   headers: {
      //     Authorization: `Bearer ${accessToken ? accessToken : ""}`,
      //   },
      // });
      const response = await getData("authentication/check", accessToken);
      logResponse(response);
      dispatch(setCredentials({ username: response.data.username, accessToken }));
      setAuth({ method: "general", status: true });
    } catch (error) {
      logError(error);
      refreshAuth();
      setAuth({ method: "general", status: false });
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
      if (accessToken) {
        logResponse(response);
        setXmlHttpRequestHeader(accessToken);
        localStorage.setItem("accessToken", accessToken);
        dispatch(setCredentials({ username: response.data.username, accessToken }));
        setAuth({ method: "general", status: true });
      }
    } catch (error) {
      logError(error);
      dispatch(logOut());
      setAuth({ method: "general", status: false });
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
      setAuth(false);
      setAuth({ method: "general", status: false });
      router.push("/");
    } catch (error) {
      logError(error);
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (generalAuth) {
      // general login
      // checkAuth(accessToken);
      setAuth({ method: "general", status: true });
    } else if (nextAuth) {
      // next-auth login
      if (status === "authenticated") setAuth({ method: "nextauth", status: true });
      else setAuth({ status: false });
    }
  }, [generalAuth, nextAuth]);
  // console.log(auth.method);
  // console.log(data);
  return (
    <Box>
      {auth.status ? (
        <>
          {auth.method === "general" && <button onClick={logoutAuth}>Sign out1</button>}
          {auth.method === "nextauth" && (
            <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out2</button>
          )}
          <Link href={"/auth/admin"}>Admin</Link>
        </>
      ) : (
        <>
          <Link href={"/auth/signin"}>Sign in</Link>
          <Link href={"/auth/signup"}>Sign up</Link>
        </>
      )}
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  > a,
  > button {
    width: 5rem;
  }
`;
