import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

const Nav = () => {
  /* get */

  // get the router
  const router = useRouter();

  // 라우터 패스를 가져와 CSS 자동변경를 위한...
  // 클래스 네임으로 분기...
  // const [currentPage, setCurrentPage] = useState("home");
  // const home = currentPage === "home" ? "selectedMenu" : "unselectedMenu";
  // const blogs = currentPage === "blogs" ? "selectedMenu" : "unselectedMenu";
  // const posts = currentPage === "posts" ? "selectedMenu" : "unselectedMenu";

  // 메뉴 밑줄을 위한...
  const focusRef = useRef();
  const homeRef = useRef();
  const blogsRef = useRef();
  const postsRef = useRef();

  /* process */

  // handle the effect
  const handleChange = () => {
    focusRef.current.style.width =
      focusRef.current.nextElementSibling.getBoundingClientRect().width + "px";

    if (router.pathname === "/") {
      // setCurrentPage("home");
      homeRef.current.className = "selectedMenu";
      blogsRef.current.className = "unselectedMenu";
      postsRef.current.className = "unselectedMenu";

      focusRef.current.style.left = homeRef.current.offsetLeft + "px";
    } else if (router.pathname === "/blogs") {
      // setCurrentPage("blogs");
      homeRef.current.className = "unselectedMenu";
      blogsRef.current.className = "selectedMenu";
      postsRef.current.className = "unselectedMenu";

      focusRef.current.style.left = blogsRef.current.offsetLeft + "px";
    } else if (router.pathname === "/posts") {
      // setCurrentPage("posts");
      homeRef.current.className = "unselectedMenu";
      blogsRef.current.className = "unselectedMenu";
      postsRef.current.className = "selectedMenu";

      focusRef.current.style.left = postsRef.current.offsetLeft + "px";
    } else {
      // setCurrentPage("");
      // focusRef.current.style = null;
      homeRef.current.className = "unselectedMenu";
      blogsRef.current.className = "unselectedMenu";
      postsRef.current.className = "unselectedMenu";
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
        <li className="focus" ref={focusRef}></li>
        <li
          // className={home}
          ref={homeRef}
          onClick={(e) => handleFocus(e)}
        >
          <Link href={"/"}>HOME</Link>
        </li>
        <li
          // className={blogs}
          ref={blogsRef}
          onClick={(e) => handleFocus(e)}
        >
          <Link href={"/blogs"}>BLOGS</Link>
        </li>
        <li
          // className={posts}
          ref={postsRef}
          onClick={(e) => handleFocus(e)}
        >
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
