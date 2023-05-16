import styled from "styled-components";

export const Box = styled.div`
  outline: 3px solid green;
  > ul {
    outline: 1px solid green;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  > a > button {
    padding: 20px;
  }
`;
