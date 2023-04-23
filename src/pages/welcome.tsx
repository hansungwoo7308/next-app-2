import { useSession } from "next-auth/react";
import Link from "next/link";

const Welcome = () => {
  const { status } = useSession();
  return (
    <>
      <main>
        <section>
          {status === "authenticated" ? (
            <h1>Welcome</h1>
          ) : (
            <div>
              <h1>You are not logged in.</h1>
              <Link href={"/login"}>
                <button>Go to Login</button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Welcome;
