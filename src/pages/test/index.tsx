import { useGetUsersQuery, usersApiSlice } from "lib/utils/usersApiSlice";
import { ElementType, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start } from "repl";
import styled from "styled-components";
export default function Page() {
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

  // useEffect(() => {
  //   const intersectionObserver = new IntersectionObserver(
  //     (entries: IntersectionObserverEntry[], observser: IntersectionObserver) => {
  //       for (let entry of entries) {
  //         console.log(entry);
  //         // if (entry.isIntersecting) {
  //         //   // entry.target.style.opacity = "1";
  //         //   // entry.target.style.transform = "translateY(0)";
  //         //   // entry.target.style.transition = "all 10s";
  //         //   // observser.unobserve(entry.target);
  //         //   entry.target.classList.add("active");
  //         // } else {
  //         //   console.log("0");
  //         //   // entry.target.style.opacity = "0";
  //         //   // entry.target.style.transform = "translateY(100px)";
  //         //   // entry.target.style.transition = "all 10s";
  //         // }
  //       }
  //       // entries.forEach((entry) => {
  //       //   if (entry.isIntersecting) {
  //       //   } else {
  //       //   }
  //       //   console.log(entry);
  //       // });
  //       // console.log(entries);
  //       // if (entries.intersectionRect) {
  //       //   const bottom = entries.intersectionRect.bottom;
  //       //   console.log({ bottom });
  //       // }
  //     },
  //     { threshold: 0.5 }
  //   );
  //   // console.log(intersectionObserver);
  //   const element: any = document.querySelector(".test");
  //   intersectionObserver.observe(element);
  // }, []);
  useEffect(() => {
    // 팝업될 요소들
    const pops: any = document.querySelectorAll(".test");
    document.addEventListener("scroll", () => {
      for (let pop of pops) {
        // const popBoundingTop = pop.getBoundingClientRect().top;
        // 뷰포트 높이 > 바디 상단에서 엘리먼트 상단까지의 거리 === 뷰포트 하단에 출현할 때
        if (window.innerHeight > pop.getBoundingClientRect().top) {
          pop.classList.add("active");
        } else {
          pop.classList.remove("active");
        }
      }
      // const pop = test?.getBoundingClientRect();
      // if (window.innerHeight > pop.top) {
      //   test.classList.add("active");
      // } else {
      //   test.classList.remove("active");
      // }
    });
  }, []);

  useEffect(() => {
    const faders: any = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          console.log("intersecting...");
          entry.target.classList.add("active");
          // observer.unobserve(entry.target);
        } else {
          // entry.target.classList.remove("active");
          // entry.target.style.transition='';
          console.log("Not intersecting...");

          // observer.observe(entry.target);
        }
      }
    });
    for (let fader of faders) {
      observer.observe(fader);
    }
    console.log({ faders });
  }, []);
  return (
    <>
      <Main>
        {/* <div>
            {isLoading && <h1>Loading...</h1>}
            {isSuccess && (
              <>
                <h1>User List</h1>
                <div>
                  {data.users.map((user: any, index: number) => (
                    <h5 key={index}>{user.username}</h5>
                  ))}
                </div>
              </>
            )}
          </div> */}
        {/* <div className="content">
            <h1 className="first">testsdfasd</h1>
            <h1 className="second">testsdfasd</h1>
            <h1 className="third">testsdfasd</h1>
          </div> */}
        {/* <section>
        </section> */}
        {/* <img src="/images/planet_earth.jpeg" alt="alt" /> */}
        {/* <div className="container">
          <div className="item">
            <div className="image-outer"></div>
          </div>
          <div className="item">
            <div className="image-outer"></div>
          </div>
          <div className="item">
            <div className="image-outer"></div>
          </div>
        </div> */}
        {/* <div className="container"></div>
        <div className="container"></div> */}
        {/* <section className="test-section">
          <div className="image-outer">
            <img src="/images/test_0.jpeg" alt="alt" />
          </div>
        </section> */}
        <section></section>
        <section></section>
        <section>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="test">
            <h1>tessdfsdfsdfsasdasdasdasdst</h1>
          </div>
          <div className="fade-in">ashdaldhad1</div>
          <div className="fade-in">ashdaldhad2</div>
          <div className="fade-in">ashdaldhad3</div>
          <div className="fade-in">ashdaldhad4</div>
        </section>
        <section></section>
      </Main>
    </>
  );
}
const Main = styled.main`
  > section {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    padding: 0;
    .fade-in {
      padding: 1rem;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.5s ease-out;
      /* transform: scale(0.8); */
    }
    .test {
      display: flex;
      flex-direction: column;
      border: none;
      /* width: 100px; */
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.5s ease-out;
      /* transform: scale(0.8); */
    }
    .active {
      opacity: 1;
      transform: translateY(0);
      /* transform: scale(1); */
    }
  }
  > .test-section {
    height: 300vh;
    /* justify-content: */
    display: flex;
    flex-direction: column;
    justify-content: start;
    .image-outer {
      width: 500px;
      position: sticky;
      top: 50px;
      transform: scale(2);
      will-change: transform;
    }
    img {
      /* top: 100px; */
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
  > .sdfsfd-section {
    position: absolute;
    top: 0;
    border: 2px solid;
    .content {
      max-width: 80%;
      h1 {
        position: relative;
        transform-origin: left;
        transform: scale(1);
        transition: all 0.5s;
      }
    }
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
//     const test: any = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);
//     setImageHeight(test);
//     // windowWidth = window.innerWidth;
//     // containerHeight = container.getBoundingClientRect().height;
//     // imageHeight = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);
//     document.body.style.height = `${containerHeight}px`;
//     smoothScroll();
//     // console.log({ windowWidth, containerHeight, imageHeight });
//   }
//   function smoothScroll() {
//     let test = lerp(current, target, ease);
//     test = parseFloat(current.toFixed(2));
//     setCurrent(test);
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
