import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function Cart() {
  const { cart }: any = useSelector((store) => store);
  return (
    <Box>
      <Link href={"/commerce/cart"}>Cart : {cart.length}</Link>
    </Box>
  );
}
const Box = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid blue; */
`;
