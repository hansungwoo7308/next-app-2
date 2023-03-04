import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
// import { userService } from "../../../services/user.service";

export const authOptions = {
  // jwt: {
  //   async encode(params) {
  //     console.log("encode params : ", params);
  //     // return jwt.sign(token, secret);
  //   },
  //   async decode(params) {
  //     console.log("decode params : ", params);
  //     // return jwt.verify(token, secret);
  //   },
  // },

  // session: {
  //   // strategy: "jwt",
  //   jwt: true,
  // },

  providers: [
    Credentials({
      name: "Credentials",
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        console.log("");
        console.log(
          "\x1b[32m/api/auth/[...nextauth]/providers/credentials/authorize\x1b[0m"
        );
        console.log("credentials : ", credentials);

        // verification
        const foundUser = await axios
          .post(
            "http://localhost:3000/api/auth/signin",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => response.data)
          .catch((error) => console.log("\nerror : ", error));
        console.log("");
        console.log("foundUser : ", foundUser);
        // const foundUser = verification.data;
        // const { email, password } = credentials;
        // const user = { id: "1", email: email, password: password };
        // console.log("user : ", user);
        console.log("");

        if (foundUser) {
          // if (res.ok && user) {
          // Any object returned will be saved in `user` property of the JWT
          return foundUser;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Oauth // Persist the OAuth access_token to the token right after signin
      // if (params.account) {
      //   params.token.accessToken = params.account.access_token;
      // }

      // console.log("");
      // console.log("\x1b[32m/api/auth/callbacks/jwt\x1b[0m");
      // console.log("token : ", token);
      // console.log("user : ", user);
      if (user) {
        token.role = user.role;
      }
      // console.log("token : ", token);
      // console.log("");

      return token;
    },
    async session({ session, token }) {
      console.log("");
      console.log("\x1b[32m/api/auth/callbacks/session\x1b[0m");
      // console.log("token : ", token);
      // assign the roles
      if (session.user) {
        session.user.role = token.role;
      }
      console.log("session : ", session);
      console.log("");

      return session;
    },
  },

  // custom pages
  pages: {
    signIn: "/auth/signin",
  },

  // secret: process.env.NEXTAUTH_SECRET,
  // secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
