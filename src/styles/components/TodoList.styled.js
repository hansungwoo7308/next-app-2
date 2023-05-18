import styled from "styled-components";
export const Box = styled.div`
  width: 500px;
  height: 500px;
  /* min-height: 50%; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  outline: 3px solid green;
  padding: 20px;
  > * {
    outline: 2px solid lightgray;
  }
  > form {
    width: 100%;
    /* outline: 2px solid red; */
    > div {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      > * {
        width: 100%;
      }
    }
  }
  > div {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    /* outline: 2px solid blue; */
    > article {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
