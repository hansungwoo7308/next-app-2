import styled from "styled-components";

export const Box = styled.div`
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
  > button {
    padding: 20px;
  }
`;
