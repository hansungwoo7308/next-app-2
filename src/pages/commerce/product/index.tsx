import ProductItem from "@/components/product/ProductItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import logError from "lib/client/log/logError";
import { openModal } from "lib/client/store/modalSlice";
import { getData } from "lib/client/utils/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export async function getServerSideProps(context: any) {
  const response = await getData("product");
  const data = response.data;
  const products = data.products;
  return { props: { data: products } };
}
export default function Page({ data }: any) {
  const dispatch = useDispatch();
  const { modal }: any = useSelector((store) => store);
  const [products, setProducts]: any = useState(data);
  const [checkedProducts, setCheckedProducts]: any = useState([]);
  const [isCheckAll, setIsCheckAll]: any = useState(false);
  const fetchData = async () => {
    try {
      const response = await getData("product");
      const { products } = response.data;
      setProducts(products);
    } catch (error) {
      logError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [modal.visible]);
  useEffect(() => {
    console.log(checkedProducts);
  }, [checkedProducts]);
  const setCheckedProductsAll = () => {
    // products.map((product: any) => setCheckedProducts((state: any) => [...state, product._id]));
  };
  // useEffect(() => {
  //   if (isCheckAll) {
  //     const checkedProductIds = products.map((product: any) => product._id);
  //     setCheckedProducts(checkedProductIds);
  //   } else {
  //     setCheckedProducts([]);
  //   }
  // }, [isCheckAll]);
  return (
    <Main>
      <section>
        {products && (
          <div>
            <button
              onClick={() => {
                const productIds = products.map((product: any) => product._id);
                setCheckedProducts(productIds);
                setIsCheckAll(true);
              }}
            >
              Select All
            </button>
            <button
              onClick={() => {
                const ids = checkedProducts;
                dispatch(
                  openModal({
                    name: "deleteProducts",
                    message: "Do you want to delete the selected products?",
                    ids,
                  })
                );
              }}
            >
              Delete
            </button>
            <h1>Product Page</h1>
            <ul>
              {products.map((product: any) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  setCheckedProducts={setCheckedProducts}
                  isCheckAll={isCheckAll}
                />
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
        grid-auto-rows: minmax(20rem, auto);
        /* grid-template-rows: repeat(2, minmax(20rem, 1fr)); */
        gap: 1rem;
      }
    }
  }
`;
