import styled from "styled-components";

export const Main = styled.main`
  > section {
    > div {
      width: 50%;
      padding: 20px;
      outline: 3px solid green;
      display: flex;
      flex-direction: column;
      gap: 20px;

      > div {
        display: flex;
        justify-content: space-between;
        > a > button {
          padding: 5px;
        }
      }
    }
  }
`;
