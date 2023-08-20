import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { postData } from "lib/client/utils/fetchData";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { addOrder } from "lib/client/store/ordersSlice";
import { clearCart } from "lib/client/store/cartSlice";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Paypal from "@/components/commerce/Paypal";
import { setLoading } from "lib/client/store/loadingSlice";
export default function Page() {
  const { auth, cart }: any = useSelector((store) => store);
  const [test, setTest] = useState(false);
  const [payload, setPayload]: any = useState({
    address: "",
    mobile: "",
    cart: cart,
    total: cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePayment = async () => {
    try {
      dispatch(setLoading(true));
      const response = await postData("order", payload, auth.accessToken);
      const { order } = response.data;
      logResponse(response);
      dispatch(addOrder(order));
      dispatch(clearCart());
      dispatch(setLoading(false));
      router.push(`/commerce/order/${order._id}`);
    } catch (error) {
      logError(error);
      dispatch(setLoading(false));
    }
  };
  return (
    <Main>
      <section>
        <div>
          {!test && (
            <div className="order">
              <form action="">
                <div>
                  <h3>Shipping</h3>
                  <input
                    name="address"
                    type="text"
                    required
                    placeholder="Address"
                    onChange={(e: any) => setPayload({ ...payload, address: e.target.value })}
                  />
                  <input
                    name="mobile"
                    type="text"
                    required
                    placeholder="Mobile"
                    onChange={(e: any) => setPayload({ ...payload, mobile: e.target.value })}
                  />
                </div>
              </form>
            </div>
          )}
          <div className="payment">
            <h1>Payment</h1>
            <h3>Total : ${payload.total}</h3>
            <button onClick={handlePayment}>Pay for Order</button>
            {/* {test ? (
              <>
                <Paypal order={order} />
              </>
            ) : (
              <>
                <button onClick={() => setTest(true)}>Pay</button>
              </>
            )} */}
          </div>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      display: flex;
      > * {
        flex: 1;
        border: 2px solid;
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
            /* border: 2px solid; */
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
      .payment {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;
