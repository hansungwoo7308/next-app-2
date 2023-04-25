import styled from "styled-components";

export const Main = styled.main`
  > section {
    > div {
      width: 50%;
      padding: 20px;
      outline: 3px solid green;

      > h3 {
        width: 100%;
        height: 300px;
        /* border: 2px solid red; */
        word-break: break-all;
      }
    }
  }
`;
