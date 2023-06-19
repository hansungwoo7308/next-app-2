import CartItem from "@/components/commerce/CartItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { addToCart, updateCart } from "lib/client/store/cartSlice";
import { getData } from "lib/client/utils/fetchData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  // const cart = useSelector(selectCart);
  const store = useSelector((state) => state);
  const { auth, cart }: any = store;
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const total = cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    setTotal(total);
  }, [cart]);
  useEffect(() => {
    // localStorage의 캐시된 카트 데이터로,
    // 데이터베이스에서 실시간 데이터를 받아오고,
    // 리덕스스토어에 데이터를 업데이트한다.
    const stringfiedCart: any = localStorage.getItem("cart");
    const cart: any = JSON.parse(stringfiedCart);
    if (!cart) return;
    const test = async () => {
      let newCart: any = [];
      for (const item of cart) {
        const response = await getData(`product/${item._id}`);
        const { product } = response.data;
        const { quantity } = item;
        newCart.push({ ...product, quantity });
      }
      // console.log("newCart : ", newCart);
      dispatch(updateCart(newCart));
    };
    test();
  }, []);
  return (
    <Main>
      <section>
        <div>
          {!cart.length && <h1>No items</h1>}
          {cart.length && (
            <>
              <h1>Shopping Cart</h1>
              <ul>
                {cart.map((item: any) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </ul>
              <h3>Total : ${total}</h3>
            </>
          )}
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
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
      }
    }
  }
`;
