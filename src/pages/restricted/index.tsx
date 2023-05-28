import { useEffect, useState } from "react";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
var cookie = require("cookie");
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 50%;
      height: 50vh;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      > * {
        word-break: break-all;
      }
      // spin
      > p {
        width: 50px;
        height: 50px;
        border: 5px solid #ccc;
        border-top-color: coral;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
`;
export function getServerSideProps(context: any) {
  console.log("\x1b[32m");
  console.log("[/restricted]");
  // console.log("authorization : ", context.req.headers.authorization);
  // const parsedCookie = cookie.parse(context.req.headers.cookie);
  // console.log("refreshToken : ", parsedCookie.refreshToken);
  return {
    props: {},
  };
}
export default function Page() {
  const [auth, setAuth]: any = useState(false);
  const [username, setUsername]: any = useState();
  const [email, setEmail]: any = useState();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("/api/restricted", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      logResponse(response);
      setAuth(true);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error: any) {
      logError(error);
      setAuth(false);
      await refreshAuth();
      fetchData();
    }
  };
  const setAuthorization = (accessTokenPassed?: any) => {
    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
    const accessToken = accessTokenPassed || accessTokenFromLocalStorage;
    // console.log("accessTokenFromLocalStorage : ", accessTokenFromLocalStorage);
    // console.log("accessToken : ", accessToken);
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // console.log("refreshAuth timeout...(60 seconds)");
    // setTimeout(() => {
    //   refreshAuth();
    // }, 1000 * 60);
  };
  const refreshAuth = async () => {
    try {
      // const token = localStorage.getItem("accessToken");
      const response = await axios.get("/api/authentication/refresh");
      logResponse(response);
      setAuthorization(response.data.accessToken);
      // setAuth(true);
      // setUsername(response.data.username);
      // setEmail(response.data.email);
    } catch (error) {
      console.log("?????");
      logError(error);
    }
  };
  useEffect(() => {
    // const accessToken: any = localStorage.getItem("accessToken");
    // setAccessToken(accessToken);
    fetchData();
  }, []);
  return (
    <Main>
      <section>
        <div>
          <h1>Restricted Page</h1>
          {auth && (
            <div>
              <p>username : {username}</p>
              <p>email : {email}</p>
            </div>
          )}
          {/* <p className="spiner" /> */}
        </div>
      </section>
    </Main>
  );
}
