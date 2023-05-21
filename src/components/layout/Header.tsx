import Link from "next/link";
import Nav from "../Nav";
import AuthButton from "../AuthButton";
import styled from "styled-components";
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
    height: 100%;
    display: flex;
    justify-content: space-between;
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
  }
  button {
    all: unset;
    cursor: pointer;
  }
  a:hover,
  li:hover,
  button:hover {
    color: #fff;
  }
`;
export default function Header() {
  return (
    <HeaderStyle>
      <section>
        <div>
          <Link href={"/"}>LOGO</Link>
        </div>
        <Nav />
        <AuthButton />
      </section>
    </HeaderStyle>
  );
}
