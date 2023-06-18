import CartItem from "@/components/commerce/CartItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  // const cart = useSelector(selectCart);
  const store = useSelector((state) => state);
  const { auth, cart }: any = store;

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
    }
  }
`;
