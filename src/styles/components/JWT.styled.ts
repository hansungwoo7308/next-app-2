import styled from "styled-components";

type Props = {
  width?: string;
  height?: string;
  color?: string;
};

export const Box = styled.div<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  /* background-color: ${(props) => props.color}; */
  min-height: 500px;
  outline: 3px solid green;
  padding: 20px;
  display: flex;
  gap: 10px;
  > * {
    border: 2px solid;
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
