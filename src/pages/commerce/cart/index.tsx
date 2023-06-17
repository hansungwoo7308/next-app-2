import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  // const cart = useSelector(selectCart);

  return (
    <Main>
      <section>
        <div>
          <h1>Cart Page</h1>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)``;
