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
    const stringfiedCart: any = localStorage.getItem("cart");
    const cart: any = JSON.parse(stringfiedCart);
    if (!cart.length) return;
    // 리로드(리프레시)를 하게 되면,
    // 현재 클라이언트 스토어의 데이터를 서버로부터 최신 데이터를 받아온다.
    // 그러고나서 클라이언트의 스토어(웹스토어,리덕스스토어)를 업데이트해준다.
    // 스토어에 업데이트 시, 클라인언트의 수량정보를 추가해준다.
    const setCart = async () => {
      let newCart: any = [];
      for (const item of cart) {
        const response = await getData(`product/${item._id}`);
        const { product } = response.data;
        const { inStock, quantity } = item;
        if (inStock) newCart.push({ ...product, quantity });
      }
      // console.log("newCart : ", newCart);
      dispatch(updateCart(newCart));
    };
    setCart();
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
