import { Provider, useDispatch, useSelector } from "react-redux";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers, setUsers } from "lib/client/store/usersSlice";
import { useEffect, useState } from "react";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import { reloadCart } from "lib/client/store/cartSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { useRouter } from "next/router";
import { setLoading, setNotify } from "lib/client/store/notifySlice";
import { addOrder, setOrders } from "lib/client/store/ordersSlice";
// store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
export default function Providers({ children, session }: any) {
  // console.log("session : ", session);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <PayPalScriptProvider
          options={{
            clientId:
              // "Ab2uPl_Wo2-UDJ569Byt3xFloItf-fgdla5iQwfryndLbQFASTbwSr23GUJXj7B9lyybjL44iKADN1ZH",
              // "AebB-qLz2QRa3l02i9y8SLFAZudUsX09K53hp8lMxfo1i29Ogv45n2Ldv4gCEH7-xok18myEaJtsc24f",
              // "ARL6BSMyqeQMRB31JuDJqvSeOryXUsFjLWyWOR8cG7oLi7peAw6LM3KDE37fUFEZawTeKyuESe5d4BbD",
              "AShEuT2KH5QzaB4DH66inHArChvuaM6k6LW7twtxB7bbCJvHnesxT1fPCq5nx5JwZ6QnD6kAAT5y5Qfv",
            currency: "USD",
          }}
        >
          <GlobalState>{children}</GlobalState>
        </PayPalScriptProvider>
      </SessionProvider>
    </Provider>
  );
}
export function GlobalState({ children }: any) {
  // console.log("children : ", children);
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();
  const store = useSelector((store) => store);
  const { auth, cart }: any = store;
  const refreshAuth = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getData("authentication/refresh");
      const { username, role, image, accessToken } = response.data;
      logResponse(response);
      dispatch(
        setCredentials({ status: true, mode: "general", username, role, image, accessToken })
      );
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
      // router.push("/");
    }
  };
  const checkAuth = async () => {
    console.log("asdkfhsl");
    try {
      dispatch(setLoading(true));
      const response = await getData("authentication/check", auth.accessToken);
      const { username, role, image, accessToken } = response.data.verified;
      logResponse(response);
      dispatch(
        setCredentials({ status: true, mode: "general", username, role, image, accessToken })
      );
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      refreshAuth();
      dispatch(setLoading(false));
    }
  };
  /* Auth */
  // if router.pathname exchanged, check the auth
  // useEffect(() => {
  //   const handleRouteChange = (url: any) => {
  //     // console.log("url : ", url);
  //     if (!auth.accessToken) return;
  //     checkAuth();
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.pathname]);
  useEffect(() => {
    const { accessToken } = auth;
    if (!accessToken) {
      refreshAuth();
    }
  }, []); // if first loaded, 엑세스 토큰이 없으면 리프레시 요청 (store)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshAuth();
  //   }, 1000 * 10);
  // }, []);
  useEffect(() => {
    // if refreshed by nextauth session status,
    // load the auth status in redux store
    if (session.status === "authenticated") {
      // console.log(session);
      dispatch(
        setCredentials({
          mode: "nextauth",
          status: true,
          username: "nextauth",
          accessToken: "1234",
        })
      );
    }
  }, []); // 로드 시 : next-auth.session (store)
  /* Cart */
  useEffect(() => {
    // if refreshed and cart exist, load the items in store
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parseCart = JSON.parse(serializedCart);
    // console.log("parseCart : ", parseCart);
    dispatch(reloadCart(parseCart));
    //
    // sdhfslfhlishf
    // parseCart.map((v: any) => {
    //   dispatch(addToCart(v));
    // });
  }, []); // if first loaded, 캐싱 (store)
  useEffect(() => {
    if (!cart.length) return;
    const stringfiedCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringfiedCart);
  }, [cart]); // if cart is changed, load the cart // if cart changed, : 캐싱 (storage)
  useEffect(() => {
    if (!auth.accessToken) return;
    const getOrder = async () => {
      const response = await getData("order", auth.accessToken);
      const { orders } = response.data;
      logResponse(response);
      dispatch(setOrders(orders));
    };
    const getUsers = async () => {
      const response = await getData("user", auth.accessToken);
      const { foundUsers } = response.data;
      logResponse(response);
      dispatch(setUsers(foundUsers));
    };
    try {
      auth.role === "user" && getOrder();
      // auth.role === "admin" && getUsers();
    } catch (error: any) {
      dispatch(setNotify({ status: "error", message: error.message, visible: true }));
      logError(error);
    }
  }, [auth.accessToken]);
  return <>{children}</>;
}
