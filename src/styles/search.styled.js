import styled from "styled-components";

export const Main = styled.main`
  > section {
    padding-top: 50px;
    > div {
      width: 50%;
      height: 100%;
      padding: 20px;
      outline: 2px solid green;
      > ul {
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: column; */
        gap: 20px;
      }
    }
  }
`;
