import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../lib/store/counterSlice";

const Home = () => {
  const slidesRef: any = useRef();
  const dotsRef: any = useRef();
  const currentSlideRef: any = useRef();
  const currentDotRef: any = useRef();
  let itemWidth: any;

  const prev = () => {
    if (!currentSlideRef.current.previousSibling) return;
    slidesRef.current.style.transform = `translateX(-${currentSlideRef.current.previousSibling.style.left})`;
    currentSlideRef.current = currentSlideRef.current.previousSibling;

    // Array.from(dotsRef.current.children).map((child: any) => {
    //   child.style.background = "";
    // });
    // currentDotRef.current = currentDotRef.current.previousSibling;
    // currentDotRef.current.style.background = "coral";

    // get the current and prev
    // const slides = slidesRef.current;
    // const currentSlide = currentSlideRef.current;
    // const prevSlide = currentSlide.previousSibling;
    // const currentDot = currentDotRef.current;
    // const prevDot = currentDot.previousSibling;

    // set the current and position
    // currentSlideRef.current = prevSlide;
    // currentDotRef.current = prevDot;

    // moveToSlide(slides, currentSlide, prevSlide);
    // set the styles
    // Array.from(dotsRef.current.children).map((child: any) => {
    //   child.style.background = "";
    // });
    // currentDotRef.current.style.background = "coral";
  };

  const next = () => {
    if (!currentSlideRef.current.nextSibling) return;
    slidesRef.current.style.transform = `translateX(-${currentSlideRef.current.nextSibling.style.left})`;
    currentSlideRef.current = currentSlideRef.current.nextSibling;

    // Array.from(dotsRef.current.children).map((child: any) => {
    //   child.style.background = "";
    // });
    // currentDotRef.current = currentDotRef.current.nextSibling;
    // currentDotRef.current.style.background = "coral";

    // 슬라이드 위치변경
    // 점의 위치변경

    // const slidesArray: any = Array.from(slidesRef.current.children);
    // const dotsArray: any = Array.from(dotsRef.current.children);
    // const index = slidesArray.findIndex((slide:any)=>slide===currentSlideRef.current.nextSibling)

    // get the current and next
    // const slides = slidesRef.current;
    // let currentSlide = currentSlideRef.current;
    // const nextSlide = currentSlide.nextSibling;

    // const currentDot = currentDotRef.current;
    // const nextDot = currentDot.nextSibling;

    // set the current and next
    // currentSlideRef.current = nextSlide;
    // currentDotRef.current = nextDot;

    // moveToSlide(
    //   slidesRef.current,
    //   currentSlideRef.current,
    //   currentSlideRef.current.nextSibling
    // );
    // moveToSlide(slides, currentSlide, nextSlide);

    // set the styles
    // Array.from(dotsRef.current.children).map((child: any) => {
    //   child.style.background = "";
    // });
    // currentDotRef.current.style.background = "coral";
  };

  const init = () => {
    // get the DOM
    const slidesArray: any = Array.from(slidesRef.current.children);
    // const dotsArray: any = Array.from(dotsRef.current.children);
    itemWidth = slidesRef.current.getBoundingClientRect().width;

    // set the initial position
    slidesArray.map((item: any, index: any) => {
      item.style.left = itemWidth * index + "px";
    });

    // Array.from(dotsRef.current.children).map((child: any) => {
    //   child.style.background = "";
    // });
    // currentDotRef.current.style.background = "coral";

    // dotsRef.current.addEventListener("click", (e: any) => {
    //   const target = e.target;
    //   if (!target) return;

    //   // get the current
    //   // const current = currentSlideRef.current;
    //   // const currentDot = currentDotRef.current;
    //   // console.log("current : ", current);
    //   // console.log("currentDot : ", currentDot);

    //   // get the index of event target
    //   const index = dotsArray.findIndex((dot: any) => dot === target);

    //   // set the current
    //   currentDotRef.current = dotsArray[index];

    //   // set the dot style
    //   Array.from(dotsRef.current.children).map((child: any) => {
    //     child.style.background = "";
    //   });
    //   currentDotRef.current.style.background = "coral";

    //   // set the position
    //   slidesRef.current.style.transform = `translateX(-${slidesArray[index].style.left})`;
    // });
  };

  useEffect(() => {
    init();
  }, []);

  // const focusRef: any = useRef();
  // const dispatch = useDispatch();
  // const counter = useSelector((state: any): any => state.counter);

  // useEffect(() => {
  //   focusRef.current.focus();
  // }, []);

  // console.log("counter : ", counter);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="home">
        <section>
          {/* <div>
            <h1>counter : {counter}</h1>
            <span>
              <button
                ref={focusRef}
                onClick={() => dispatch(increment("counter/increment"))}
              >
                add
              </button>
            </span>
          </div> */}
          <div className="carousel">
            <div className="slides" ref={slidesRef}>
              <div ref={currentSlideRef}>1</div>
              <div>2</div>
              <div>3</div>
            </div>
            <div className="arrows">
              <button onClick={prev}>prev</button>
              <button onClick={next}>next</button>
            </div>
            {/* <div className="dots" ref={dotsRef}>
              <button ref={currentDotRef}></button>
              <button></button>
              <button></button>
            </div> */}
          </div>
        </section>
      </main>
      {/* <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </>
  );
};

export default Home;
