import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Head from "next/head";
// import connectDB from "../../../lib/config/connectDB";
// import * as S from "../../styles/pages/register.styled";

let renderCount = 0;

export async function getServerSideProps(context) {
  try {
    // mongoDB();
    // console.log(`\x1b[33mConnected to bananaDB\x1b[0m`);
    return {
      props: {
        isConnected: true,
      },
    };
  } catch (error) {
    // console.error(`\x1b[31merror : \x1b[0m`, error);
    return {
      props: {
        isConnected: false,
      },
    };
  }
  //   await connectDB();
  //   const session = await getSession(context);
  // const session = await getServerSession(context.req, context.res, authOptions);

  // console.log("");
  // console.log("\x1b[31mAdmin\x1b[0m");
  // // console.log("test : ", test);
  // // // console.log("test2 : ", test2);
  // console.log("");

  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/auth/signin",
  //         permanent: false,
  //       },
  //     };
  //   }

  //   return {
  //     props: {
  //       //   session,
  //     },
  //   };
}

const Signup = ({ isConnected }) => {
  const router = useRouter();
  const { status } = useSession();
  //   const nameRef = useRef();
  //   const emailRef = useRef();
  //   const passwordRef = useRef();
  //   const passwordConfirmRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();

  const password = useRef();
  password.current = watch("password");
  // passwordRef.current = watch("name");

  const handleSignup = async (data) => {
    try {
      const result = await axios.post("/api/auth/signup", data);
      console.log("result : ", result.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    setFocus("name");
  }, []);

  useEffect(() => {
    setFocus("name", { shouldSelect: true });
  }, [setFocus]);

  renderCount++;

  // logs
  console.log("");
  console.log("\x1b[32m/auth/signup\x1b[0m");
  //   console.log("error : ", errors);
  //   console.log("watch : ", watch());
  //   console.log("isConnected : ", isConnected);
  console.log("");

  if (status === "authenticated") router.push("/");
  if (status === "loading")
    return (
      <>
        <Head>
          <title>Sign Up</title>
        </Head>
        <main>
          <section>
            <h1>Loading...</h1>
          </section>
        </main>
      </>
    );
  if (status === "unauthenticated")
    return (
      <>
        <Head>
          <title>Sign Up</title>
        </Head>
        <main className="signup">
          <section>
            <div
              style={{
                position: "absolute",
                top: "70px",
                right: "20px",
                fontSize: "18px",
                fontWeight: "800",
              }}
            >
              <span>renderCount : </span>
              {renderCount}
            </div>
            <form onSubmit={handleSubmit(handleSignup)}>
              <div>
                <input
                  {...register("name", {
                    // required: true,
                    required: "This is required",
                    maxLength: 8,
                  })}
                  className="input"
                  type="text"
                  placeholder="Name"
                />
                {errors.name && errors.name.type === "required" && (
                  <small>This field is required.</small>
                )}
                {errors.name && errors.name.type === "maxLength" && (
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
                {errors.passwordConfirm &&
                  errors.passwordConfirm.type === "required" && (
                    <small>This field is required.</small>
                  )}
                {errors.passwordConfirm &&
                  errors.passwordConfirm.type === "validate" && (
                    <small>The password is not matched.</small>
                  )}
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </section>
        </main>
      </>
    );
};

export default Signup;
