import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectDB from "../../../../lib/config/connectDB";
import clientPromise from "../../../../lib/config/mongodb";
import User from "../../../../lib/core/model/User";

export const authOptions = {
  providers: [
    Credentials({
      // id: "credentials",
      name: "Credentials",
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        // log
        console.log("");
        console.log(
          "\x1b[32m/api/auth/[...nextauth]/providers/credentials/authorize\x1b[0m"
        );

        // get the user data
        const { email, password } = credentials;
        console.log("credentials : ", credentials);

        // connect to database
        await connectDB();

        // find the user in database
        const foundUser = await User.findOne({ email }).catch((error) =>
          console.error(error)
        );
        console.log("\x1b[33mfoundUser : ", foundUser);

        // let foundUser;
        // try {
        //   // foundUser = await db.collection("users").findOne({ email });
        //   // foundUser = await User.findOne({ email });
        //   // console.log("foundUser : ", foundUser);
        //   // foundUser = await bananaDB
        //   //   .db("bananaDB")
        //   //   .collection("users")
        //   //   .findOne({ email });
        //   console.log("\x1b[33mfoundUser : ", foundUser);
        // } catch (error) {
        //   console.error(`\x1b[31merror : \x1b[0m`, error);
        // }

        // set the return value
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

  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Oauth // Persist the OAuth access_token to the token right after signin
  //     // if (params.account) {
  //     //   params.token.accessToken = params.account.access_token;
  //     // }

  //     // console.log("");
  //     // console.log("\x1b[32m/api/auth/callbacks/jwt\x1b[0m");
  //     // console.log("token : ", token);
  //     // console.log("user : ", user);
  //     if (user) {
  //       token.role = user.role;
  //     }
  //     // console.log("token : ", token);
  //     // console.log("");

  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log("");
  //     console.log("\x1b[32m/api/auth/callbacks/session\x1b[0m");
  //     // console.log("token : ", token);
  //     // assign the roles
  //     if (session.user) {
  //       session.user.role = token.role;
  //     }
  //     console.log("session : ", session);
  //     console.log("");

  //     return session;
  //   },
  // },

  // custom pages
  pages: {
    signIn: "/auth/signin",
  },

  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    // jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    // async encode(params) {
    //   console.log("encode params : ", params);
    //   // return jwt.sign(token, secret);
    // },
    // async decode(params) {
    //   console.log("decode params : ", params);
    //   // return jwt.verify(token, secret);
    // },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
