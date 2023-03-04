import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButton = (props) => {
  const { data, status } = useSession();

  // console.log("");
  // console.log("\x1b[31mAuthButton\x1b[0m");
  // console.log("status : ", status);
  // console.log("data : ", data);
  // console.log("");

  return (
    <ul className="auth-button">
      {status === "authenticated" ? (
        <>
          <li>
            <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
              signout
            </button>
          </li>
          <li>
            <Link href={"/auth/admin"}>admin</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href={"/auth/signin"}>signin</Link>
          </li>
          <li>
            <Link href={"/auth/signup"}>signup</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthButton;
