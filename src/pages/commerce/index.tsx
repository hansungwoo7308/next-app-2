import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  return (
    <Main>
      <section>
        <div>
          <h1>E-Commerce</h1>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)``;
