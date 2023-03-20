import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/config/mongodb";

import connectDB from "../../../../lib/config/connectDB";
import User from "../../../../lib/core/model/User";

export const authOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        // authentication(matched) and authorization(permision and role)

        // log
        console.log("");
        console.log(
          "\x1b[32m/api/auth/[...nextauth]/providers/credentials/authorize\x1b[0m"
        );

        // get the user data
        const { email, password } = credentials;
        // console.log("credentials : ", credentials);

        // connect to database
        await connectDB();

        // find the user in database
        let foundUser;
        try {
          foundUser = await User.findOne({ email });
        } catch (error) {
          console.log("error : ", error);
        }
        console.log("\x1b[33mfoundUser : ", foundUser);

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

  callbacks: {
    async jwt({ token, user }) {
      console.log("");
      console.log("\x1b[32m/api/auth/callbacks/jwt");
      if (user) {
        token.role = user.role;
      }
      console.log("\x1b[32mtoken : ", token);
      console.log("");
      return token;
    },
    // session 정보를 client 에 전달한다.
    async session({ session, token }) {
      console.log("");
      console.log("\x1b[32m/api/auth/callbacks/session\x1b[0m");
      if (session.user) {
        session.user.role = token.role;
      }
      console.log("\x1b[32msession : %s", session);
      console.log("");
      return session;
    },
  },

  pages: {
    // custom pages
    signIn: "/auth/signin",
  },

  debug: process.env.NODE_ENV === "development",
  // adapter: MongoDBAdapter(clientPromise),

  session: {
    /* 세션 전략을 jwt로 설정 */
    strategy: "jwt",
    // jwt: true, // 토큰에 대한 상세 옵션을 설정할 수 있다.
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   signingKey: process.env.JWT_SIGNING_KEY,
    //   verificationOptions: {
    //     algorithms: ['HS256'],
    //   },
    // },
    // strategy: "database",
  },
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
