import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
export default function index() {
  const store = useSelector((state) => state);
  const { order }: any = store;
  console.log();
  return (
    <Main>
      <section>
        <div>
          <h1>Order Page</h1>
          <h3>Total : ${order.total}</h3>
          <div className="paypal">
            <PayPalButtons
              createOrder={(data, actions) => {
                console.log("tatal : ", order.total);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: order.total,
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
          </div>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      .paypal {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
