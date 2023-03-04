import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

// server side
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

// client side
import { getSession, useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // const session = await getServerSession(context.req, context.res, authOptions);

  // console.log("");
  // console.log("\x1b[31mAdmin\x1b[0m");
  // // console.log("test : ", test);
  // // // console.log("test2 : ", test2);
  // console.log("");

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Admin = ({ session }) => {
  console.log("");
  console.log("\x1b[34mAdmin\x1b[0m");
  console.log("session : ", session);
  console.log("");

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <main className="admin">
        <section>
          <div>
            <h1>Admin</h1>
            <p>name : {session.user.name}</p>
            <p>email : {session.user.email}</p>
            <p>role : {session.user.role}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Admin;
