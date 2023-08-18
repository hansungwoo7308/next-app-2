import { useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import UserList from "@/components/user/list/UserList";
export default function Page() {
  const auth = useSelector((store: any) => store.auth);
  // const list = users.map((user: any) => (
  //   <li key={user.id}>
  //     <Link href={`/users/${user.id}`}>{user.name}</Link>
  //   </li>
  // ));
  if (auth.user.role !== "admin") return null;
  return (
    <>
      <Main>
        <section>
          <UserList />
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
  }
`;
