import styled from "styled-components";

export const Main = styled.main`
  > section {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    > h1 {
      position: absolute;
      top: 70px;
      right: 20px;
    }
    > div {
      width: 50%;
      height: 50%;
      outline: 3px solid green;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;

      > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 10px;
        word-break: break-all;
        color: green;
      }
      > div:last-of-type {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        > button {
          padding: 20px;
        }
      }
    }
  }
`;
