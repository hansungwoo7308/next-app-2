import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";
import axios from "axios";

let renderCount = 0;

const Signup = () => {
  const router = useRouter();
  const { status } = useSession();
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
      const result = await axios
        .post("/api/auth/signup", data)
        .then((res) => res.data);
      console.log("result : ", result);
      if (result.success === true) router.push("/auth/signin");
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    setFocus("name");
  }, []);

  // useEffect(() => {
  //   setFocus("name", { shouldSelect: true });
  // }, [setFocus]);

  renderCount++;

  // logs
  // console.log("");
  // console.log("\x1b[32m/auth/signup\x1b[0m");
  // console.log("");

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
