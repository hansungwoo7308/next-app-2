import { useSelector } from "react-redux";
import { selectMessage } from "lib/client/store/notifySlice";
import styled from "styled-components";
import { useEffect, useState } from "react";
export default function Notify() {
  const message = useSelector(selectMessage);
  const [status, setStatus]: any = useState("hidden");
  console.log("message : ", message);
  useEffect(() => {
    if (message) setStatus("visible");
    else setStatus("hidden");
  }, [message]);
  return (
    <Box status={status} isMessage={message}>
      <h1>Notification</h1>
      <h3>{message}</h3>
      {status === "hidden" && <button onClick={() => setStatus("visible")}>{"<"}</button>}
      {status === "visible" && <button onClick={() => setStatus("hidden")}>{">"}</button>}
    </Box>
  );
}
type Props = {
  status?: "hidden" | "visible";
  isMessage?: boolean;
};
const Box = styled.div<Props>`
  width: 15rem;
  height: 8rem;
  outline: 2px solid green;
  border-radius: 0 0.5rem 0.5rem 0;
  position: fixed;
  top: 50px;
  right: ${({ status }) => {
    if (status === "hidden") return "-15rem";
    else if (status === "visible") return "0";
  }};
  margin: 2rem;
  padding: 0.5rem 0.8rem;
  background-color: darkgreen;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #3778aa; */
  > button {
    height: 100%;
    position: absolute;
    top: 0;
    right: 100%;
    display: flex;
    align-items: center;
    outline: 2px solid cyan;
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.5rem;
    background-color: darkcyan;
    cursor: pointer;
  }
`;
