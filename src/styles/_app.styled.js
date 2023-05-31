import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  // initialization
  :root {
    --color-main: #00704a;
    --color-focus: coral;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    /* outline: 1px solid; */
  }
  html, body {
    max-width: 100vw;
    /* overflow-x: hidden; */
  }
  a {
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }
  button {
    border: none;
    background-color: lightgray;
    padding: 10px;
    cursor: pointer;
    :hover {
      background-color: black;
      color: white;
    }
  }
  textarea {
    resize: none;
  }
  li {
    list-style: none;
  }
  img {
    width: 100%;
    height: 100%;
  }
  input, select {
    padding: 5px;
  }
  textarea{
    padding: 10px;

  }
  
  
  
  // components
  .slider {
    width: 300px;
    height: 300px;
    position: relative;
    outline: 5px solid coral;
    overflow: hidden;
    .slides {
      width: 100%;
      height: 100%;
      list-style: none;
      position: relative;
      transition: transform 0.5s;
      .slide {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        /* border: 3px solid green; */
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .current-slide {
      }
    }
    .arrows {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      pointer-events: none;
      .arrow {
        width: 20%;
        height: 100%;
        border: none;
        cursor: pointer;
        background-color: transparent;
        pointer-events: all;
        /* z-index: 10; */
        svg {
          width: 100%;
          display: none;
        }
        :hover {
          color: #000;
          background-color: rgba(255,255,255,0.3);
          svg {
            display: block;
          }
        }
      }
      .prev {
        position: absolute;
        left: 0;
      }
      .next {
        position: absolute;
        right: 0;
      }
      .hidden {
        display: none;
      }
    }
    .dots {
      width: 100%;
      height: 20%;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 20px;
      .dot {
        width: 15px;
        height: 15px;
        /* border: none; */
        border: 2px solid;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
        margin-bottom: 20px;
        pointer-events: all;
        display: none;
      }
      :hover .dot {
        display: block;
      }
      .current-dot {
        background-color: coral;
      }
    }
  }
  
  
`;
