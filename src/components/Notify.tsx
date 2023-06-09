import { useSelector } from "react-redux";
import { selectMessage } from "lib/client/store/notifySlice";
import styled from "styled-components";
export default function Notify() {
  const message = useSelector(selectMessage);
  return (
    <Box>
      <h1>{message}</h1>
    </Box>
  );
}
const Box = styled.div``;
