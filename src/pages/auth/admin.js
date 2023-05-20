import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  console.log("");
  console.log("\x1b[34mAdmin\x1b[0m");
  console.log("\x1b[34msession : ", session);
  console.log("");
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <main className="admin">
        <section>
          {status === "authenticated" && (
            <div>
              <h1>Admin</h1>
              <p>name : {session.user.name}</p>
              <p>email : {session.user.email}</p>
              <p>role : {session.user.role}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
