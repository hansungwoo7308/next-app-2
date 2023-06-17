import { selectCart } from "lib/client/store/cartSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function Cart() {
  const cart = useSelector(selectCart);
  // console.log("cart : ", cart);
  return (
    <Box>
      <Link href={"/commerce/cart"}>Cart : {cart.length}</Link>
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
