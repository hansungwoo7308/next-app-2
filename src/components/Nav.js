import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>home</Link>
        </li>
        <li>
          <Link href={"/about"}>about</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
