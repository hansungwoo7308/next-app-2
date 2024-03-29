import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { useDispatch } from "react-redux";
import { postData } from "lib/client/utils/fetchData";
import { toast } from "react-toastify";
import { setLoading } from "lib/client/store/loadingSlice";
export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status } = useSession();
  // const [loading, setLoading]: any = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
    reset,
  } = useForm();
  const password = useRef();
  password.current = watch("password");
  const handleSignup = async (data: any) => {
    // console.log("data : ", data);
    try {
      dispatch(setLoading(true));
      const response: any = await postData("auth/signup", data);
      logResponse(response);
      dispatch(setLoading(false));
      toast.success("Signed Up");
      // reset
      reset();
      setFocus("username");
      // router.push('/auth/signin')
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setFocus("username");
  }, []);
  // useEffect(() => {
  //   setFocus("name", { shouldSelect: true });
  // }, [setFocus]);
  if (status === "authenticated") router.push("/");
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Main>
        <section>
          <form onSubmit={handleSubmit(handleSignup)}>
            <div>
              <input
                {...register("username", {
                  // required: true,
                  required: "This is required",
                  maxLength: 8,
                })}
                className="input"
                type="text"
                placeholder="Name"
              />
              {errors.username && errors.username.type === "required" && (
                <small>This field is required.</small>
              )}
              {errors.username && errors.username.type === "maxLength" && (
                <small>Max Length is 8 character.</small>
              )}
            </div>
            <div>
              <input
                {...register("email", {
                  // required: true,
                  required: "This is required",
                  // maxLength: 10,
                })}
                className="input"
                type="email"
                placeholder="Email"
                autoComplete="off"
              />
              {errors.email && <small>This email field is required.</small>}
            </div>
            <div>
              <input
                {...register("password", {
                  // required: true,
                  required: "This is required",
                  maxLength: 10,
                  // minLength: {
                  //   value: 4,
                  //   message: "Min length is 4",
                  // },
                })}
                className="input"
                type="password"
                placeholder="Password"
              />
              {errors.password && errors.password.type === "required" && (
                <small>This field is required.</small>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <small>Password max length is 10 characters.</small>
              )}
            </div>
            <div>
              <input
                {...register("passwordConfirm", {
                  // required: true,
                  required: "This is required",
                  validate: (passwordConfirm) => {
                    return passwordConfirm === password.current;
                  },
                })}
                className="input"
                type="password"
                placeholder="Password Confirm"
              />
              {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
                <small>This field is required.</small>
              )}
              {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && (
                <small>The password is not matched.</small>
              )}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  display: flex;
  flex-direction: column;
  section {
    position: relative;
    form {
      width: 70%;
      height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      outline: 3px solid green;
      padding: 20px;
      div {
        width: 50%;
        max-width: 300px;
      }
      input {
        width: 100%;
        padding: 8px;
        outline: none;
        border: 3px solid royalblue;
        /* border: 3px solid steelblue; */
        /* border: 3px solid dodgerblue; */
        border-radius: 5px;
        :hover,
        :focus {
          border: 3px solid var(--color-focus);
        }
      }
      small {
        color: red;
      }
      button {
        /* all: unset; */
        width: 50%;
        background-color: darkgray;
        color: white;
        /* outline: none; */
        border: none;
        border-radius: 5px;
        padding: 10px;
        margin-top: 30px;
        cursor: pointer;
        :hover {
          background-color: #000;
        }
      }
    }
  }
`;
