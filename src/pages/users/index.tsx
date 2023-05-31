import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAllUsers } from "lib/client/store/usersSlice";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
let renderCount = 0;
export default function Page() {
  const users = useSelector(selectAllUsers);
  const list = users.map((user: any) => (
    <li key={user.id}>
      <Link href={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));
  // console.log("users : ", users);
  renderCount++;
  return (
    <>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <div>
            <h1>CDN User List</h1>
            <ul>{list}</ul>
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
      height: 70%;
      max-width: 700px;
    }
  }
`;
