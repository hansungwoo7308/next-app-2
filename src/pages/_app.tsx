import App from "next/app";
import type { AppContext, AppProps } from "next/app";
// redux
import { Provider } from "react-redux";
import store from "lib/client/store/store";
import { fetchUsers } from "lib/client/store/usersSlice";
import { fetchPosts } from "lib/client/store/postsSlice";
// session
import { SessionProvider } from "next-auth/react";
// styles
import Layout from "../components/layout/Layout";
import * as StyleComponent from "../styles/_app.styled";
import SessionLoader from "@/components/SessionLoader";
import axios from "axios";
import { useEffect } from "react";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
var cookie = require("cookie");
// import { NextPage } from "next";
// fetch the data
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
// set the interface
interface MyAppProps extends AppProps {
  auth?: Object;
}
const MyApp = ({ Component, pageProps, auth }: MyAppProps) => {
  // console.log("\x1b[32m\n[_app]");
  const setAuth = (accessTokenPassed?: any) => {
    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
    const accessToken = accessTokenPassed || accessTokenFromLocalStorage;
    // console.log("accessTokenFromLocalStorage : ", accessTokenFromLocalStorage);
    // console.log("accessToken : ", accessToken);
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // console.log("refreshAuth timeout...(60 seconds)");
    // setTimeout(() => {
    //   refreshAuth();
    // }, 1000 * 60);
  };
  const refreshAuth = async () => {
    try {
      const response = await axios.post("/api/authentication/refresh");
      logResponse(response);
      setAuth(response.data.accessToken);
    } catch (error) {
      logError(error);
    }
  };
  useEffect(() => {
    // console.log("\x1b[31m\nClient Effect");
    // refreshAuth();
    setAuth();
  }, []);
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <SessionLoader>
            <Layout>
              <StyleComponent.GlobalStyle />
              <Component {...pageProps} auth />
            </Layout>
          </SessionLoader>
        </SessionProvider>
      </Provider>
    </>
  );
};
// MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (props) => {
//   const { Component, ctx } = props;
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   //Anything returned here can be accessed by the client
//   return { pageProps: pageProps, store: ctx.store };
// });
MyApp.getInitialProps = async (AppContext: AppContext) => {
  const appProps = await App.getInitialProps(AppContext);
  // console.log("\x1b[32m\n[_app]");
  // const auth = { accessToken: "test..." };
  // const serializedCooke = AppContext.ctx.req?.headers.cookie;
  // const parsedCookie = cookie.parse(serializedCooke || '');
  // console.log("refreshToken : ", parsedCookie.refreshToken);
  // console.log("");

  // console.log("AppTree : ", AppContext.AppTree);
  // console.log("Component : ", AppContext.Component);
  // console.log("ctx.req : ", Object.getOwnPropertyNames(AppContext.ctx.req));
  // console.log("ctx.pathname : ", AppContext.ctx.pathname);
  // console.log("ctx.query : ", AppContext.ctx.query);
  // console.log("router : ", AppContext.router);
  // const { authorization }: any = AppContext.ctx.req?.headers;
  // console.log("authorization : ", authorization);
  // axios.defaults.headers.Authorization = `Bearer test`;
  return {
    ...appProps,
    // auth,
  };
};
export default MyApp;
