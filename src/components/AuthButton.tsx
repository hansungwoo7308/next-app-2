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
import { useState } from "react";
export default function AuthButton(props: any) {
  const auth = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
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
    <Box dropdown={dropdown}>
      {auth.status ? (
        <>
          {auth.mode === "general" && <button onClick={logoutAuth}>Sign out1</button>}
          {auth.mode === "nextauth" && (
            <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out2</button>
          )}
          <div className="profile">
            <div className="image" onClick={() => setDropdown(!dropdown)}>
              <Image src={auth.image} alt={auth.image} width={50} height={50} />
              {auth.username}
            </div>
            {/* <Link href={"/auth/profile"}>
            </Link> */}
            <div className="dropdown">
              <Link href={"/auth/profile"}>Profile</Link>
              {auth.role === "user" && (
                <>
                  <Link href={"/users"}>Users</Link>
                  <Link href={"/users"}>Users</Link>
                  <Link href={"/users"}>Users</Link>
                  {/* <Link href={"/products"}>Users</Link>
                  <Link href={"/users"}>Users</Link> */}
                </>
              )}
            </div>
          </div>
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
type Props = {
  dropdown: boolean;
};
const Box = styled.div<Props>`
  display: flex;
  gap: 1rem;
  > * {
    /* width: 5rem; */
    white-space: nowrap;
  }
  .profile {
    border: 2px solid;
    width: 7rem;

    a {
      padding: 1rem 2rem;
      background-color: #333;
    }
    .image {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 0 1rem;
      cursor: pointer;
      color: #ccc;
      :hover {
        color: #fff;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .dropdown {
      display: ${({ dropdown }: any) => (dropdown ? "block" : "none")};
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
