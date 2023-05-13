import styled from "styled-components";
export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 3px solid purple;
  background-color: lightgray;
  :focus {
    /* border: 3px solid red; */
    display: none;
  }
`;
export const Box = styled.div`
  width: 60%;
  height: 60%;
  position: absolute;
  background-color: white;
  outline: 5px solid black;
  padding: 20px;
  /* display: none; */
  > form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div:nth-of-type(1) {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      > input {
        width: 100%;
        height: 30px;
        padding: 10px;
      }
      > textarea {
        width: 100%;
        height: 80%;
        padding: 10px;
      }
    }
    > div:nth-of-type(2) {
      display: flex;
      gap: 10px;
      > button {
        width: 200px;
        height: 40px;
        /* outline: 5px solid red; */
      }
    }
  }
`;
