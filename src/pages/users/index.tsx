import { useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import UserList from "@/components/user/list/UserList";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import axios from "axios";
export async function getServerSideProps(context: any) {
  console.log("\x1b[32m\n[users]");
  // get the credentials
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false, // statusCode : false(307), true(308)
      },
    };
  }
  const token = await getToken({ req: context.req, raw: true });
  console.log({ "session.user.role": session.user?.role });
  // console.log({ session, token });
  // get the user data
  const response = await axios({
    url: "http://localhost:3000/api/v2/users",
    headers: { Cookie: `next-auth.session-token=${token}` },
  });
  const { users } = response.data;
  return { props: { users } };
}
export default function Page({ users }: any) {
  const auth = useSelector((store: any) => store.auth);
  if (!auth.user) return null;
  if (auth.user.role !== "admin") return null;
  return (
    <Main>
      <section>
        <UserList users={users} />
      </section>
      {/* <section>{auth.user.role === "admin" && <UserList users={users} />}</section> */}
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
  }
`;
