import styled from "styled-components";
export const Main = styled.main`
  > section {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    > h1 {
      position: absolute;
      top: 70px;
      right: 20px;
    }
    > div {
      outline: 2px solid green;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
`;
