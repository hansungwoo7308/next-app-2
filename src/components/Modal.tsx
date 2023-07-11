import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
export default function Modal({ action, close }: any) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <Background onClick={close}>
      <Box onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleSubmit((data) => {
            const { title, content } = data;
            action({ title, content });
            close();
          })}
        >
          <div>
            <input {...register("title", { required: true })} type="text" placeholder="Title" />
            <textarea
              {...register("content", { required: true })}
              cols={30}
              rows={10}
              placeholder="Content"
            ></textarea>
          </div>
          <div>
            <button>Submit</button>
            <button onClick={close}>Close</button>
          </div>
        </form>
      </Box>
    </Background>
  );
}
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
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
  width: 40%;
  height: 40%;
  position: absolute;
  background-color: white;
  outline: 5px solid black;
  padding: 20px;
  /* display: none; */
  > form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div:nth-of-type(1) {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      > input {
        width: 100%;
        height: 30px;
        padding: 10px;
      }
      > textarea {
        width: 100%;
        height: 80%;
        padding: 10px;
      }
    }
    > div:nth-of-type(2) {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 10px;
      /* outline: 1px solid blue; */
      > button {
        width: 50%;
        padding: 10px;
      }
    }
  }
`;
