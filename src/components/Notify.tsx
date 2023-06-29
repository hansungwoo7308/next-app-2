import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { setTimeoutId, setVisible } from "lib/client/store/notifySlice";
export default function Notify() {
  const { notify }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setVisible(false));
    }, 3000);
    dispatch(setTimeoutId(timeoutId));
  }, [notify.count]);
  return (
    <>
      {notify.loading && <Loading />}
      <Box status={notify.visible}>
        <div onMouseOver={() => clearTimeout(notify.timeoutId)}>
          <h3>Notification</h3>
          <p>{notify.message.slice(0, 10)}...</p>
        </div>
        {notify.visible && <button onClick={() => dispatch(setVisible(false))}>{">"}</button>}
        {!notify.visible && <button onClick={() => dispatch(setVisible(true))}>{"<"}</button>}
      </Box>
      {/* <Box status={status}>
        {notify.success && (
          <>
            <h1>success</h1>
            {status === "hidden" && <button onClick={() => setStatus("visible")}>{"<"}</button>}
            {status === "visible" && <button onClick={() => setStatus("hidden")}>{">"}</button>}
          </>
        )}
        {notify.error && (
          <>
            <h1>error</h1>
            {status === "hidden" && <button onClick={() => setStatus("visible")}>{"<"}</button>}
            {status === "visible" && <button onClick={() => setStatus("hidden")}>{">"}</button>}
          </>
        )}
      </Box> */}
    </>
  );
  // return (
  //   <Box status={status} isMessage={message}>
  //     <h1>Notification</h1>
  //     <h3>{message}</h3>
  // {status === "hidden" && <button onClick={() => setStatus("visible")}>{"<"}</button>}
  // {status === "visible" && <button onClick={() => setStatus("hidden")}>{">"}</button>}
  //   </Box>
  // );
}
type Props = {
  status?: boolean;
  // isMessage?: boolean;
  // status: "loading" | "success" | "error" | null;
  // response: any;
};
const Box = styled.div<Props>`
  width: 15rem;
  height: 8rem;
  /* border: 2px solid green; */
  border-radius: 0 0.5rem 0.5rem 0;
  position: fixed;
  top: 50px;
  right: ${({ status }) => (status ? "0" : "-15rem")};
  margin-top: 2rem;
  /* padding: 0.5rem 0.8rem; */
  background-color: darkgreen;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  > button {
    height: 100%;
    position: absolute;
    top: 0;
    right: 100%;
    display: flex;
    align-items: center;
    border: 2px solid cyan;
    border-radius: 0.5rem 0 0 0.5rem;
    outline: 2px solid cyan;
    padding: 0.5rem;
    background-color: darkcyan;
    cursor: pointer;
  }
  > div {
    height: 100%;
    padding: 1rem;
    /* border: 2px solid red; */
  }
`;
