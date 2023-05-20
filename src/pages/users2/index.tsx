import Link from "next/link";
import Head from "next/head";
import getAllUsers from "lib/utils/getAllUsers";
import { Main } from "@/styles/public/main.styled";
export async function getServerSideProps(context: any) {
  const users: Promise<User[]> = await getAllUsers();
  //   if (!) {
  //   return {
  //     redirect: {
  //       destination: "/auth/signin",
  //       permanent: false,
  //     },
  //   };
  // }
  return { props: { users } };
}
export default function Page({ users }: any) {
  return (
    <>
      <Head>
        <title>Users2</title>
      </Head>
      <Main>
        <section>
          <div>
            <h1>CDN Users2 List</h1>
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
