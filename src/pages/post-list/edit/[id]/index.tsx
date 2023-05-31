import PostItemEditForm from "@/components/post/item/PostItemEditForm";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  return (
    <>
      <Main>
        <section>
          <PostItemEditForm />
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
