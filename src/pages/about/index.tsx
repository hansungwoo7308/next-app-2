import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  return (
    <Main>
      <section>
        <div>
          <h1>Side Menu</h1>
          <ul>
            <li>menu1</li>
            <li>menu2</li>
            <li>menu3</li>
          </ul>
        </div>
        <div>
          <h1>About Page</h1>
          <h5>Name : Sung-Woo, Han</h5>
          <h5>Major : Department of Computer Engineering</h5>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour, or randomised words which don't
            look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the middle of text. All the
            Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
            making this the first true generator on the Internet. It uses a dictionary of over 200
            Latin words, combined with a handful of model sentence structures, to generate Lorem
            Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from
            repetition, injected humour, or non-characteristic words etc.
          </p>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      /* width: 70%; */
      height: 70vh;
      max-width: 50rem;
      min-height: 30rem;
    }
    > div:nth-of-type(1) {
      width: 200px;
      background-color: #111;
      color: #ddd;
      position: fixed;
      left: 0;
    }
    > div:nth-of-type(2) {
      padding: 1rem;
    }
  }
`;
