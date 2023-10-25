// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers, setUsers } from "lib/client/store/usersSlice";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { addOrder, setOrders } from "lib/client/store/ordersSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import axios from "axios";
// store.dispatch(fetchUsers());
// store.dispatch(fetchPosts());

export default function Providers({ children, session, token }: any) {
  // console.log("session : ", session);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <GlobalState token={token}>{children}</GlobalState>
        {/* <PayPalScriptProvider
          options={{
            clientId:
              // "Ab2uPl_Wo2-UDJ569Byt3xFloItf-fgdla5iQwfryndLbQFASTbwSr23GUJXj7B9lyybjL44iKADN1ZH",
              // "AebB-qLz2QRa3l02i9y8SLFAZudUsX09K53hp8lMxfo1i29Ogv45n2Ldv4gCEH7-xok18myEaJtsc24f",
              // "ARL6BSMyqeQMRB31JuDJqvSeOryXUsFjLWyWOR8cG7oLi7peAw6LM3KDE37fUFEZawTeKyuESe5d4BbD",
              "AShEuT2KH5QzaB4DH66inHArChvuaM6k6LW7twtxB7bbCJvHnesxT1fPCq5nx5JwZ6QnD6kAAT5y5Qfv",
            currency: "USD",
          }}
        >
          <GlobalState token={token}>{children}</GlobalState>
        </PayPalScriptProvider> */}
      </SessionProvider>
    </Provider>
  );
}
export function GlobalState({ children, token }: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  /* Auth */
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  // const refreshAuth = async () => {
  //   try {
  //     dispatch(setLoading(true));
  //     const response = await getData("authentication/refresh");
  //     const { username, role, image, accessToken } = response.data;
  //     // logResponse(response);
  //     const credentials = { user: { username, image, role }, accessToken };
  //     dispatch(setCredentials(credentials));
  //     dispatch(setLoading(false));
  //   } catch (error) {
  //     logError(error);
  //     dispatch(setLoading(false));
  //   }
  // };
  // useEffect(() => {
  //   if (session.data?.user) return; // session 방식으로 구현했다면 리프레시를 패스한다.
  //   if (!auth.accessToken) refreshAuth();
  // }, [auth.accessToken]); // 엑세스 토큰이 없으면 리프레시 요청 (store)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshAuth();
  //   }, 1000 * 10);
  // }, []);
  useEffect(() => {
    if (session.status === "authenticated") {
      if (!session.data.user) return;
      const credentials = { user: session.data.user, accessToken: "next-auth" };
      dispatch(setCredentials(credentials));
    }
  }, [session.status]);

  /* Data */
  // const getOrder = async () => {
  //   const response = await getData("order", auth.accessToken);
  //   const { orders } = response.data;
  //   logResponse(response);
  //   dispatch(setOrders(orders));
  // };
  // const getUsers = async () => {
  //   // const response = await getData("user", auth.accessToken);
  //   const response = await axios({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v2/users",
  //     // client에서 server로 인증정보를 담아 요청을 할때는,
  //     // credentials를 설정해준다.
  //     // header에 담아 보내면, 안전하지 않은 요청이 된다. (보안문제발생가능)
  //     // headers: { Cookie: `next-auth.session-token=${token}` },
  //     withCredentials: true,
  //   });
  //   const { users } = response.data;
  //   console.log({ users });
  //   dispatch(setUsers(users));
  // };
  // useEffect(() => {
  //   // if (!auth.accessToken) return;
  //   return;
  //   if (!auth.user) return;
  //   try {
  //     auth.user.role === "user" && getOrder();
  //     auth.user.role === "admin" && getUsers();
  //   } catch (error: any) {
  //     console.log({ error });
  //     toast.error(error.message);
  //     // logError(error);
  //   }
  // }, [auth.accessToken]); // 로그인 시, 주문정보와 사용자정보를 가져온다.

  /* Cart */
  // const cart = useSelector((store: any) => store.cart);
  // useEffect(() => {
  //   const serializedCart: any = localStorage.getItem("cart");
  //   if (!serializedCart) return;
  //   const parseCart = JSON.parse(serializedCart);
  //   // console.log("parseCart : ", parseCart);
  //   dispatch(reloadCart(parseCart));
  //   // parseCart.map((v: any) => {
  //   //   dispatch(addToCart(v));
  //   // });
  // }, []); // 로드 시, 카트정보를 로컬스토리지에 캐싱한다. // if loaded, cache the cart data
  // useEffect(() => {
  //   if (!cart.length) return;
  //   const stringfiedCart = JSON.stringify(cart);
  //   localStorage.setItem("cart", stringfiedCart);
  // }, [cart]); // 카트정보 변경 시, 카트정보를 로컬스토리지에 캐싱한다. // if cart is changed, cache the cart data

  return <>{children}</>;
}
