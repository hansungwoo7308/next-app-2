// internal
import Link from "next/link";

// external
// import { useSession } from "next-auth/react";
import { selectAcessToken } from "lib/store/authSlice";
import { useSelector } from "react-redux";
import { Main } from "../styles/welcome.styled";
import axios from "axios";
import { useEffect, useState } from "react";

export const getServerSideProps = (context: any) => {
  // const cookie = context.req.headers.cookie;
  const cookie = context.req.cookies;
  // console.log("cookie in welcome backend : ", cookie);

  return {
    props: {
      // cookie,
      cookie: "test",
    },
  };
};

const Welcome = () => {
  // console.log("cookie : ", cookie);

  // const { status } = useSession();
  const accessToken = useSelector(selectAcessToken);

  const test = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/isLoggedIn", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // .get("http://localhost:3000/api/isLoggedIn", {
      //   withCredentials: true,
      // });
      console.log("result : ", result);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <Main>
        <section>
          {
            // status === "authenticated"
            accessToken ? (
              <div>
                <h1>Welcome</h1>
                <h3>
                  <span>accessToken : </span>
                  <span>{accessToken}</span>
                </h3>
              </div>
            ) : (
              <div>
                <h1>You are not logged in.</h1>
                <Link href={"/login"}>
                  <button>Go to Login</button>
                </Link>
              </div>
            )
          }
        </section>
      </Main>
    </>
  );
};

export default Welcome;
