import { useDispatch, useSelector } from "react-redux";
import { logOut, setCredentials } from "lib/client/store/authSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
import { getData } from "lib/client/utils/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { setModal } from "lib/client/store/modalSlice";

export default function AuthButton(props: any) {
  // external
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  // internal
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const handleSignout = async (e: any) => {
    e.preventDefault();
    signOut({ callbackUrl: "/auth/signin" });
    // try {
    //   if (session.status === "authenticated") {
    //     return;
    //   }
    //   // const response = await getData("v2/auth/signout");
    //   // logResponse(response);
    //   // dispatch(logOut());
    //   // router.push("/");
    // } catch (error) {
    //   logError(error);
    // }
  };

  useEffect(() => console.log({ "session.data": session.data }), []);

  if (session.data?.user) {
    return (
      <Box dropdown={dropdown}>
        <div className="profile">
          <div className="image" onClick={() => setDropdown(!dropdown)}>
            <Image
              src={
                session.data.user.image ||
                "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
              }
              alt={"alt"}
              width={100}
              height={100}
            />
            {auth.user?.username || auth.user?.name}
          </div>
          <div className="dropdown">
            <Link href={"/auth/profile"}>Profile</Link>
            {auth.user?.role === "admin" && (
              <>
                <Link href={"/users"}>Users</Link>
                <Link href={"/commerce/product"}>Products</Link>
                {/* <Link href={"/commerce/product/create"}>Create a product</Link> */}
                <a onClick={() => dispatch(setModal({ active: true, type: "CREATE" }))}>
                  Create a product
                </a>
              </>
            )}
            <button onClick={handleSignout}>Sign out</button>
          </div>
        </div>
      </Box>
    );
  }
  return (
    <Box dropdown={dropdown}>
      <div className="sign">
        <Link href={"/auth/signup"}>Sign up</Link>
        <Link href={"/auth/signin"}>Sign in</Link>
      </div>
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
  .sign {
    display: flex;
    gap: 1rem;
  }

  .profile {
    width: 7rem;
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
      background-color: #111;
      > * {
        padding: 1rem 2rem;
        /* text-align: center; */
      }
      button {
        width: 100%;
        border: 2px solid red;
        padding: 1rem 0;
      }
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
