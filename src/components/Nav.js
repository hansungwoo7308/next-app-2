import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

const Nav = () => {
  // get the router
  const router = useRouter();
  const focusRef = useRef();
  const homeRef = useRef();
  const blogsRef = useRef();
  const postsRef = useRef();
  // const [currentPage, setCurrentPage] = useState("home");
  // const home = currentPage === "home" ? "selectedMenu" : "unselectedMenu";
  // const blogs = currentPage === "blogs" ? "selectedMenu" : "unselectedMenu";
  // const posts = currentPage === "posts" ? "selectedMenu" : "unselectedMenu";

  // handle the effect
  const handleChange = () => {
    // console.log(
    //   "homeRef.current.parentNode.childNodes.className : ",
    //   homeRef.current.parentNode.childNodes.className
    // );
    if (router.pathname === "/") {
      // setCurrentPage("home");

      homeRef.current.parentNode.childNodes.forEach((child) => {
        if (child.className === "focus") return;
        return (child.className = "unselectedMenu");
      });
      homeRef.current.className = "selectedMenu";

      focusRef.current.style.width =
        homeRef.current.getBoundingClientRect().width + "px";
      focusRef.current.style.left = homeRef.current.offsetLeft + "px";
    } else if (router.pathname === "/blogs") {
      // setCurrentPage("blogs");

      blogsRef.current.parentNode.childNodes.forEach((child) => {
        if (child.className === "focus") return;
        return (child.className = "unselectedMenu");
      });
      blogsRef.current.className = "selectedMenu";

      focusRef.current.style.width =
        blogsRef.current.getBoundingClientRect().width + "px";
      focusRef.current.style.left = blogsRef.current.offsetLeft + "px";
    } else if (router.pathname === "/posts") {
      // setCurrentPage("posts");

      postsRef.current.parentNode.childNodes.forEach((child) => {
        if (child.className === "focus") return;
        return (child.className = "unselectedMenu");
      });
      postsRef.current.className = "selectedMenu";

      focusRef.current.style.width =
        postsRef.current.getBoundingClientRect().width + "px";
      focusRef.current.style.left = postsRef.current.offsetLeft + "px";
    } else {
      // setCurrentPage("");
      homeRef.current.parentNode.childNodes.forEach((child) => {
        if (child.className === "focus") return;
        return (child.className = "unselectedMenu");
      });

      focusRef.current.style = null;
      // focusRef.current.style.width = null;
      // focusRef.current.style.left = null;
    }
  };

  // handle the focus underline
  const handleFocus = (e) => {
    focusRef.current.style.left = e.target.offsetLeft + "px";
    focusRef.current.style.width = e.target.offsetWidth + "px";
    // const newLeft = e.target.offsetLeft;
    // const newWidth = e.target.offsetWidth;
    // console.log("newLeft : ", newLeft);
    // console.log("newWidth : ", newWidth);
  };

  useEffect(() => {
    handleChange();
  });

  return (
    <nav>
      <ul>
        <li ref={focusRef} className="focus"></li>
        <li ref={homeRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/"}>HOME</Link>
        </li>
        {/* <li ref={blogsRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/blogs"}>BLOGS</Link>
        </li> */}
        <li ref={postsRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/posts"}>POSTS</Link>
        </li>
        {/* <li>
          <Link href={"/about"}>ABOUT</Link>
        </li> */}
        {/* <li>
          <Link href={"/blogs/create"}>create</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
