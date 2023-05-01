import App from "next/app";
import type { AppContext, AppProps } from "next/app";

// state
// redux provider
import { Provider } from "react-redux";
import store from "lib/store/store";
import { fetchUsers } from "lib/store/usersSlice";
import { fetchPosts } from "lib/store/postsSlice";
// session provider
import { SessionProvider } from "next-auth/react";

// styles
import Layout from "../components/layout/Layout";
import * as StyleComponent from "../styles/_app.styled";
// import { NextPage } from "next";

// fetch the data
// store.dispatch(fetchUsers());
// store.dispatch(fetchPosts());

// set the interface
interface MyAppProps extends AppProps {
  auth?: Object;
}

const MyApp = ({ Component, pageProps, auth }: MyAppProps) => {
  // console.log("");
  // console.log("\x1b[32m_app");
  // console.log("");
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <StyleComponent.GlobalStyle />
            <Component {...pageProps} auth />
          </Layout>
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

// set the custom props of application
// MyApp.getInitialProps = wrapper.getInitialAppProps(
//   (store: any) => async (AppContext: AppContext) => {
//     console.log("store : ", store);
//     // console.log("");
//     // console.log("\x1b[32m_app initialize props");

//     // auth
//     const auth = { accessToken: "test..." };

//     // console.log("AppTree : ", AppContext.AppTree);
//     // console.log("Component : ", AppContext.Component);
//     // console.log("ctx.req : ", Object.getOwnPropertyNames(AppContext.ctx.req));

//     // const request: any = AppContext.ctx.req;
//     // const cookies = request?.cookies;
//     // console.log("cookies : ", cookies);

//     // console.log("ctx.req.rawHeaders : ", AppContext.ctx.req?.rawHeaders);
//     // console.log("ctx.res : ", Object.getOwnPropertyNames(AppContext.ctx.res));
//     // console.log("ctx.pathname : ", AppContext.ctx.pathname);
//     // console.log("ctx.query : ", AppContext.ctx.query);
//     // console.log("router : ", AppContext.router);

//     const appProps = await App.getInitialProps(AppContext);
//     // console.log("appProps.pageProps : ", appProps.pageProps);
//     // console.log("");

//     return {
//       ...appProps,
//       auth,
//     };
//   }
// );

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
