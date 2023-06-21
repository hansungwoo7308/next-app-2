import CartItem from "@/components/commerce/CartItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { updateCart } from "lib/client/store/cartSlice";
import { setCart, setTotal } from "lib/client/store/orderSlice";
import { getData } from "lib/client/utils/fetchData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  const { auth, cart, order }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    // set the tatal of order
    // 주문금액을 스토어에 저장한다.
    const total = cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    dispatch(setTotal(total));
  }, [cart]);
  useEffect(() => {
    // get the up-to-date data of products
    // 카트의 재고가 없을 수도 있기 때문에, 최신 데이터를 다시 받아온다.
    // 리로드(리프레시)를 하게 되면,
    // 현재 클라이언트 스토어의 데이터를 서버로부터 최신 데이터를 받아온다.
    // 그러고나서 클라이언트의 스토어(웹스토어,리덕스스토어)를 업데이트해준다.
    // 스토어에 업데이트 시, 클라인언트의 수량정보를 추가해준다.
    const stringfiedCart: any = localStorage.getItem("cart");
    const cart: any = JSON.parse(stringfiedCart);
    if (!cart.length) return;
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
  const handleOrder = (e: any) => {
    // 실제는 아래와 같지 않을까?
    // 주문하게되면,
    // 카트에 담아둔 주문(항목,개수)으로부터 서버의 제품재고를 주문갯수로부터 감소시켜준다.
    // 오더페이지에서 주소와 결제방식을 선택하고 주문을 진행한다.
    e.preventDefault();
    dispatch(setCart(cart));
    router.push("/commerce/order");
  };
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
              <div className="order">
                {/* <Link href={"/commerce/order"}>Order</Link> */}
                <button onClick={handleOrder}>Order</button>
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
      h3 {
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        /* border: 2px solid; */
      }
      .order {
        display: flex;
        justify-content: center;
        /* border: 2px solid blue; */
        a {
          width: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #333;
          padding: 1rem;
          margin-top: 3rem;
          :hover {
            background-color: #ddd;
            color: #111;
          }
        }
        button {
          width: 10rem;
          padding: 2rem;
        }
      }
    }
  }
`;
