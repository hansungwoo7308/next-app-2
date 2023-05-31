import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  outline: 3px solid green;
  > ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > li {
      border: 2px solid;
    }
  }
`;
