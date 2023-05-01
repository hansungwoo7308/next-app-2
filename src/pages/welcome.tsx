// internal
import Link from "next/link";
// external
// import { useSession } from "next-auth/react";
import { selectAcessToken } from "lib/store/authSlice";
import { useSelector } from "react-redux";
import { Main } from "../styles/welcome.styled";
import axios from "axios";
import { useEffect, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import getAllUsers from "lib/utility/getAllUsers";
export const getServerSideProps = async (context: any) => {
  console.log("");
  console.log("\x1b[32mpages/welcome");
  const headers = context.req.headers;
  const cookie = context.req.headers.cookie;
  // const authorization =
  //   context.req.headers.Authorization ||
  //   context.req.headers.authorization ||
  //   undefined;
  // console.log("authorization : ", authorization);
  console.log("");
  // console.log("headers : ", headers);
  // console.log("cookie : ", cookie);

  //   if (!) {
  //   return {
  //     redirect: {
  //       destination: "/auth/signin",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

export default function Welcome() {
  const [users, setUsers]: any = useState([]);

  const getData = async () => {
    const usersData: Promise<User[]> = await getAllUsers();
    console.log("usersData : ", usersData);
    setUsers(usersData);
  };

  useEffect(() => {
    getData();
  }, []);
  // const users = await usersData;

  return (
    <>
      <Main>
        <section>
          <div>
            <h1>Welcome Page</h1>
            {users.map((user: any) => (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <button>
                  <Link href={`/users/${user.id}`}>
                    Go to {user.username} page
                  </Link>
                </button>
              </div>
            ))}
            <button>
              <Link href={"/"}>Go to Homepage</Link>
            </button>
          </div>
          {/* <h1>Protected Welcome Page</h1> */}
          {/* <RequireAuth>
            <h1>Protected Welcome Page</h1>
          </RequireAuth> */}
        </section>
      </Main>
    </>
  );
}
