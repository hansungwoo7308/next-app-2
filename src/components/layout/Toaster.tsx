import { ToastContainer } from "react-toastify";
import styled from "styled-components";
export default function Toaster() {
  // return <ToastContainer theme="dark" progressClassName={"Toastify__progress-bar--warning"} />;
  return <StyledToastContainer />;
}
const Box = styled.div``;
const StyledToastContainer = styled(ToastContainer)``;
