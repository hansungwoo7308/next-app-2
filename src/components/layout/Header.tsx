import Link from "next/link";
import Nav from "../Nav";
import AuthButton from "../AuthButton";
export default function Header() {
  return (
    <header>
      <section>
        <Link href={"/"}>LOGO</Link>
        <Nav />
        {/* <AuthButton /> */}
      </section>
    </header>
  );
}
