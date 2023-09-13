import { useGetUsersQuery, usersApiSlice } from "lib/utils/usersApiSlice";
import { ElementType, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start } from "repl";
import styled from "styled-components";
import { animate, motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import ForwardedMotionDiv from "@/components/ForwardedMotionDiv";
import { duration } from "moment";
import Stagger from "@/components/Stagger";
import Loader from "@/components/Loader";
const parent = {
  animate: {
    transition: {
      // 페런트 변수에 칠드런의 지연과 시차를 설정한다
      // 칠드런의 각각의 애니메이션이 실행되는 시간을 다르게 설정하기 위해서 패런트에서 설정해준다
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};
const children = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      // 칠드런 변수에 타이밍펑션과 듀레이션을 설정한다
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};
export default function Page(props: any, ref: any) {
  // method
  const targetRef = useRef(null);
  // const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollY, [0, 1000], ["0%", "50%"]);

  // method
  // const { scrollY } = useScroll();
  // const y = useTransform(scrollY, [0, 500], ["0%", "50%"]);

  // method
  // const { scrollYProgress } = useScroll();
  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // console.log({ props });
  // rtk query
  const dispatch = useDispatch();
  const { auth, usersApi }: any = useSelector((store) => store);
  const { data, isLoading, isSuccess, isError, error, refetch } = useGetUsersQuery({});

  useEffect(() => {
    if (auth.accessToken) refetch();
  }, [auth.accessToken]);
  // useEffect(() => {
  //   const start = 700;
  //   const stop = 3000;
  //   const image: any = document.querySelector(".image-outer");
  //   document.addEventListener("scroll", (e) => {
  //     const scrollY = window.scrollY;
  //     // console.log({ scrollY });
  //     if (scrollY > start && scrollY < stop) {
  //       const delta = scrollY - start;
  //       const scale = Math.max(5 - delta / 500, 1);
  //       console.log({ scale });
  //       image.style.transform = `scale(${scale})`;
  //     }
  //   });
  // }, []);
  useEffect(() => {
    // 팝업될 요소들
    const pops: any = document.querySelectorAll(".fade-in");
    document.addEventListener("scroll", () => {
      for (let pop of pops) {
        const heightOfViewport = window.innerHeight; // 고정값이다.
        const lengthBetweenBodyTopAndElementTop = pop.getBoundingClientRect().top; // 스크롤다운 시에 줄어든다.
        const gap = 100;
        // [뷰포트] 높이 > [바디 상단에서 엘리먼트 상단까지의] 거리 === 뷰포트 하단에 출현할 때 (갭을 주어서 하단에서 100px에 출현)
        if (heightOfViewport - gap > lengthBetweenBodyTopAndElementTop) {
          pop.classList.add("active");
        } else {
          pop.classList.remove("active");
        }
      }
      // const pop = fade-in?.getBoundingClientRect();
      // if (window.innerHeight > pop.top) {
      //   fade-in.classList.add("active");
      // } else {
      //   fade-in.classList.remove("active");
      // }
    });
  }, []); // 스크롤 시 뷰포트 하단에서부터 엘리먼츠가 팝업되는 것처럼 나타나도록 스타일을 준다.
  useEffect(() => {
    const faders: any = document.querySelectorAll(".fader");
    const observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // console.log("intersecting...");
          // observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove("active");
          // entry.target.style.transition='';
          // console.log("Not intersecting...");

          // observer.observe(entry.target);
        }
      }
    });
    for (let fader of faders) {
      observer.observe(fader);
    }
    // console.log({ faders });
  }, []);
  return (
    <>
      <Main>
        <section ref={targetRef} className="section1">
          {/* <motion.div
            // 시간차를 다르게 하기 위한, 패런트의 커스텀 트랜지션 설정 (항상 패런트에서 설정)
            variants={parent}
            // 커스텀 변수명으로 설정
            initial="initial"
            animate="animate"
            // transition={{  ease: "easeIn", staggerChildren: 1 }}
            style={{
              display: "flex",
              gap: "1rem",
              border: "none",
            }}
          >
            {["aaa", "bbb", "ccc"].map((item: any) => (
              <motion.div
                // 칠드런의 커스텀 트렌지션 설정
                variants={children}
              >
                {item}
              </motion.div>
            ))}
          </motion.div> */}
          {/* <Stagger /> */}
          <motion.div style={{ y }} className="part1"></motion.div>
          <Loader />
          <h1>asdasdadasdasd</h1>
        </section>
        <section></section>
        <section></section>
        <section></section>
        {/* <section>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fader">ashdaldhad1</div>
          <div className="fader">ashdaldhad2</div>
          <div className="fader">ashdaldhad3</div>
          <div className="fader">ashdaldhad4</div>
        </section> */}
      </Main>
    </>
  );
}
const Main = styled.main`
  > section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0;
    border: 2px dashed;
    position: relative;

    .fade-in,
    .fader {
      padding: 1rem;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.5s ease-out;
      /* transform: scale(0.8); */
      display: flex;
      flex-direction: column;
      border: none;
      /* width: 100px; */
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(10vh);
      /* transform: translateY(50px); */
      transition: all 0.5s ease-out;
      /* transform: scale(0.8); */
    }
    .active {
      opacity: 1;
      transform: translateY(0);
      /* transform: scale(1); */
    }
  }
  .container {
    width: 80%;
    height: 2500px;
    position: absolute;
    top: 50px;
    left: 10%;
    border: 2px solid coral;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    will-change: transform;
    .item {
      width: 100%;
      height: 0;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding-bottom: 50%;
      overflow: hidden;
      .image-outer {
        width: 100%;
        height: calc(100% + (40px * 2));
        position: absolute;
        top: calc(-1 * (40px));
        background-repeat: no-repeat;
        background-size: cover;
        will-change: transform;
      }
    }
  }
  .section1 {
    width: 100%;
    max-width: initial;
    overflow: hidden;
    /* background: transparent; */
  }
  .part1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url("/images/planet_jupiter.jpeg");
    background-position: center;
    /* background-image: url("/images/planet_jupiter.jpeg"); */
    /* background-color: rgba(0, 0, 0, 0.5); */
    /* opacity: 0.2; */
    /* filter: brightness(80%); */

    /* background-attachment: fixed; */
  }
  .part2 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/images/planet_moon.jpeg");
    background-position: center;
    /* background-attachment: fixed; */
  }
`;
// useEffect(() => {
//   let current = 0;
//   let target = 0;
//   let ease = 0.01;
//   let windowWidth, containerHeight, imageHeight, skewDiff;
//   // get the elements
//   const container: any = document.querySelector(".container");
//   const images = document.querySelectorAll(".image-outer");
//   images.forEach((image: any, index: any) => {
//     image.style.backgroundImage = `url(/images/test_${index}.jpeg)`;
//   });
//   function lerp(start: any, end: any, times: any): any {
//     return start * (1 - times) + end * times;
//   }
//   function setTransform(el: any, transform: any) {
//     el.style.transform = transform;
//   }
//   function setupAnimation() {
//     windowWidth = window.innerWidth;
//     containerHeight = container.getBoundingClientRect().height;
//     imageHeight = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);
//     document.body.style.height = `${containerHeight}px`;
//     smoothScroll();
//   }
//   function smoothScroll() {
//     current = lerp(current, target, ease);
//     current = parseFloat(current.toFixed(2));
//     target = window.scrollY;
//     setTransform(containerRef.current, `translateY(${current})px`);
//     requestAnimationFrame(smoothScroll);
//   }
//   // setupAnimation();
// }, []);
// useEffect(() => {
//   // let current = 0;
//   // let target = 0;
//   // let ease = 0.01;
//   // let windowWidth, containerHeight, imageHeight, skewDiff;
//   // get the elements
//   const container: any = document.querySelector(".container");
//   const images = document.querySelectorAll(".image-outer");
//   containerRef.current = container;
//   images.forEach((image: any, index: any) => {
//     imagesRef.current = [...imagesRef.current, image];
//     image.style.backgroundImage = `url(/images/test_${index}.jpeg)`;
//   });
//   console.log({ containerRef, imagesRef });
//   function lerp(start: any, end: any, times: any): any {
//     return start * (1 - times) + end * times;
//   }
//   function setTransform(el: any, transform: any) {
//     el.style.transform = transform;
//   }
//   function setupAnimation() {
//     setWindowWidth(window.innerWidth);
//     setContainerHeight(container.getBoundingClientRect().height);
//     const fade-in: any = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);
//     setImageHeight(fade-in);
//     // windowWidth = window.innerWidth;
//     // containerHeight = container.getBoundingClientRect().height;
//     // imageHeight = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);
//     document.body.style.height = `${containerHeight}px`;
//     smoothScroll();
//     // console.log({ windowWidth, containerHeight, imageHeight });
//   }
//   function smoothScroll() {
//     let fade-in = lerp(current, target, ease);
//     fade-in = parseFloat(current.toFixed(2));
//     setCurrent(fade-in);
//     setTarget(window.scrollY);
//     // current = lerp(current, target, ease);
//     // current = parseFloat(current.toFixed(2));
//     // target = window.scrollY;
//     setTransform(containerRef.current, `translateY(${current})px`);
//     requestAnimationFrame(smoothScroll);
//     console.log({ current });
//     console.log({ "current.toFixed(2)": current.toFixed(2) });
//     console.log({ current });
//   }
//   // setupAnimation();
// }, []);
