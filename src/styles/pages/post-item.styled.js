import styled from "styled-components";

export const Main = styled.main`
  > section {
    > div {
      width: 50%;
      height: 50%;
      min-width: 500px;
      padding: 20px;
      outline: 2px solid green;
      display: flex;
      flex-direction: column;
      gap: 10px;
      > a > button {
        width: 300px;
        height: 30px;
      }
      > div > button {
        background-color: white;
        color: black;
      }
    }
  }
`;
