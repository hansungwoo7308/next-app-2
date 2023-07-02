import ProductItem from "@/components/product/ProductItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { getData } from "lib/client/utils/fetchData";
import Image from "next/image";
import styled from "styled-components";
export async function getServerSideProps(context: any) {
  const response = await getData("product");
  const data = response.data;
  const products = data.products;
  return { props: { products } };
}
export default function Page({ products }: any) {
  // console.log("products : ", products);
  return (
    <Main>
      <section>
        {products && (
          <div>
            <h1>Product Page</h1>
            <ul>
              {products.map((product: any) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </ul>
          </div>
        )}
        {!products && (
          <div>
            <h1>Product Page</h1>
            <p>No products</p>
          </div>
        )}
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      height: 90vh;
      > ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(20rem, 1fr));
        gap: 1rem;
      }
    }
  }
`;
