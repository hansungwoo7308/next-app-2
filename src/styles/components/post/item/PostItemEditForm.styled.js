import styled from "styled-components";

export const Box = styled.div`
  outline: 3px solid green;
  width: 50%;
  height: 50%;
  padding: 20px;
  > form {
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
    > input,
    select,
    textarea {
      margin-bottom: 10px;
    }
    > textarea {
      height: 100px;
    }
    > button {
      height: 40px;
      margin-top: 10px;
    }
  }
`;
