import { closeModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Modal() {
  const { modal }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  // console.log("modal.visible : ", modal.visible);
  if (!modal.visible) return null;
  return (
    <Background onClick={() => dispatch(closeModal())}>
      <Box onClick={(e) => e.stopPropagation()}>
        <h1>{modal.message}</h1>
        <div>
          <button onClick={() => dispatch(closeModal())}>Delete</button>
          <button onClick={() => dispatch(closeModal())}>Close</button>
        </div>
      </Box>
    </Background>
  );
}
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 100%;
  height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 5px solid purple;
  background-color: rgba(0, 0, 0, 0.5);
  :focus {
    /* border: 3px solid red; */
    display: none;
  }
`;
const Box = styled.div`
  position: absolute;
  background-color: white;
  outline: 5px solid;
  padding: 2rem;
  > div {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  button {
    padding: 1rem;
    cursor: pointer;
  }
`;
