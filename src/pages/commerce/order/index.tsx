import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { postData } from "lib/client/utils/fetchData";
import logResponse from "lib/client/log/logResponse";
import { useRouter } from "next/router";
export default function Page() {
  const { order, auth }: any = useSelector((store) => store);
  const router = useRouter();
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
            <h3>Total : ${order[0].total}</h3>
          </div>
          <div className="payment">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: order[0].total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions: any) => {
                return actions.order.capture().then((details: any) => {
                  // console.log("data : ", data);
                  // alert(`Transaction completed by ${name}`);
                  // const name = details.payer.name.given_name;
                  console.log("details : ", details);
                  postData("order", order[0], auth.accessToken).then((response) => {
                    if (response.data.error) console.log("error : ", response.data.error);
                    logResponse(response);
                  });
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
