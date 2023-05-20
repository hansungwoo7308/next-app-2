import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
export default function Page() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: "/auth/admin",
      // redirect: false,
    });
  };

  return (
    <>
      <Head>
        <title>signin</title>
      </Head>
      <main className="signin">
        <section>
          <form>
            <h1>Signin</h1>
            <input
              name="email"
              type="text"
              placeholder="email"
              ref={emailRef}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              ref={passwordRef}
            />
            <button onClick={handleSignin}>signin</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/auth/signup");
              }}
            >
              Create new account
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
