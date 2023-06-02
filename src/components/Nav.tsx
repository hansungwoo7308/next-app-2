import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { increaseCount, getCount } from "lib/client/store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Nav() {
  const router = useRouter();
  const focusRef: any = useRef();
  const homeRef: any = useRef();
  const listRef: any = useRef();
  // list
  const blogsRef: any = useRef();
  const usersRef: any = useRef();
  const users2Ref: any = useRef();
  const userListRef: any = useRef();
  const postsRef: any = useRef();
  const postListRef: any = useRef();
  const postList2Ref: any = useRef();
  const todoListRef: any = useRef();
  // auth
  const loginRef: any = useRef();
  const jwtRef: any = useRef();
  // search
  const searchRef: any = useRef();
  // Private Page (Protected, Restricted)
  const restrictedRef: any = useRef();
  const aboutRef: any = useRef();
  const worksRef: any = useRef();
  const setColor = (target: any) => {
    const list = Array.from(target.parentNode.childNodes);
    // console.log("list : ", list);
    list.map((child: any) => {
      if (child.className === "focus") return;
      child.className = "unsetColor";
    });
    target.className = "setColor";
  };
  const setUnderline = (targetUnderline: any, targetItem: any) => {
    targetUnderline.style.width = targetItem.getBoundingClientRect().width + "px";
    targetUnderline.style.left = targetItem.offsetLeft + "px";
  };
  const handleChange = () => {
    // console.log("router.pathname : ", router.pathname);
    if (router.pathname === "/") {
      setColor(homeRef.current);
      setUnderline(focusRef.current, homeRef.current);
    } else if (router.pathname.startsWith("/list")) {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname.startsWith("/blogs")) {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname.startsWith("/posts")) {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname.startsWith("/post-list")) {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/post-list-2") {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/users") {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/users2") {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/user-list") {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/authentication/login") {
      setColor(loginRef.current);
      setUnderline(focusRef.current, loginRef.current);
    } else if (router.pathname === "/search") {
      setColor(searchRef.current);
      setUnderline(focusRef.current, searchRef.current);
    } else if (router.pathname === "/jwt") {
      setColor(jwtRef.current);
      setUnderline(focusRef.current, jwtRef.current);
    } else if (router.pathname === "/todo-list") {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/restricted") {
      setColor(restrictedRef.current);
      setUnderline(focusRef.current, restrictedRef.current);
    } else if (router.pathname.startsWith("/works")) {
      setColor(worksRef.current);
      setUnderline(focusRef.current, worksRef.current);
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
    <NavStyle>
      <ul>
        <li ref={focusRef} className="focus"></li>
        <li ref={homeRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/"}>Home</Link>
        </li>
        <li ref={listRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/list"}>List</Link>
          <ul>
            {/* Markdown List */}
            <li ref={postsRef} onClick={(e) => handleFocus(e)}>
              <Link href={"/posts"}>posts (Markdown)</Link>
            </li>
            <li ref={blogsRef} onClick={(e) => handleFocus(e)}>
              <Link href={"/blogs"}>blogs (Markdown)</Link>
            </li>
            {/* CDN List */}
            <li ref={postListRef} onClick={(e) => handleFocus(e)}>
              <Link href={"/post-list"}>post-list (CDN)</Link>
            </li>
            <li ref={usersRef} onClick={(e) => handleFocus(e)}>
              <Link href={"/users"}>users (CDN)</Link>
            </li>
            <li ref={users2Ref} onClick={(e) => handleFocus(e)}>
              <Link href={"/users2"}>users2 (CDN)</Link>
            </li>
            {/* Database List */}
            <li ref={postList2Ref} onClick={(e) => handleFocus(e)}>
              <Link href={"/post-list-2"}>post-list-2 (DB)</Link>
            </li>
            <li ref={todoListRef} onClick={(e) => handleFocus(e)}>
              <Link href={"/todo-list"}>todo-list (DB)</Link>
            </li>
            {/* Undefined List */}
            <li ref={userListRef} onClick={(e) => handleFocus(e)}>
              <Link href={"/user-list"}>user-list (Undefined)</Link>
            </li>
          </ul>
        </li>
        <li ref={aboutRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/about"}>About</Link>
        </li>
        <li ref={worksRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/works"}>Works</Link>
        </li>
        {/* <li ref={restrictedRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/restricted"}>Restricted</Link>
        </li> */}
        {/* <li ref={searchRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/search"}>Search</Link>
        </li> */}
        {/* <li ref={jwtRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/jwt"}>JWT</Link>
        </li> */}
        {/* <a onClick={() => dispatch(increaseCount())}>{count}</a> */}
      </ul>
    </NavStyle>
  );
}
const NavStyle = styled.nav`
  /* Condition */
  .setColor {
    color: coral;
  }
  .unsetColor {
    color: #ccc;
  }
  /* Public */
  li {
    color: #ccc;
    :hover {
      /* outline: 2px solid red; */
      color: #fff;
    }
  }
  /* Private */
  > ul {
    /* Main List */
    position: relative;
    display: flex;
    gap: 10px;
    /* gap: 20px; */
    > .focus {
      height: 3px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: coral;
      outline: none;
      transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    > li {
      min-width: 70px;
      position: relative;
      /* outline: 2px solid coral; */
      :hover > ul {
        display: flex;
      }
      > a {
        display: flex;
        justify-content: center;
      }
      > ul {
        /* Sub List */
        height: initial;
        position: absolute;
        top: 100%;
        background-color: #000;
        color: #ccc;
        /* border: 3px solid green; */
        /* display: flex; */
        display: none;
        flex-direction: column;
        gap: 10px;
        > li {
          width: 100%;
          min-width: 70px;
          white-space: nowrap;
          > a {
            padding: 10px;
          }
        }
      }
    }
  }
`;
