import styled from "styled-components";

export const Main = styled.main`
  > section {
    padding-left: 20px;
    padding-right: 20px;

    > div {
      /* width: 50%; */
      padding: 20px;
      outline: 3px solid green;
      display: flex;
      flex-direction: column;
      gap: 20px;

      > h3 {
        word-break: break-all;
      }
      > a > button {
        width: 100%;
        padding: 15px;
      }
    }
  }
`;
