import { useEffect, useRef } from "react";

const Test = () => {
  useEffect(() => {
    const slides = document.querySelector(".slides");
    const slidesArray = Array.from(slides.children);
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dots = document.querySelector(".dots");
    const dotsArray = Array.from(dots.children);
    const slideWidth = slidesArray[0].getBoundingClientRect().width;

    slidesArray.map((slide, index) => {
      slide.style.left = slideWidth * index + "px";
    });

    const moveSlides = (slides, current, target) => {
      slides.style.transform = `translateX(-${target.style.left})`;
      current.classList.remove("current-slide");
      target.classList.add("current-slide");
    };

    const updateDots = (current, target) => {
      current.classList.remove("current-dot");
      target.classList.add("current-dot");
    };

    prev.addEventListener("click", () => {
      const current = document.querySelector(".current-slide");
      const prev = current.previousSibling;
      if (!prev) return;
      moveSlides(slides, current, prev);
    });

    next.addEventListener("click", () => {
      const current = document.querySelector(".current-slide");
      const next = current.nextSibling;
      if (!next) return;
      moveSlides(slides, current, next);
    });

    dots.addEventListener("click", (e) => {
      const targetDot = e.target.closest("button");
      if (!targetDot) return;

      const currentSlide = document.querySelector(".current-slide");
      const currentDot = document.querySelector(".current-dot");
      const targetIndex = dotsArray.findIndex((dot) => dot === targetDot);
      const targetSlide = slidesArray[targetIndex];

      moveSlides(slides, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);

      //   console.log("dotsArrayTest : ", dotsArrayTest);
      //   console.log("targetSlide : ", targetSlide);
      //   console.log("targetIndex : ", targetIndex);
      //   console.log("targetDot : ", targetDot);
      //   console.log("currentRef.current[1] : ", currentRef.current[1]);
      //   console.log("currentDot : ", currentDot);
    });
  }, []);

  return (
    <>
      <main className="test">
        <section>
          <div className="carousel">
            <ul className="slides">
              <li className="slide current-slide"></li>
              <li className="slide"></li>
              <li className="slide"></li>
            </ul>
            <div className="arrows">
              <button className="arrow prev">prev</button>
              <button className="arrow next">next</button>
            </div>
            <div className="dots">
              <button className="dot current-dot"></button>
              <button className="dot"></button>
              <button className="dot"></button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;
