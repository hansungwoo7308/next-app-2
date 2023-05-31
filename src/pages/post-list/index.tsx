import { Main as PublicMain } from "@/styles/public/main.styled";
import PostListByRTKquery from "@/components/post/list/PostListByRTKquery";
import styled from "styled-components";
let renderCount = 0;
export default function Page() {
  renderCount++;
  return (
    <>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <PostListByRTKquery />
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
`;
