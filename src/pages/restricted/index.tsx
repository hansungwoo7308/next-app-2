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
  const [email, setEmail]: any = useState();
  const [errorMessage, setErrorMessage]: any = useState();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("/api/restricted", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      // console.log(response);
      logResponse(response);
      setAuth(true);
      setEmail(response.data.email);
    } catch (error: any) {
      // console.log(error);
      logError(error);
      setAuth(false);
      setErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    // const accessToken: any = localStorage.getItem("accessToken");
    // setAccessToken(accessToken);
    // fetchData();
  }, []);
  return (
    <Main>
      <section>
        <div>
          <h1>Restricted Page</h1>
          {auth ? (
            <div>
              <p>email : {email}</p>
            </div>
          ) : (
            <div>
              <p>{errorMessage}</p>
            </div>
          )}
          {/* <p className="spiner" /> */}
        </div>
      </section>
    </Main>
  );
}
