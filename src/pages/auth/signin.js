import Head from "next/head";
import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Signin = () => {
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
            <button>
              <Link href={"/auth/signup"}>Create new account</Link>
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Signin;
