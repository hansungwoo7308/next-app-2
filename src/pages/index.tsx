import Head from "next/head";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
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
  // const [cookies, setCookies]: any = useState();
  // const [checkedUser, setCheckedUser]: any = useState();
  // const [users, setUsers]: any = useState();
  const navRef: any = useRef();
  const indicatorRef: any = useRef();
  const currentRef: any = useRef();
  const setIndicator = (e: any) => {
    indicatorRef.current.style.top =
      e.target.getBoundingClientRect().top - navRef.current.getBoundingClientRect().top + "px";
  };
  const handleClick = (e: any) => {
    currentRef.current = e.target;
    setIndicator(e);
  };
  const handleMouseOver = (e: any) => {
    console.log("Mouse Over");
    setIndicator(e);
  };
  const handleMouseOut = (e: any) => {
    console.log("Mouse Out");
    indicatorRef.current.style.top =
      currentRef.current.getBoundingClientRect().top -
      navRef.current.getBoundingClientRect().top +
      "px";
  };
  // useEffect(() => {
  //   console.log("test : ", test);
  // }, [test]);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <section className="sider">
          <div className="nav" ref={navRef}>
            <ul>
              <div className="marker" ref={indicatorRef}></div>
              <li
                className="home"
                ref={currentRef}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <a href={"#home"}>00</a>
              </li>
              <li
                className="about"
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <a href={"#about"}>01</a>
              </li>
              <li
                className="skills"
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <a href={"#skills"}>02</a>
              </li>
              <li
                className="works"
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <a href={"#works"}>03</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="home" id="home">
          <div className="description">
            <h1>Front-End Developer</h1>
            <p>{sentence}</p>
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
  > .sider {
    width: 10vw;
    position: fixed;
    top: 50px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    z-index: 10;
    padding-bottom: 50px;
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
        > .marker {
          width: 5px;
          height: 2rem;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          transition: all 0.5s ease-in-out;
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
