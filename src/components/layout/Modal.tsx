import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { closeModal } from "lib/client/store/modalSlice";
import { setLoading } from "lib/client/store/notifySlice";
import { deleteUser } from "lib/client/store/usersSlice";
import { deleteData } from "lib/client/utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Modal() {
  const { auth, modal }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleAction = async () => {
    try {
      dispatch(setLoading(true));
      const response = await deleteData(`user/${modal.id}`, auth.accessToken);
      const { _id } = response.data.deletedUser;
      logResponse(response);
      dispatch(deleteUser({ _id }));
      dispatch(closeModal());
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  if (!modal.visible) return null;
  return (
    <Background onClick={() => dispatch(closeModal())}>
      <Box onClick={(e) => e.stopPropagation()}>
        <h1>{modal.message}</h1>
        <div>
          <button onClick={handleAction}>Action</button>
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
