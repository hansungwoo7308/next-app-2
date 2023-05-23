import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
const Box = styled.div`
  display: flex;
  > button,
  div {
    min-width: 70px;
    /* outline: 2px solid red; */
    > a {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;
export default function AuthButton(props: any) {
  const { data, status } = useSession();
  // console.log("status : ", status);
  // console.log("data : ", data);
  return (
    <Box>
      {status === "authenticated" ? (
        <>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>
          <div>
            <Link href={"/auth/admin"}>Admin</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link href={"/auth/signin"}>Sign in</Link>
          </div>
          <div>
            <Link href={"/auth/signup"}>Sign up</Link>
          </div>
        </>
      )}
    </Box>
  );
}
