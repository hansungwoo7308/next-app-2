import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
export default function Nav() {
  const router = useRouter();
  // focus-under-bar
  const focusRef: any = useRef();
  // menu
  const homeRef: any = useRef();
  const listRef: any = useRef();
  const testRef: any = useRef();
  const worksRef: any = useRef();

  const setColor = (target: any) => {
    const list = Array.from(target.parentNode.childNodes);
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
    } else if (router.pathname.startsWith("/posts")) {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname === "/todo-list") {
      setColor(listRef.current);
      setUnderline(focusRef.current, listRef.current);
    } else if (router.pathname.startsWith("/works")) {
      setColor(worksRef.current);
      setUnderline(focusRef.current, worksRef.current);
    } else if (router.pathname.startsWith("/test")) {
      setColor(testRef.current);
      setUnderline(focusRef.current, testRef.current);
    } else {
      // homeRef.current.parentNode.childNodes.forEach((child: any) => {
      //   if (child.className === "focus") return;
      //   return (child.className = "unselectedMenu");
      // });
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
  // useEffect(() => {
  //   handleChange();
  // });

  return (
    <NavStyle>
      <ul>
        <li ref={focusRef} className="focus"></li>
        <li ref={homeRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/"} scroll={false}>
            Home
          </Link>
        </li>
        <Link href={"/commerce/product"} scroll={false}>
          Products
        </Link>
        {/* <li ref={testRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/test"} scroll={false}>
            TEST
          </Link>
        </li>
        <li ref={worksRef} onClick={(e) => handleFocus(e)}>
          <Link href={"/works"} scroll={false}>
            Works
          </Link>
        </li> */}
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
