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

    /* > div:nth-of-type(2) {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      display: none;
      outline: 2px solid red;
    } */
  }
`;
