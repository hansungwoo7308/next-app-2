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

  // common
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      /* min-width: 350px; */
      min-width: 700px;
      height: 100vh;
      outline: 2px solid coral;
    }
  }

  // pages
  .home {
    section {
      flex-direction: column;
      gap: 20px;
      /* border: 4px solid; */
      div {
        display: flex;
        gap: 20px;
        align-items: center;
        outline: 2px solid;
        padding: 20px;
      }
      button {
        width: 100px;
        height: 50px;
        outline: none;
        border: 2px solid;
        background-color: lightgray;
        color: black;
        cursor: pointer;
        :focus {
          background-color: black;
          color: white;
          border: 2px solid coral;
        }
      }
    }
  }

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

  .posts, .blogs {
    section {
      div {
        width: 80%;
        min-width: 500px;
        max-width: 800px;
        /* height: 500px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
        gap: 20px;
      }
      a {
        /* max-width: 800px; */
        outline: 3px solid;
        border-radius: 5px;
        padding: 10px;
        :hover, :focus {
          outline: 3px solid coral;
        }
        
      }
    }

  }

  .posts-slug, .blog {
    section {
      height: unset;
      padding: 20px 10%;
      margin-top: 50px;
      div {
        width:100%;
        outline: 3px solid;
        img {
          width: 100%;
        }
        ul {
          list-style: none;
        }
        p, pre, ul {
          margin: 20px 0;
        }
        h2 {
          margin-top: 50px;
        }
      }
    }

  }

  .blogs-create {
    section {
      flex-direction: column;
    }
    form {
      width: 90%;
      max-width: 1000px;
      height: 70%;
      max-height: 800px;
      outline: 1px solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      input {
        width: 80%;
        border: 2px solid;
        border-radius: 5px;
        padding: 10px;
        outline: none;
        :focus {
          border-color: coral;
        }
      }
      textarea {
        width: 80%;
        height: 50%;
        resize: none;
        padding: 10px;
        border: 2px solid;
        border-radius: 5px;
        outline: none;
      }
      button {
        width: 50%;
        padding: 10px;
        background-color: lightgray;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        :hover {
          background-color: black;
          color: white;
        }
      }
      
      
    }


  }

  // components
  .auth-button {
    display: flex;
    gap: 40px;
  }


`;
