import Link from "next/link";
import Head from "next/head";
import getAllUsers from "lib/utils/getAllUsers";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
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
  console.log("users : ", users);
  return (
    <>
      <Head>
        <title>Users2</title>
      </Head>
      <Main>
        <section>
          <div>
            <h1>CDN Users2 List</h1>
            <ul>
              {users.map((user: any) => (
                <li key={user.id}>
                  <h3>{user.name}</h3>
                  <div>
                    <Link href={`/users2/${user.id}`}>
                      <button>Go to {user.username} page</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 70%;
      max-width: 700px;
      > ul {
        /* outline: 2px solid; */
        > li {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
`;
