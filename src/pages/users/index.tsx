import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
import UserList from "@/components/user/list/UserList";
export default function Page() {
  const { auth, users }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  // const list = users.map((user: any) => (
  //   <li key={user.id}>
  //     <Link href={`/users/${user.id}`}>{user.name}</Link>
  //   </li>
  // ));
  const list = users.map((user: any) => (
    <li key={user.id}>
      <Link href={`/users/${user._id}`}>
        {user.username}:(role:{user.role})
      </Link>
      {/* <Link href={`/users/${user.id}`}>{user.name}</Link> */}
    </li>
  ));
  if (auth.role !== "admin") return null;
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
