import Head from "next/head";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
// import Counter from "../components/Counter";
// import Slider from "../components/Slider";
const sentence = `There are many variations of passages of Lorem Ipsum available, but the majority have
suffered alteration in some form, by injected humour, or randomised words which don't
look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
need to be sure there isn't anything embarrassing hidden in the middle of text. All the
Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
making this the first true generator on the Internet. It uses a dictionary of over 200
Latin words, combined with a handful of model sentence structures, to generate Lorem
Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from
repetition, injected humour, or non-characteristic words etc.`;
export function getServerSideProps(context: any) {
  // const serverCookies = context.req.cookies;
  // console.log("serverCookies : ", serverCookies);
  // const requestProps = Object.getOwnPropertyNames(context.req);
  // let authorization =
  //   context.req.headers.authorization || context.req.headers.Authorization;

  // console.log("\x1b[32m\n[/]");
  // console.log("refreshToken : ", context.req.cookies.refreshToken);
  return {
    props: {
      // serverCookies,
    },
  };
}
export default function Page() {
  const sectionRef: any = useRef();
  const anchorRef: any = useRef();
  const indicatorRef: any = useRef();
  const navRef: any = useRef();
  // handle the anchor[click,mouseover,mouseout], indicator (element event)
  const setAnchor = (e: any) => {
    const currentAnchor = e.target;
    anchorRef.current = currentAnchor;
  };
  const setIndicator = (e: any) => {
    const currentAnchor = e.target;
    const currentListItem = currentAnchor.parentNode;
    indicatorRef.current.style.top = currentListItem.offsetTop + "px";
  };
  const revertIndicator = () => {
    const currentAnchor = anchorRef.current;
    const currentListItem = currentAnchor.parentNode;
    indicatorRef.current.style.top = currentListItem.offsetTop + "px";
  };
  const handleClick = (e: any) => {
    setAnchor(e);
    setIndicator(e);
    // 현재 앵커를 통해서 현재 섹션을 설정
    // console.log(anchorRef.current);
    // console.log(sectionRef.current);
    // const currentAnchor = anchorRef.current;
    // const currentListItem = currentAnchor.parentNode;
    // const currentSection = sectionRef.current;
    // 클릭한 앵커의 부모노드의 클래스네임을 통해서 섹션들 중에서 매칭...
    const anchor = anchorRef.current;
    const listItem = anchor.parentNode;
    const sections = sectionRef.current.parentNode.childNodes;
    const sectionsArray = Array.from(sections);
    const foundSection = sectionsArray.find((v: any) => v.className === listItem.className);
    sectionRef.current = foundSection;
  };
  const handleMouseOver = (e: any) => {
    // console.log("current section : ", sectionRef.current);
    setIndicator(e);
  };
  const handleMouseOut = (e: any) => {
    // console.log("current section : ", sectionRef.current);
    revertIndicator();
  };
  // handle the sections[scroll] (window event)
  const setScroll = (currentSection: any) => {
    window.scrollBy(0, currentSection.getBoundingClientRect().y);
  };
  const setIndicatorByKey = (currentSection: any) => {
    const nav = navRef.current;
    const listItems = nav.childNodes;
    const listItemsArray: any = Array.from(listItems);
    const foundItem: any = listItemsArray.find(
      (v: any) => v.className === currentSection.className
    );
    indicatorRef.current.style.top = foundItem.offsetTop + "px";
  };
  const setUrl = (section: any) => {
    history.pushState("", "", `/#${section.className}`);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextSection = sectionRef.current.nextSibling;
      if (nextSection) {
        const nextAnchor = anchorRef.current.parentNode.nextSibling.childNodes[0];
        sectionRef.current = nextSection;
        anchorRef.current = nextAnchor;
        setScroll(sectionRef.current); // 다음 섹션으로 스크롤 이동
        setIndicatorByKey(sectionRef.current); // 네비게이션의 현재 앵커로 이동
        setUrl(sectionRef.current);
        // sectionRef.current.scrollIntoView({});
        // window.scrollTo(0, sectionRef.current.getBoundingClientRect().y);
      }
    }
  };
  const handleKeyUp = (e: any) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const previousSection = sectionRef.current.previousSibling;
      if (previousSection) {
        const previousAnchor = anchorRef.current.parentNode.previousSibling.childNodes[0];
        sectionRef.current = previousSection;
        anchorRef.current = previousAnchor;
        setScroll(sectionRef.current);
        setIndicatorByKey(sectionRef.current);
        setUrl(sectionRef.current);
        // sectionRef.current.scrollIntoView({});
        // window.scrollTo(0, sectionRef.current.getBoundingClientRect().y);
      }
    }
  };
  // add the event
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  // initialize
  const router = useRouter();
  useEffect(() => {
    router.push("/");
    // console.log(router.asPath.split("/#")[1]);
    // router.replace("/");
  }, []);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <section className="home" id="home" ref={sectionRef}>
          <div className="description">
            <h1>Front-End Developer</h1>
            <p>{sentence}</p>
            <a href={"#about"}>About Me</a>
          </div>
          <div className="temp">
            <section className="sider">
              <div className="nav">
                <ul ref={navRef}>
                  <div className="indicator" ref={indicatorRef}></div>
                  <li className="home">
                    <a
                      href={"#home"}
                      ref={anchorRef}
                      onClick={handleClick}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      00
                    </a>
                  </li>
                  <li className="about">
                    <a
                      href={"#about"}
                      onClick={handleClick}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      01
                    </a>
                  </li>
                  <li className="skills">
                    <a
                      href={"#skills"}
                      onClick={handleClick}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      02
                    </a>
                  </li>
                  <li className="works">
                    <a
                      href={"#works"}
                      onClick={handleClick}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      03
                    </a>
                  </li>
                </ul>
              </div>
            </section>
            <h3>
              <Link
                href="/#home"
                onClick={() => {
                  const homeSection = sectionRef.current.parentNode.childNodes[0];
                  const homeAnchor =
                    anchorRef.current.parentNode.parentNode.childNodes[1].childNodes[0];
                  sectionRef.current = homeSection;
                  anchorRef.current = homeAnchor;
                  indicatorRef.current.style.top = 0 + "px";
                  // console.log(homeAnchor);
                  router.replace("/");
                }}
              >
                Top
              </Link>
            </h3>
          </div>
        </section>
        <section className="about" id="about">
          <div>
            <h3>{`Hi, I'm sungwoo, Han.`}</h3>
            <h5>Web Front-End Developer</h5>
            <p>{sentence}</p>
          </div>
        </section>
        <section className="skills" id="skills">
          <div>
            <h3>Stack</h3>
            <ul>
              <li>NextJS</li>
              <li>NodeJS</li>
              <li>ReactJS</li>
              <li>Typescript</li>
              <li>Styled-Components</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascript</li>
              <li>Git</li>
            </ul>
          </div>
        </section>
        <section className="works" id="works">
          <div>
            <h1>Works Page</h1>
            <ul>
              <li>
                <h5>E-Commerce</h5>
                <h1>Project Name 1</h1>
                <p>{sentence.slice(0, 200)}</p>
                <div>
                  <Link href={"#"}>View the code</Link>
                </div>
                <div>
                  <Link href={"#"}>Visit the site</Link>
                </div>
              </li>
              <li>work2</li>
              <li>work3</li>
              <li>work4</li>
              <li>work5</li>
              <li>work6</li>
              <li>work7</li>
              <li>work8</li>
            </ul>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  flex-direction: column;
  > section {
    > div {
    }
  }
  > .home {
    max-width: 100%;
    width: 100%;

    > div {
      width: 50%;
    }
    > .temp {
      width: 80%;
      height: 100vh;
      max-width: 1000px;
      position: fixed;
      border: 2px solid yellowgreen;
      outline: none;
      pointer-events: none;
      > .sider {
        position: absolute;
        left: 100%;
        margin-left: 1rem;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        pointer-events: initial;
        > .nav {
          width: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          /* outline: 2px solid red; */
          outline: none;
          position: relative;
          padding: 0;
          ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 1px;
            background-color: #fff;
            /* outline: 1px solid purple; */
          }
          > ul {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            > .indicator {
              width: 5px;
              height: 2rem;
              position: absolute;
              top: 0;
              left: 0;
              background-color: #fff;
              transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
              /* transition: all 0.5s ease-in-out; */
            }
            > li {
              width: 2rem;
              height: 2rem;
              /* outline: 2px solid green; */
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              ::after {
                /* outline: 2px solid coral; */
                position: absolute;
                left: 2rem;
                top: 0;
                bottom: 0;
                display: none;
                justify-content: center;
                align-items: center;
                font-size: 0.8rem;
              }
              :hover::after {
                display: flex;
              }
              > a {
                // 앵커에 내용이 비어 있고, 앵커가 동작하기를 원한다면,
                // 없는 내용물을 지정하기 위해서, 블락요소로 지정해준다.
                /* display: block; */
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .home::after {
              content: "Home";
            }
            .about::after {
              content: "About";
            }
            .skills::after {
              content: "Skills";
            }
            .works::after {
              content: "Works";
            }
          }
          @media (width<1000px) {
            display: none;
          }
        }
      }
      > h3 {
        position: absolute;
        left: 100%;
        margin-left: 1rem;
        bottom: 10vh;
        outline: 5px solid yellow;
        pointer-events: initial;
        cursor: pointer;
        /* width: 100px;
        height: 100px; */
      }
    }
  }
  > .about {
  }
  > .works {
    > div {
      display: flex;
      flex-direction: column;
      gap: 20px;
      > ul {
        /* display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start; */
        display: grid;
        /* grid-template-columns: repeat(4, minmax(100px, 1fr)); */
        grid-template-columns: repeat(2, minmax(300px, 1fr));
        grid-template-rows: repeat(4, minmax(300px, 1fr));
        gap: 2rem;
        /* outline: 2px solid red; */
        > li {
          outline: 2px solid green;
          /* display: flex;
          flex-direction: column; */
        }
        @media (width < 1000px) {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (width < 500px) {
          grid-template-columns: repeat(1, minmax(25%, auto));
        }
      }
    }
  }
`;
