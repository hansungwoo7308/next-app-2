import Link from "next/link";
import Nav from "../Nav";
import AuthButton from "../AuthButton";
import styled from "styled-components";
import Cart from "../commerce/Cart";
export default function Header() {
  return (
    <HeaderStyle>
      <section>
        <Link href={"/"}>LOGO</Link>
        <Nav />
        <div>
          <Cart />
          <AuthButton />
        </div>
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
  background-color: #000;
  color: #ccc;
  z-index: 100;
  section {
    width: 80%;
    max-width: 1000px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    > a {
      width: initial;
      /* padding: 0 1rem; */
      /* border: 2px solid; */
    }
    > div {
      display: flex;
      gap: 1rem;
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

  a:hover,
  li:hover,
  button:hover {
    color: #fff;
  }
  /* font-size: 1rem; */
  @media (width<1000px) {
    justify-content: space-between;
    > section {
      width: 100%;
    }
  }
`;
