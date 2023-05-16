// internal
import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

// external
import getUser from "lib/utils/getUser";
import getUserPosts from "lib/utils/getUserPosts";
import { Main } from "@/styles/user2.styled";
export async function getServerSideProps(context: any) {
  const userId = context.params.userId;
  const user: Promise<User> = await getUser(userId);
  const userPosts: Promise<Post[]> = await getUserPosts(userId);
  console.log("");
  console.log("\x1b[32m[Server]/pages/user2");
  console.log("");
  //   if (!) {
  //   return {
  //     redirect: {
  //       destination: "/auth/signin",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      user,
      userPosts,
    },
  };
}
export default function User2({ user, userPosts }: any) {
  console.log("");
  console.log("\x1b[32m[Client]/pages/user2");
  console.log("");
  //   console.log("user : ", user);
  //   console.log("userPosts : ", userPosts);
  return (
    <>
      <Head>
        <title>User2</title>
      </Head>
      <Main>
        <section>
          {user?.id ? (
            <div>
              <h1>User2 Page</h1>
              {userPosts.map((post: any) => (
                <div>
                  <h1>{post.name}</h1>
                  <p>{post.body}</p>
                </div>
              ))}
              <Link href={"/users2"}>
                <button>Go to Users2</button>
              </Link>
            </div>
          ) : (
            <div>
              <h1>Not found</h1>
              <Link href={"/users2"}>
                <button>Go to Users2</button>
              </Link>
            </div>
          )}
        </section>
      </Main>
    </>
  );
}
