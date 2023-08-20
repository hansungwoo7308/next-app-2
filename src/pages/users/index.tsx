import { useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import UserList from "@/components/user/list/UserList";
import { getData } from "lib/client/utils/fetchData";
export async function getServerSideProps() {
  const response = await getData("v2/user");
  const { users } = response.data;
  return { props: { users } };
}
export default function Page({ users }: any) {
  const auth = useSelector((store: any) => store.auth);
  // const list = users.map((user: any) => (
  //   <li key={user.id}>
  //     <Link href={`/users/${user.id}`}>{user.name}</Link>
  //   </li>
  // ));
  if (!auth.user) return null;
  return (
    <>
      <Main>
        <section>{auth.user.role === "admin" && <UserList users={users} />}</section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
  }
`;
