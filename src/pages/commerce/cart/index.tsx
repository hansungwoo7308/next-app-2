import CartItem from "@/components/commerce/CartItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { updateCart } from "lib/client/store/cartSlice";
import { addOrder } from "lib/client/store/orderSlice";
import { getData } from "lib/client/utils/fetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  const { cart }: any = useSelector((store) => store);
  const [total, setToal]: any = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  // set the tatal
  useEffect(() => {
    // 주문금액을 스토어에 저장한다.
    const total = cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    setToal(total);
  }, [cart]);
  // get the up-to-date cart
  useEffect(() => {
    // 카트의 재고가 없을 수도 있기 때문에, 최신 데이터를 다시 받아온다.
    // 리로드(리프레시)를 하게 되면,
    // 현재 클라이언트 스토어의 데이터를 서버로부터 최신 데이터를 받아온다.
    // 그러고나서 클라이언트의 스토어(웹스토어,리덕스스토어)를 업데이트해준다.
    // 스토어에 업데이트 시, 클라인언트의 수량정보를 추가해준다.
    const stringfiedCart: any = localStorage.getItem("cart");
    if (!stringfiedCart) return;
    const cart: any = JSON.parse(stringfiedCart);
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
  const handleOrder = (data: any) => {
    const { address, mobile } = data;
    const payload = {
      address,
      mobile,
      cart,
      total,
    };
    dispatch(addOrder(payload));
    router.push("/commerce/order");
  };
  return (
    <Main>
      <section>
        <div className="cart">
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
        <div className="order">
          <form action="">
            <div>
              <h3>Shipping</h3>
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Address"
              />
              <input {...register("mobile", { required: true })} type="text" placeholder="Mobile" />
            </div>
            <button onClick={handleSubmit(handleOrder)}>Pay to Order</button>
          </form>
        </div>
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
    .order {
      form {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        div {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 2px solid;
          padding: 1rem;
          input {
            width: 20rem;
          }
        }
        button {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }
    }
  }
`;
