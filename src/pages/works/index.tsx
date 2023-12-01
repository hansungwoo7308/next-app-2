import styled from "styled-components";
import Tester from "@/components/Tester";

export default function Page() {
  return (
    <Main>
      <section>
        <Tester />
      </section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </Main>
  );
}

const Main = styled.main`
  > section {
    height: 100%;
    padding: 0;
    border: 2px dashed;
    position: relative;
  }
`;
