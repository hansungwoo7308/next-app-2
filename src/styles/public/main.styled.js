import styled from "styled-components";

export const Main = styled.main`
  > section {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    /* justify-content: space-between; */
    justify-content: center;
    gap: 20px;
    > h1 {
      position: absolute;
      top: 70px;
      right: 20px;
    }
    > div {
      width: 70%;
      min-height: 300px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      color: green;
      outline: 2px solid green;
    }
  }
`;
