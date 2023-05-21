import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { Main } from "@/styles/public/main.styled";
// import { useEffect, useRef, useState } from "react";
// import { getServerSession } from "next-auth";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";
// export async function getServerSideProps(context) {
//   // const session = await getSession(context);
//   const session = await getServerSession(context.req, context.res, authOptions);
//   console.log("");
//   console.log("\x1b[32m/api/auth/admin [getServerSideProps]");
//   console.log("\x1b[32msession : ", session);
//   console.log("");
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }
export default function Page() {
  const { data: session, status }: any = useSession();
  console.log("");
  console.log("\x1b[34mAdmin\x1b[0m");
  console.log("\x1b[34msession : ", session);
  console.log("");
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          {status === "authenticated" && (
            <div>
              <h1>Admin</h1>
              <p>{session.user.kkk}</p>
              {/* <p>name : {session.user.name}</p>
              <p>email : {session.user.email}</p>
              <p>role : {session.user.role}</p> */}
            </div>
          )}
        </section>
      </Main>
    </>
  );
}
