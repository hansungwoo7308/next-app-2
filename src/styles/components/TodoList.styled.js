import styled from "styled-components";

export const Box = styled.div`
  /* border: 2px solid red; */
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  outline: 3px solid green;
  padding: 20px;
  > * {
    outline: 2px solid lightgray;
  }
  > div:first-of-type {
    width: 100%;
    /* outline: 2px solid red; */
    > form > div {
      display: flex;
      justify-content: space-between;
    }
  }
  > div:last-of-type {
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
