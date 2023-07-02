import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { postData } from "lib/client/utils/fetchData";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
import logError from "lib/client/log/logError";
export default function Page() {
  const { order, auth }: any = useSelector((store) => store);
  const router = useRouter();
  const recentOder = order[order.length - 1];
  if (!order[0]) {
    return (
      <Main>
        <section>
          <div>
            <h1>No Order</h1>
          </div>
        </section>
      </Main>
    );
  }
  return (
    <Main>
      <section>
        <div>
          <div className="description">
            <h1>Order Page</h1>
            <h3>Total : ${recentOder.total}</h3>
          </div>
          <div className="payment">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: recentOder.total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions: any) => {
                // console.log("data : ", data);
                return actions.order.capture().then((details: any) => {
                  // console.log("details : ", details);
                  // alert(`Transaction completed by ${name}`);
                  // const name = details.payer.name.given_name;
                  postData("order", recentOder, auth.accessToken)
                    .then((response) => logResponse(response))
                    .catch((error) => logError(error));
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
      justify-content: center;
      gap: 3rem;
      .description {
      }
      .payment {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
