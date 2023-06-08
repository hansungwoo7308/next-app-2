import styled from "styled-components";

export default function Cart() {
  return (
    <Box>
      <a href="/commerce/cart">Cart</a>
    </Box>
  );
}
const Box = styled.div`
  width: 4rem;
  border: 2px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 100%;
    height: 100%;
  }
`;
