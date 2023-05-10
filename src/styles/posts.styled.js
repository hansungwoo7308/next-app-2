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
    > div:nth-of-type(1) {
      width: 80%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      padding: 20px;
      border: 2px solid green;
      > * {
        /* border: 1px solid red; */
      }
      > ul {
        /* flex: 1; */
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        list-style: none;
        > li {
          border: 2px solid;
        }
      }
      > div {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        > button {
          width: 200px;
          height: 30px;
          border: none;
          background-color: lightgray;
          cursor: pointer;
          :hover {
            background-color: black;
            color: white;
          }
        }
      }
    }
    > div:nth-of-type(2) {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      display: none;
      outline: 2px solid red;
    }
  }
`;
