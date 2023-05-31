import styled from "styled-components";

export const Main = styled.main`
  > section {
    gap: 20px;
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    > div {
      outline: 3px solid green;
      width: 50%;
      height: 70%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      button {
        padding: 10px;
      }
    }
  }
`;
