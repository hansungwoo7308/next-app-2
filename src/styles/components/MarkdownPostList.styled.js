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
  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
  }

  > button {
    padding: 20px;
  }
`;
