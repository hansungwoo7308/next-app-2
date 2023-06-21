import CartItem from "@/components/commerce/CartItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { addToCart, updateCart } from "lib/client/store/cartSlice";
import { setOrderTotal } from "lib/client/store/orderSlice";
import { getData } from "lib/client/utils/fetchData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  const { auth, cart, order }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    // set the tatal state of products
    const total = cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    dispatch(setOrderTotal(total));
  }, [cart]);
  useEffect(() => {
    // get the current database data of products
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
  // useEffect(() => {
  //   // paypal
  //   //   .Buttons({
  //   //     // Order is created on the server and the order id is returned
  //   //     createOrder() {
  //   //       return fetch("/my-server/create-paypal-order", {
  //   //         method: "POST",
  //   //         headers: {
  //   //           "Content-Type": "application/json",
  //   //         },
  //   //         // use the "body" param to optionally pass additional order information
  //   //         // like product skus and quantities
  //   //         body: JSON.stringify({
  //   //           cart: [
  //   //             {
  //   //               sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
  //   //               quantity: "YOUR_PRODUCT_QUANTITY",
  //   //             },
  //   //           ],
  //   //         }),
  //   //       })
  //   //         .then((response) => response.json())
  //   //         .then((order) => order.id);
  //   //     },
  //   //     // Finalize the transaction on the server after payer approval
  //   //     onApprove(data: any) {
  //   //       return fetch("/my-server/capture-paypal-order", {
  //   //         method: "POST",
  //   //         headers: {
  //   //           "Content-Type": "application/json",
  //   //         },
  //   //         body: JSON.stringify({
  //   //           orderID: data.orderID,
  //   //         }),
  //   //       })
  //   //         .then((response) => response.json())
  //   //         .then((orderData) => {
  //   //           // Successful capture! For dev/demo purposes:
  //   //           console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
  //   //           const transaction = orderData.purchase_units[0].payments.captures[0];
  //   //           alert(
  //   //             `Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`
  //   //           );
  //   //           // When ready to go live, remove the alert and show a success message within this page. For example:
  //   //           // const element = document.getElementById('paypal-button-container');
  //   //           // element.innerHTML = '<h3>Thank you for your payment!</h3>';
  //   //           // Or go to another URL:  window.location.href = 'thank_you.html';
  //   //         });
  //   //     },
  //   //   })
  //   //   .render(paypalRef);
  // }, []);
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
              <h3>Total : ${order.total}</h3>
              {/* <div>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    console.log("tatal : ", total);
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: total,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                      // console.log("data : ", data);
                      // console.log("details : ", details);
                      const name = details.payer.name.given_name;
                      alert(`Transaction completed by ${name}`);
                    });
                  }}
                />
              </div> */}
              <div>
                <Link href={"/commerce/order"}>Order</Link>
              </div>
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
        border: 2px solid;
      }
      > div {
        display: flex;
        justify-content: center;
        padding-top: 3rem;
        > button {
          width: 40%;
          height: 3rem;
        }
      }
    }
  }
`;
