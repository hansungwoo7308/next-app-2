import { useDispatch, useSelector } from "react-redux";
import { logOut, selectAuth, setCredentials } from "lib/client/store/authSlice";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
import { getData } from "lib/client/utils/fetchData";
import Image from "next/image";
export default function AuthButton(props: any) {
  const auth = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutAuth = async (e: any) => {
    e.preventDefault();
    try {
      const response = await getData("authentication/logout");
      logResponse(response);
      // localStorage.removeItem("accessToken");
      dispatch(logOut());
      router.push("/");
    } catch (error) {
      logError(error);
    }
  };
  return (
    <Box>
      {auth.status ? (
        <>
          {auth.mode === "general" && <button onClick={logoutAuth}>Sign out1</button>}
          {auth.mode === "nextauth" && (
            <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out2</button>
          )}
          <Link className="profile" href={"/auth/profile"}>
            <Image src={auth.image} alt={auth.image} width={50} height={50} />
            {auth.username}
          </Link>
        </>
      ) : (
        <>
          <Link href={"/auth/signin"}>Sign in</Link>
          <Link href={"/auth/signup"}>Sign up</Link>
        </>
      )}
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  gap: 1rem;
  > * {
    /* width: 5rem; */
    white-space: nowrap;
  }
  .profile {
    border: 2px solid;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    > img {
      height: 30px;
      width: 30px;
      /* border: 2px solid red; */
      /* width: 30px;
      height: 30px; */
      border-radius: 50%;
    }
  }
  button {
    background-color: initial;
    color: #ccc;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    /* word-break: break-all; */
    /* overflow-wrap: break-word; */
  }
`;
