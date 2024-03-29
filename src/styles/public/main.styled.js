import styled from "styled-components";
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #fff;
  > section {
    width: 80%;
    max-width: 1000px;
    min-height: 100vh;
    position: relative;
    padding: 1rem;
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid coral;
    /* outline: 2px solid coral; */

    > div {
      width: 100%;
      padding: 1rem;
      border: 2px solid green;
    }
  }
  @media (width < 1000px) {
    width: 100%;
    background-color: #222;
    > section {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
      > div {
        width: 100%;
      }
    }
  }
  @media (width<500px) {
    width: 100%;
    background-color: #111;
    > section {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
      > div {
        width: 100%;
      }
    }
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
`;

// const test = styled.div`
//   > div {
//     width: 80%;
//     padding: 20px;
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//     outline: 3px solid green;
//     > ul {
//       display: flex;
//       flex-direction: column;
//       gap: 10px;
//       > a {
//         padding: 10px;
//         outline: 2px solid;
//         :focus,
//         :hover {
//           outline: 2px solid coral;
//         }
//       }
//     }
//     > a > button {
//       width: 100%;
//       padding: 20px;
//     }
//     form {
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: center;
//       gap: 20px;
//       input {
//         width: 100%;
//         border: 2px solid;
//         border-radius: 5px;
//         padding: 10px;
//         outline: none;
//         :focus {
//           border-color: coral;
//         }
//       }
//       textarea {
//         width: 100%;
//         height: 50%;
//         padding: 10px;
//         border: 2px solid;
//         border-radius: 5px;
//         outline: none;
//       }
//       button {
//         width: 100%;
//         padding: 10px;
//         background-color: lightgray;
//         border: none;
//         border-radius: 5px;
//         cursor: pointer;
//         :hover {
//           background-color: black;
//           color: white;
//         }
//       }
//     }
//   }
// `;
