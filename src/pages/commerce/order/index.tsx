import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "lib/client/utils/fetchData";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
import logError from "lib/client/log/logError";
import { addOrder } from "lib/client/store/ordersSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { clearCart } from "lib/client/store/cartSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
export default function Page() {
  const { auth, cart }: any = useSelector((store) => store);
  const [order, setOrder]: any = useState({
    address: "",
    mobile: "",
    cart: cart,
    total: cart.reduce((a: any, v: any) => a + v.price * v.quantity, 0),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log("order : ", order);
  return (
    <Main>
      <section>
        <div>
          <div className="order">
            <form action="">
              <div>
                <h3>Shipping</h3>
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="Address"
                  onChange={(e) => setOrder({ ...order, address: e.target.value })}
                />
                <input
                  name="mobile"
                  type="text"
                  required
                  placeholder="Mobile"
                  onChange={(e) => setOrder({ ...order, mobile: e.target.value })}
                />
              </div>
            </form>
          </div>
          <div className="payment">
            <h1>Payment</h1>
            <h3>Total : ${order.total}</h3>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: order.total } }],
                });
              }}
              onApprove={(data, actions: any) => {
                // console.log("onApprove data : ", data);
                return actions.order.capture().then((details: any) => {
                  // console.log("onApprove action.order.capture:resolved.details : ", details);
                  // alert(`Transaction completed by ${name}`);
                  // const name = details.payer.name.given_name;
                  // const paylaod = { ...cart, details };
                  const createOrder = async () => {
                    try {
                      const response = await postData("order", order, auth.accessToken);
                      // const { order } = response.data;
                      logResponse(response);
                      dispatch(clearCart());
                      dispatch(
                        setNotify({
                          status: "success",
                          message: "The Order was created.",
                          visible: "true",
                        })
                      );
                      router.push("/auth/profile");
                    } catch (error) {
                      logError(error);
                      dispatch(
                        setNotify({
                          status: "error",
                          message: "The Order was failed.",
                          visible: "true",
                        })
                      );
                      router.push("/commerce/cart");
                    }
                  };
                  createOrder();
                });
              }}
            />
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
