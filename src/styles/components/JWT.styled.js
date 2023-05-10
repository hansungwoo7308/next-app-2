import styled from "styled-components";

export const Box = styled.div`
  width: 100%;
  min-height: 500px;
  outline: 3px solid green;
  padding: 20px;
  display: flex;
  gap: 10px;
  > * {
    border: 2px solid green;
  }
  > div:nth-of-type(1) {
    flex: 1;
  }
  > div:nth-of-type(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div:first-of-type {
      display: flex;
      flex-direction: column;
      gap: 10px;
      word-break: break-all;
    }
    > div:last-of-type {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > button {
        padding: 15px;
      }
    }
  }
`;
