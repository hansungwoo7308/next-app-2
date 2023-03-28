import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Slider = () => {
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

    const hideArrows = (slidesArray, prev, next, targetIndex) => {
      if (targetIndex === 0) {
        prev.classList.add("hidden");
        next.classList.remove("hidden");
      } else if (targetIndex === slidesArray.length - 1) {
        prev.classList.remove("hidden");
        next.classList.add("hidden");
      } else {
        prev.classList.remove("hidden");
        next.classList.remove("hidden");
      }
    };

    prev.addEventListener("click", () => {
      const currentSlide = document.querySelector(".current-slide");
      const prevSlide = currentSlide.previousSibling;
      const currentDot = document.querySelector(".current-dot");
      const prevDot = currentDot.previousSibling;
      const prevIndex = slidesArray.findIndex((slide) => slide === prevSlide);
      console.log("prevSlide : ", prevSlide);
      moveSlides(slides, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
      hideArrows(slidesArray, prev, next, prevIndex);
    });

    next.addEventListener("click", () => {
      const currentSlide = document.querySelector(".current-slide");
      const nextSlide = currentSlide.nextSibling;
      const currentDot = document.querySelector(".current-dot");
      const nextDot = currentDot.nextSibling;
      const nextIndex = slidesArray.findIndex((slide) => slide === nextSlide);
      moveSlides(slides, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideArrows(slidesArray, prev, next, nextIndex);
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
      hideArrows(slidesArray, prev, next, targetIndex);
    });
  }, []);

  return (
    <div className="slider">
      <ul className="slides">
        <li className="slide current-slide">
          <Image src={"/images/planet_earth.jpeg"} width={1000} height={1000} />
        </li>
        <li className="slide">
          {/* <h1>test</h1> */}
          <Image src={"/images/planet_moon.jpeg"} width={1000} height={1000} />
        </li>
        <li className="slide">
          <Image
            src={"/images/planet_jupiter.jpeg"}
            width={1000}
            height={1000}
          />
        </li>
        <li className="slide">
          <Image
            src={"/images/planet_jupiter.jpeg"}
            width={1000}
            height={1000}
          />
        </li>
      </ul>
      <div className="arrows">
        <button className="arrow prev hidden">
          <IoMdArrowDropleft size={70} />
        </button>
        <button className="arrow next">
          <IoMdArrowDropright size={70} />
        </button>
      </div>
      <div className="dots">
        <button className="dot current-dot"></button>
        <button className="dot"></button>
        <button className="dot"></button>
        <button className="dot"></button>
      </div>
    </div>
  );
};

export default Slider;
