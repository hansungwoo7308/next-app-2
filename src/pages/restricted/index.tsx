import { useEffect, useState } from "react";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import logError from "lib/client/log/logError";
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 50%;
      height: 50vh;
      padding: 20px;
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
  const [accessToken, setAccessToken] = useState();
  const [email, setEmail]: any = useState();
  const [auth, setAuth]: any = useState(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("/api/restricted", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      console.log("response : ", response);
      const data = response.data;
      setAuth(true);
      setEmail(data.email);
    } catch (error: any) {
      logError(error);
      setAuth(false);
      setEmail(error.response.data);
    }
  };
  useEffect(() => {
    const accessToken: any = localStorage.getItem("accessToken");
    setAccessToken(accessToken);
    fetchData();
  }, []);
  return (
    <Main>
      <section>
        <div>
          <h1>Restricted Page</h1>
          {auth && (
            <div>
              <p>{accessToken}</p>
              <p>email : {email}</p>
            </div>
          )}
        </div>
      </section>
    </Main>
  );
}
