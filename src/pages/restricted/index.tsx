import { useEffect, useState } from "react";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
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
    }
  }
`;
export function getServerSideProps(context: any) {
  console.log("\x1b[32m");
  console.log("[pages/restricted]");
  // console.log("authorization : ", context.req.headers.authorization);
  console.log("");
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
    fetchData();
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
        </div>
      </section>
    </Main>
  );
}
