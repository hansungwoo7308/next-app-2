import Search from "@/components/Search";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
const Main = styled(PublicMain)`
  > section {
    flex-direction: column;
    justify-content: space-between;
  }
`;
export default function Page() {
  return (
    <>
      <Main>
        <section>
          <div>
            <h1>Search Page</h1>
            <Search />
          </div>
        </section>
      </Main>
    </>
  );
}
