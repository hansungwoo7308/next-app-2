import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

const Nav = () => {
  // get and set
  const router = useRouter();
  const focusRef = useRef();
  const homeRef = useRef();
  const blogsRef = useRef();
  const postsRef = useRef();
  const [currentPage, setCurrentPage] = useState("home");
  const home = currentPage === "home" ? "selectedMenu" : "unselectedMenu";
  const blogs = currentPage === "blogs" ? "selectedMenu" : "unselectedMenu";
  const posts = currentPage === "posts" ? "selectedMenu" : "unselectedMenu";

  // process
  const handleChange = () => {
    focusRef.current.style.width =
      focusRef.current.nextElementSibling.getBoundingClientRect().width + "px";
    const offsetHome = homeRef.current.offsetLeft + "px";
    const offsetBlogs = blogsRef.current.offsetLeft + "px";
    const offsetPosts = postsRef.current.offsetLeft + "px";

    if (router.pathname === "/") {
      setCurrentPage("home");
      focusRef.current.style.left = offsetHome;
    } else if (router.pathname === "/blogs") {
      setCurrentPage("blogs");
      focusRef.current.style.left = offsetBlogs;
    } else if (router.pathname === "/posts") {
      setCurrentPage("posts");
      focusRef.current.style.left = offsetPosts;
    } else {
      setCurrentPage("");
    }
  };

  const handleFocus = (e) => {
    const newLeft = e.target.offsetLeft;
    const newWidth = e.target.offsetWidth;
    focusRef.current.style.left = newLeft + "px";
    focusRef.current.style.width = newWidth + "px";
    // console.log("newLeft : ", newLeft);
    // console.log("newWidth : ", newWidth);
  };

  useEffect(() => {
    handleChange();
  });

  return (
    <nav>
      <ul>
        <li className="focus" ref={focusRef}></li>
        <li className={home} ref={homeRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/"}>HOME</Link>
        </li>
        <li className={blogs} ref={blogsRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/blogs"}>BLOGS</Link>
        </li>
        <li className={posts} ref={postsRef} onClick={(e) => handleFocus(e)}>
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
