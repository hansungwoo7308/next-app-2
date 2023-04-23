import styled from "styled-components";

export const Main = styled.main`
  > section {
    > div {
      outline: 3px solid green;
      width: 80%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      > form {
        min-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        > input {
          min-width: 200px;
          padding: 10px;
        }
        > button {
          min-width: 200px;
          padding: 20px;
        }
      }
    }
  }
`;
