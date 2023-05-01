import styled from "styled-components";

export const Main = styled.main`
  > section {
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
      > button {
        width: 100%;
        padding: 15px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        > button {
          padding: 5px;
        }
      }
    }
  }
`;
