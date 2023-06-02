import styled from "styled-components";

export const Box = styled.div`
  > ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > li {
      border: 2px solid;
    }
  }
`;
