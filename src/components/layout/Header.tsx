import Link from "next/link";
import Nav from "../Nav";
import AuthButton from "../AuthButton";
import styled from "styled-components";
import Cart from "../commerce/Cart";
import Notify from "../Notify";
export default function Header() {
  return (
    <HeaderStyle>
      <section>
        <div>
          <Link href={"/"}>LOGO</Link>
        </div>
        <Nav />
        <AuthButton />
        <Cart />
        <Notify />
      </section>
    </HeaderStyle>
  );
}
const HeaderStyle = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: black;
  color: #ccc;
  z-index: 100;
  section {
    width: 80%;
    max-width: 1000px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    > form {
      display: flex;
      gap: 15px;
      align-items: center;
      > input {
        height: 50%;
        padding: 10px;
      }
    }
  }
  ul,
  li,
  a {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    /* background-color: #000; */
    color: #ccc;
  }
  a:hover,
  li:hover,
  button:hover {
    color: #fff;
  }
`;
