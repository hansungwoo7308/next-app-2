import CartItem from "@/components/commerce/CartItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { reloadCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { addOrder } from "lib/client/store/orderSlice";
import { getData } from "lib/client/utils/fetchData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function Page() {
  const { cart, auth }: any = useSelector((store) => store);
  const [total, setToal]: any = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // 주문금액을 스토어에 저장한다.
    const total = cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    setToal(total);
  }, [cart]); // set the tatal
  useEffect(() => {
    // Up-To-Date Product Data (inStock, ...)
    // const stringfiedCart: any = localStorage.getItem("cart");
    // if (!stringfiedCart) return;
    // const cart: any = JSON.parse(stringfiedCart);
    const setCart = async () => {
      let newCart: any = [];
      for (const item of cart) {
        const response = await getData(`product/${item._id}`);
        const { product } = response.data;
        const { inStock, quantity } = item;
        if (inStock) newCart.push({ ...product, quantity });
      }
      dispatch(reloadCart(newCart));
    };
    setCart();
  }, []); // get the up-to-date cart
  const handleOrder = (e: any) => {
    e.preventDefault();
    if (!auth.accessToken) {
      dispatch(setNotify({ status: "error", message: "You have to log in.", visible: true }));
      return router.push("/auth/signin");
    }
    // const { address, mobile } = data;
    // const payload = {
    //   address,
    //   mobile,
    //   cart,
    //   total,
    // };
    // dispatch(addOrder(payload));
    router.push("/commerce/order");
  };

  return (
    <Main>
      <section>
        <div className="cart">
          {cart.length ? (
            <>
              <h1>Shopping Cart</h1>
              <ul>
                {cart.map((item: any) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </ul>
              <h3>Total : ${cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0)}</h3>
            </>
          ) : (
            <h1>No items</h1>
          )}
        </div>
        <button onClick={handleOrder}>Order</button>
      </section>
    </Main>
  );
}

const Main = styled(PublicMain)`
  > section {
    flex-direction: column;
    justify-content: flex-start;
    gap: 3rem;
    .cart {
      ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      > h3 {
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        border: 2px solid;
      }
    }
  }
`;
