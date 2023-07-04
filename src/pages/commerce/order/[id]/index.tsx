import { Main as PublicMain } from "@/styles/public/main.styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function Page() {
  // get the store
  const { orders }: any = useSelector((store) => store);
  // get the query
  const router = useRouter();
  const { id } = router.query;
  // find the order
  const order = orders.find((order: any) => order._id === id);
  //   console.log("order : ", order);
  return (
    <Main>
      <section>
        <div>
          <button onClick={() => router.back()}>Go Back</button>
          {order && (
            <div className="order">
              <div className="shipping">
                <h1>Shipping</h1>
                <h4>Order Number : {order._id}</h4>
                <p>Name : {order.User.username}</p>
                <p>Address : {order.address}</p>
                <p>Mobile : {order.mobile}</p>
              </div>
              <div className="products">
                {order.cart.map((product: any) => (
                  <div key={product._id}>
                    <h5>Product Number : {product._id}</h5>
                    <Link href={`/commerce/product/${product._id}`}>
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].url}
                        width={300}
                        height={300}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > button {
        width: 5rem;
      }
      .order {
        /* display: flex; */
        > * {
          border: 2px solid;
        }
        .shipping {
          /* flex: 1; */
        }
        .products {
          /* flex: 1; */
          img {
            width: 10rem;
          }
        }
      }
    }
  }
`;
