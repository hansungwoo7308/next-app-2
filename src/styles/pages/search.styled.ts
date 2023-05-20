import styled from "styled-components";
import { Main as PublicMain } from "../public/main.styled";
export const Main = styled(PublicMain)`
  // Override
  > section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
      /* width: 500px;
      height: 500px; */
    }
  }
`;
