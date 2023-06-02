import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  return (
    <Main>
      <section>
        <div>
          <h1>Works Page</h1>
          <ul>
            <li>work1</li>
            <li>work2</li>
            <li>work3</li>
            <li>work4</li>
            <li>work5</li>
            <li>work5</li>
            <li>work5</li>
            <li>work5</li>
          </ul>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      display: flex;
      flex-direction: column;
      gap: 20px;
      > ul {
        /* display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start; */
        display: grid;
        /* grid-template-columns: repeat(4, minmax(100px, 1fr)); */
        grid-template-columns: repeat(2, minmax(300px, 1fr));
        grid-template-rows: repeat(4, minmax(300px, 1fr));
        gap: 2rem;
        outline: 2px solid red;
        > li {
          outline: 2px solid green;
        }
        @media (width < 1000px) {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (width < 500px) {
          grid-template-columns: repeat(1, minmax(25%, auto));
        }
      }
    }
  }
`;
