import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { closeModal } from "lib/client/store/modalSlice";
import { setLoading, setNotify } from "lib/client/store/notifySlice";
import { deleteUser } from "lib/client/store/usersSlice";
import { deleteData } from "lib/client/utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Modal() {
  const { auth, modal }: any = useSelector((store) => store);
  const { name, id, ids } = modal;
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      // if (name === "deleteUser") handleDeleteUser();
      // else if (name === "deleteProduct") handleDeleteProduct();
      switch (name) {
        case "deleteUser":
          handleDeleteUser();
          break;
        case "deleteProduct":
          handleDeleteProduct();
          break;
        case "deleteProducts":
          handleDeleteProducts();
          break;
        default:
          break;
      }
      dispatch(closeModal());
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  const handleDeleteUser = async () => {
    // delete
    const response = await deleteData(`user/${id}`, auth.accessToken);
    const { _id } = response.data.deletedUser;
    // out
    logResponse(response);
    dispatch(deleteUser({ _id }));
  };
  const handleDeleteProduct = async () => {
    // delete
    const response = await deleteData(`product/${id}`, auth.accessToken);
    // const { _id } = response.data.deletedProduct;
    // out
    logResponse(response);
    // dispatch(deleteUser({ _id }));
  };
  const handleDeleteProducts = async () => {
    try {
      const response = await deleteData("product", auth.accessToken, { ids });
      const { deletedProducts } = response.data;
      logResponse(response);
    } catch (error) {
      logError(error);
    }
  };
  if (!modal.visible) return null;
  return (
    <Background onClick={() => dispatch(closeModal())}>
      <Box onClick={(e) => e.stopPropagation()}>
        <h1>{modal.message}</h1>
        <div>
          <button onClick={handleSubmit}>Confirm</button>
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
