import Link from "next/link";
import Nav from "../Nav";
import AuthButton from "../AuthButton";

const Header = () => {
  return (
    <section className="header">
      <div className="layout">
        <Link href={"/"}>LOGO</Link>
        <Nav />
        <AuthButton />
      </div>
    </section>
  );
};

export default Header;
