import { Provider, useDispatch, useSelector } from "react-redux";
import store from "lib/client/store/store";
import { fetchPosts } from "lib/client/store/postsSlice";
import { fetchUsers } from "lib/client/store/usersSlice";
import { useEffect } from "react";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import { addToCart, updateCart } from "lib/client/store/cartSlice";
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
export default function Providers({ test123, children, session }: any) {
  // console.log("session : ", session);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <GlobalState>{children}</GlobalState>
      </SessionProvider>
    </Provider>
  );
}
export function GlobalState({ children }: any) {
  // console.log("children : ", children);
  const dispatch = useDispatch();
  const session = useSession();
  const store = useSelector((state) => state);
  const { cart }: any = store;
  useEffect(() => {
    // if refreshed and cart exist, load the items in redux store
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parseCart = JSON.parse(serializedCart);
    // dispatch(updateCart(parseCart));
    parseCart.map((v: any) => {
      dispatch(addToCart(v));
    });
  }, []);
  useEffect(() => {
    // if cart is changed, load the cart
    if (!cart.length) return;
    const stringfiedCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringfiedCart);
  }, [cart]);
  useEffect(() => {
    // if refreshed and accessToken exist,
    // load the credentials in redux store
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      getData("authentication/check", accessToken)
        .then((response) => {
          const { username, accessToken } = response.data;
          dispatch(setCredentials({ username, accessToken }));
        })
        .catch((error) => {
          localStorage.removeItem("accessToken");
        });
    }
  }, []);
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
  }, []);
  return <>{children}</>;
}
