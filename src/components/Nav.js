import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Nav = () => {
  // get and set
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("home");
  const home = currentPage === "home" ? "selectedMenu" : "unselectedMenu";
  const blogs = currentPage === "blogs" ? "selectedMenu" : "unselectedMenu";

  // set the something
  // const [focus, setFocus] = useState()
  const focusRef = useRef();
  const listRef = useRef();

  // process
  const handleChange = () => {
    if (router.pathname === "/") {
      setCurrentPage("home");
      // focusRef.current.style = "border-bottom: 3px solid coral";
    } else if (router.pathname === "/blogs") {
      setCurrentPage("blogs");
    } else if (router.pathname === "/auth/signin") {
      setCurrentPage("signin");
    } else {
      setCurrentPage("");
    }
  };

  const handleFocus = (e) => {
    const newLeft = e.target.offsetLeft;
    const newWidth = e.target.offsetWidth;
    console.log("newLeft : ", newLeft);
    console.log("newWidth : ", newWidth);
    // focusRef.current.style = 'outline: 3px solid coral'
    focusRef.current.style.left = newLeft + "px";
    focusRef.current.style.width = newWidth + "px";
  };

  useEffect(() => {
    handleChange();
  });

  // set the initial reference settings
  useEffect(() => {
    focusRef.current = listRef.current.firstChild;
    focusRef.current.style.width =
      focusRef.current.nextElementSibling.getBoundingClientRect().width;
    listRef.current = listRef.current.childNodes;
  }, []);

  return (
    <nav>
      <ul ref={listRef}>
        <li className="focus"></li>
        <li
          className={home}
          onClick={(e) => {
            handleFocus(e);
          }}

          // ref={currentPage === "home" ? focusRef : null}
        >
          <Link href={"/"}>HOME</Link>
        </li>
        <li className={blogs} onClick={(e) => handleFocus(e)}>
          <Link href={"/blogs"}>BLOGS</Link>
        </li>
        {/* <li>
          <Link href={"/about"}>ABOUT</Link>
        </li> */}
        {/* <li>
          <Link href={"/posts"}>POSTS</Link>
        </li> */}

        {/* <li>
          <Link href={"/blogs/create"}>create</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
