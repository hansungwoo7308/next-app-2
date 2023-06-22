import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectAuth, setCredentials } from "lib/client/store/authSlice";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
import { getData } from "lib/client/utils/fetchData";
// type Auth = {
//   method?: "general" | "nextauth" | "none";
//   status?: false;
// };
export default function AuthButton(props: any) {
  const auth = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();
  // const [auth, setAuth]: any = useState<Auth>({ method: undefined, status: false });
  // const checkAuth = async (accessToken: any) => {
  //   try {
  //     // const response = await axios({
  //     //   method: "get",
  //     //   url: "/api/authentication/check",
  //     //   headers: {
  //     //     Authorization: `Bearer ${accessToken ? accessToken : ""}`,
  //     //   },
  //     // });
  //     const response = await getData("authentication/check", accessToken);
  //     logResponse(response);
  //     dispatch(setCredentials({ username: response.data.username, accessToken }));
  //   } catch (error) {
  //     logError(error);
  //     refreshAuth();
  //   }
  // };
  // const refreshAuth = async () => {
  //   try {
  //     // const token = localStorage.getItem("accessToken");
  //     const response = await axios({
  //       method: "get",
  //       url: "/api/authentication/refresh",
  //     });
  //     const accessToken = response.data.accessToken;
  //     if (accessToken) {
  //       logResponse(response);
  //       setXmlHttpRequestHeader(accessToken);
  //       localStorage.setItem("accessToken", accessToken);
  //       dispatch(setCredentials({ username: response.data.username, accessToken }));
  //     }
  //   } catch (error) {
  //     logError(error);
  //     dispatch(logOut());
  //   }
  // };
  // const setXmlHttpRequestHeader = (accessToken: any) => {
  //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   // console.log("refreshAuth timeout...(60 seconds)");
  //   // setTimeout(() => {
  //   //   refreshAuth();
  //   // }, 1000 * 60);
  // };
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
  // console.log("auth : ", auth);
  return (
    <Box>
      {auth.status ? (
        <>
          {auth.mode === "general" && <button onClick={logoutAuth}>Sign out1</button>}
          {auth.mode === "nextauth" && (
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
