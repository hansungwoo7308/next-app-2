import styled from "styled-components";
export const Box = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  background-color: white;
  outline: 2px solid green;
  padding: 20px;
  display: none;
  > form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
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
    > button {
      width: 200px;
      height: 40px;
    }
  }
`;
