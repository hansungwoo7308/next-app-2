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
  color: inherit;
  text-decoration: none;
  }
  button {
    border: none;
    background-color: lightgray;
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
  }
  // header, navigation
  header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: black;
    color: #ccc;
    z-index: 100;
    section {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      > form {
        display: flex;
        gap: 15px;
        align-items: center;
        > input {
          height: 50%;
          padding: 10px;
        }
      }
    }
    ul, li, a {
      height: 100%;
      display: flex;
      align-items: center;
    }
    nav {
      /* outline: 2px dashed green; */
      ul {
        position: relative;
        list-style: none;
        display: flex;
        gap: 40px;
      }
      .focus {
        height: 3px;
        position: absolute;
        left:0;
        bottom: 0;
        background-color: coral;
        outline: none;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .selectedMenu {
        color: coral;
        a:hover {
          color: coral;
        }
      }
      .unselectedMenu {
        color: #ccc;
      }
    }
    
    button {
      all: unset;
      cursor: pointer;
    }
    a:hover, li:hover, button:hover {
      color: #fff;
    }
  }
  // pages
  .signin {
    /* outline: 3px solid blue; */
    section {
      display: flex;
      flex-direction: column;
      form {
        width: 50%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        border: 2px solid red;
      }
      input {
        width: 50%;
        padding: 8px;
        outline: none;
        border: 3px solid royalblue;
        /* border: 3px solid steelblue; */
        /* border: 3px solid dodgerblue; */
        border-radius: 5px;
        :hover, :focus {
          border: 3px solid var(--color-focus);
        }
      }
      button {
        /* all: unset; */
        width: 50%;
        background-color: darkgray;
        color: white;
        /* outline: none; */
        border: none;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
        :hover {
          background-color: #000;
        }
      }
    }

  }
  .signup {
    section {
      position: relative;
      form {
        width: 50%;
        min-width: 300px;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        /* border: 1px solid red; */
        div {
          width: 50%;
        }
        input {
          width: 100%;
          padding: 8px;
          outline: none;
          border: 3px solid royalblue;
          /* border: 3px solid steelblue; */
          /* border: 3px solid dodgerblue; */
          border-radius: 5px;
          :hover, :focus {
            border: 3px solid var(--color-focus);
          }
        }
        small {
          color: red;
        }
        button {
          /* all: unset; */
          width: 50%;
          background-color: darkgray;
          color: white;
          /* outline: none; */
          border: none;
          border-radius: 5px;
          padding: 10px;
          margin-top: 30px;
          cursor: pointer;
          :hover {
            background-color: #000;
          }
        }
      }
    }
  }
  .admin {
    section {
      flex-direction: column;
      gap: 15px;
    }
  }
  
  // users page
  .users {
    > section {
      position: relative;
      > h1 {
        position: absolute;
        top: 70px;
        right: 20px;
      }
      > div {
        outline: 2px solid coral;
      }
    }
  }
  .user {
    > section {
      > div {
        display: flex;
        flex-direction: column;
        outline: 3px solid coral;
      }

    }
  }
  // components
  .auth-button {
    display: flex;
    gap: 40px;
  }
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
  .add-post-form {
    outline: 2px solid coral;
    display: flex;
    flex-direction: column;
    > form {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      > textarea {
        height: 40%;

      }
      > button {
        margin-top: 20px;
      }
    }
  }
  .todos {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    > * {
      outline: 2px solid lightgray;
    }
    > div:first-of-type {
      width: 100%;
      /* outline: 2px solid red; */
      > form > div {
        display: flex;
        justify-content: space-between;

      }
    }
    > div:last-of-type {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      /* outline: 2px solid blue; */
      > article {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
