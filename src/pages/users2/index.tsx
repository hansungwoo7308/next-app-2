// internal
import Link from "next/link";
import Head from "next/head";
// external
import getAllUsers from "lib/utils/getAllUsers";
import { Main } from "@/styles/users2.styled";
export async function getServerSideProps(context: any) {
  const users: Promise<User[]> = await getAllUsers();
  console.log("");
  console.log("\x1b[32mpages/users2 [Server]");
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
      users,
    },
  };
}
export default function Users2({ users }: any) {
  console.log("");
  console.log("\x1b[32mpages/users2 [Client]");
  console.log("");
  return (
    <>
      <Head>
        <title>Users2</title>
      </Head>
      <Main>
        <section>
          <div>
            <h1>Users2 Page</h1>
            {users.map((user: any) => (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <Link href={`/users2/${user.id}`}>
                  <button>Go to {user.username} page</button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Main>
    </>
  );
}
