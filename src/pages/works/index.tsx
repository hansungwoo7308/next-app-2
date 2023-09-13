import styled from "styled-components";
import Tester from "@/components/Tester";
import { useEffect } from "react";
export default function Page() {
  return (
    <Main>
      <section>
        <Tester />
        {/* <div>
        </div> */}
        {/* <div>
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
        </div> */}
      </section>
      <section></section>
    </Main>
  );
}
const Main = styled.main`
  height: 100vh;
  > section {
    height: 100%;
    padding: 0;
    border: 2px dashed;
    position: relative;
  }
`;
