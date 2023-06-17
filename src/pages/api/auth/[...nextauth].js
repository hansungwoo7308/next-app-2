import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/server/config/mongodb";

import connectDB from "../../../../lib/server/config/connectDB";
import User from "../../../../lib/server/model/User";
export const authOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        console.log("\x1b[32m\n[api/auth/[...nextauth]]");
        console.log("providers : credentials");
        // get the user data
        const { email, password } = credentials;
        // connect to database
        await connectDB();
        // find the user in database
        let foundUser;
        try {
          foundUser = await User.findOne({ email });
        } catch (error) {
          console.log("error : ", error);
        }
        console.log("foundUser : ", foundUser);
        // set the return value
        if (foundUser) {
          // if (res.ok && user) {
          // Any object returned will be saved in `user` property of the JWT
          return foundUser;
          // return {
          //   abc: "something",
          // };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // async signIn({ user }) {
    //   // async signIn(context) {
    //   console.log("\x1b[33m");
    //   // console.log("context : ", context);
    //   console.log("user : ", user);
    //   console.log("");
    //   return true;
    // },
    async jwt({ token, user }) {
      // client jwt
      // console.log("\x1b[32m");
      // console.log("[api/auth/callbacks/jwt]");
      // console.log("user : ", user);
      // console.log("token : ", token);
      // if (account) {
      //   token.role = account.role;
      // }
      if (user) {
        token.authorizedUser = user;
      }
      // console.log("token : ", token);
      // console.log("");
      return token;
    },
    async session({ session, token }) {
      // server session
      // console.log("\x1b[32m\n[api/auth/callbacks/session]");
      // console.log("token : ", token);
      // if (session.user) {
      //   session.user.role = token.role;
      // }
      // session.user = { test: "test" };
      if (session.user) {
        session.user.name = token.authorizedUser.name;
        session.user.email = token.authorizedUser.email;
        session.user.role = token.authorizedUser.role;
      }
      // console.log("session : ", session);
      return session;
    },
  },
  pages: {
    // custom pages
    signIn: "/auth/signin",
    // signIn: "/login",
  },
  // debug: process.env.NODE_ENV === "development",
  // adapter: MongoDBAdapter(clientPromise),
  // session: {
  //   /* 세션 전략을 jwt로 설정 */
  //   strategy: "jwt",
  //   // jwt: true, // 토큰에 대한 상세 옵션을 설정할 수 있다.
  //   // jwt: {
  //   //   secret: process.env.JWT_SECRET,
  //   //   signingKey: process.env.JWT_SIGNING_KEY,
  //   //   verificationOptions: {
  //   //     algorithms: ['HS256'],
  //   //   },
  //   // },
  //   // strategy: "database",
  // },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET,

  //   // async encode(params) {
  //   //   console.log("encode params : ", params);
  //   //   // return jwt.sign(token, secret);
  //   // },
  //   // async decode(params) {
  //   //   console.log("decode params : ", params);
  //   //   // return jwt.verify(token, secret);
  //   // },
  // },
  /* jwt 사용을 위한 임의의 난수를 할당 */
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
