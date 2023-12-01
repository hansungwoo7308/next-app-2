import Head from "next/head";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import Profile from "@/components/auth/Profile";

export default function Page() {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Main>
        <section>
          <Profile />
        </section>
      </Main>
    </>
  );
}

const Main = styled(PublicMain)`
  > section {
  }
`;
// import { getServerSession } from "next-auth";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";
// export async function getServerSideProps(context) {
//   // const session = await getSession(context);
//   const session = await getServerSession(context.req, context.res, authOptions);
//   console.log("\x1b[32m\n/api/auth/admin [getServerSideProps]");
//   console.log("\x1b[32msession : ", session);
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
