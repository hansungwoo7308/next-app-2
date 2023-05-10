import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { increaseCount, getCount } from "lib/store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
const Nav = () => {
  // internal
  const router = useRouter();
  const focusRef: any = useRef();
  const homeRef: any = useRef();
  const blogsRef: any = useRef();
  const postsRef: any = useRef();
  const addPostRefRef: any = useRef();
  const usersRef: any = useRef();
  const postListRef: any = useRef();
  const postList2Ref: any = useRef();
  const loginRef: any = useRef();
  const userListRef: any = useRef();
  const welcomeRef: any = useRef();
  const users2Ref: any = useRef();
  const searchRef: any = useRef();
  const jwtRef: any = useRef();
  const todoListRef: any = useRef();
  // const dispatch = useDispatch();
  // const count = useSelector(getCount);
  // dispatch action으로 increaseCount를 전달하면,
  // 스토어는 count 데이터를 갱신하고,
  // 그 데이터를 selecting(참조)하고 있는 컴포넌트는 다시 렌더링된다.
  const setColor = (target: any) => {
    const array = Array.from(target.parentNode.childNodes);
    array.map((child: any) => {
      if (child.className === "focus") return;
      child.className = "unselectedMenu";
    });
    target.className = "selectedMenu";
  };
  const setUnderline = (targetUnderline: any, targetItem: any) => {
    targetUnderline.style.width =
      targetItem.getBoundingClientRect().width + "px";
    targetUnderline.style.left = targetItem.offsetLeft + "px";
  };
  const handleChange = () => {
    // console.log("router.pathname : ", router.pathname);
    if (router.pathname === "/") {
      setColor(homeRef.current);
      setUnderline(focusRef.current, homeRef.current);
    } else if (router.pathname === "/blogs") {
      setColor(blogsRef.current);
      setUnderline(focusRef.current, blogsRef.current);
    } else if (router.pathname === "/posts") {
      setColor(postsRef.current);
      setUnderline(focusRef.current, postsRef.current);
    } else if (router.pathname === "/post-list/add") {
      setColor(addPostRefRef.current);
      setUnderline(focusRef.current, addPostRefRef.current);
    } else if (
      router.pathname === "/post-list" ||
      router.pathname === "/post-list/[id]" ||
      router.pathname === "/post-list/edit/[id]"
    ) {
      setColor(postListRef.current);
      setUnderline(focusRef.current, postListRef.current);
    } else if (router.pathname === "/post-list-2") {
      setColor(postList2Ref.current);
      setUnderline(focusRef.current, postList2Ref.current);
    } else if (router.pathname === "/users") {
      setColor(usersRef.current);
      setUnderline(focusRef.current, usersRef.current);
    } else if (router.pathname === "/users2") {
      setColor(users2Ref.current);
      setUnderline(focusRef.current, users2Ref.current);
    } else if (router.pathname === "/user-list") {
      setColor(userListRef.current);
      setUnderline(focusRef.current, userListRef.current);
    } else if (router.pathname === "/auth/login") {
      setColor(loginRef.current);
      setUnderline(focusRef.current, loginRef.current);
    } else if (router.pathname === "/welcome") {
      setColor(welcomeRef.current);
      setUnderline(focusRef.current, welcomeRef.current);
    } else if (router.pathname === "/search") {
      setColor(searchRef.current);
      setUnderline(focusRef.current, searchRef.current);
    } else if (router.pathname === "/jwt") {
      setColor(jwtRef.current);
      setUnderline(focusRef.current, jwtRef.current);
    } else if (router.pathname === "/todo-list") {
      setColor(todoListRef.current);
      setUnderline(focusRef.current, todoListRef.current);
    } else {
      homeRef.current.parentNode.childNodes.forEach((child: any) => {
        if (child.className === "focus") return;
        return (child.className = "unselectedMenu");
      });
      focusRef.current.style = null;
      // focusRef.current.style.width = null;
      // focusRef.current.style.left = null;
    }
  };
  const handleFocus = (e: any) => {
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
          <Link href={"/"}>Home</Link>
        </li>
        <li ref={postList2Ref} onClick={(e) => handleFocus(e)}>
          <Link href={"/post-list-2"}>Post List</Link>
        </li>
        {/* <li ref={addPostRefRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/post-list/add"}>Add Post</Link>
        </li> */}
        {/* <li ref={usersRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/users"}>Users</Link>
        </li> */}
        {/* <li ref={loginRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/login"}>Login</Link>
        </li> */}
        {/* <li ref={users2Ref} onClick={(e) => handleFocus(e)}>
          <Link href={"/users2"}>Users2</Link>
        </li> */}
        {/* <li ref={userListRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/user-list"}>User List</Link>
        </li> */}
        {/* <li ref={welcomeRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/welcome"}>Welcome</Link>
        </li> */}
        {/* <a onClick={() => dispatch(increaseCount())}>{count}</a> */}
        {/* <li ref={blogsRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/blogs"}>BLOGS</Link>
        </li> */}
        {/* <li ref={postsRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/posts"}>Posts</Link>
        </li> */}
        {/* <li ref={jwtRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/jwt"}>JWT</Link>
        </li> */}
        {/* <li ref={todoListRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/todo-list"}>Todo List</Link>
        </li> */}
        {/* <li ref={searchRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/search"}>Search</Link>
        </li> */}
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
