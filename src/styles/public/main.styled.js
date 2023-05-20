import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  > section {
    width: 80%;
    min-height: 100vh;
    position: relative;
    padding: 20px;
    padding-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    outline: 2px solid coral;
    > h1 {
      position: absolute;
      top: 70px;
      right: 20px;
    }
    > div {
      outline: 3px solid green;
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
