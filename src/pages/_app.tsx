import App from "next/app";
// types
import type { AppContext, AppProps } from "next/app";
// providers
import { Provider } from "react-redux";
import store from "lib/store/store";
import { SessionProvider } from "next-auth/react";
// styles
import Layout from "../components/layout/Layout";
import * as StyleComponent from "../styles/_app.styled";
import { NextPage } from "next";

import { fetchUsers } from "lib/store/userSlice";
import { fetchPosts } from "lib/store/postsSlice";

// console.log("store : ", store.getState());
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

// set the interface for custom
interface MyAppProps extends AppProps {
  something?: string;
}

const MyApp = ({ Component, pageProps, something }: MyAppProps) => {
  // console.log("\x1b[33msomething : %s\x1b[0m", something);

  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <StyleComponent.GlobalStyle />
            <Component {...pageProps} someting />
          </Layout>
        </SessionProvider>
      </Provider>
    </>
  );
};

// set the custom props of application
MyApp.getInitialProps = async (AppContext: AppContext) => {
  const appProps = await App.getInitialProps(AppContext);
  // console.log("\x1b[33mcontext.AppTree : %s\x1b[0m", context.AppTree);
  // console.log("\x1b[33mcontext.Component : %s\x1b[0m", context.Component);
  // console.log("\x1b[33mcontext.router : %s\x1b[0m", context.router);
  // console.log("\x1b[33mcontext.ctx : %s\x1b[0m", context.ctx);
  return {
    ...appProps,
    something: "test...",
  };
};

export default MyApp;

{
  // protected routes 를 여기서 구현할 수 있다.
  /* <AuthProvider> // next-auth, AWS, firebase
  {
    // 정적 
    // 동적으로하려면 (데이터베이스 이용) 미들웨어에서 현재의 nextauth session 정보를 가지고 와서
    // 구현해야하지 않을까
    Component.requireAuth ? ( // protect 하고 싶은 페이지만 Admin.requireAuth : true
    <AuthGuard> // here is where put auth logic // loading indicator while querying
      <Component /> // page component
    </AuthGuard>
    ) : (
      <Component /> // page component
    )
  }
</AuthProvider> */
}
