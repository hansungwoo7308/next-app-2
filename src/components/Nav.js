import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>HOME</Link>
        </li>
        {/* <li>
          <Link href={"/about"}>ABOUT</Link>
        </li> */}
        {/* <li>
          <Link href={"/posts"}>POSTS</Link>
        </li> */}
        <li>
          <Link href={"/blogs"}>BLOGS</Link>
        </li>
        <li>
          <Link href={"/blogs/create"}>create</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
