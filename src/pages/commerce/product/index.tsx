import ProductItem from "@/components/product/ProductItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import logError from "lib/client/log/logError";
import { openModal } from "lib/client/store/modalSlice";
import { getData } from "lib/client/utils/fetchData";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export async function getServerSideProps({ query }: any) {
  // critical point
  // const page = query.page || 1;
  // const payload = { page, limit: page * 3 }; // 한 페이지 당 3개의 프러덕트를 가져온다.
  //
  console.log("query : ", query);
  const response = await getData("product", undefined, query);
  const data = response.data;
  const products = data.products;
  return { props: { data: products } };
}
export default function Page({ data }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { modal, notify }: any = useSelector((store) => store);
  const [products, setProducts]: any = useState([]);
  const [checkedProducts, setCheckedProducts]: any = useState(data);
  const [isCheckAll, setIsCheckAll]: any = useState(false);
  const [page, setPage]: any = useState(1);
  useEffect(() => {
    console.log(Object.keys(router.query));
    if (Object.keys(router.query).length === 0) {
      setPage(1);
      setProducts([]);
    }
  }, [router.query]);
  useEffect(() => {
    console.log("data : ", data);
    setProducts((state: any) => [...state, ...data]);
  }, [data]);
  useEffect(() => {}, [router.query]);
  useEffect(() => {
    if (notify.status === "success") router.reload();
  }, [notify.status]);
  const handleCheckAll = () => {
    if (!isCheckAll) {
      const productIds = products.map((product: any) => product._id);
      setCheckedProducts(productIds);
      setIsCheckAll(true);
    }
    if (isCheckAll) {
      setCheckedProducts([]);
      setIsCheckAll(false);
    }
    // setIsCheckAll((state: boolean) => !state);
  };
  const handleOpenModal = () => {
    const ids = checkedProducts;
    dispatch(
      openModal({
        type: "DELETE_PRODUCTS",
        message: "Do you want to delete the selected products?",
        ids,
      })
    );
  };
  return (
    <Main>
      <section>
        {
          <div>
            <button onClick={handleCheckAll}>{isCheckAll ? "Unselect All" : "Select All"}</button>
            <button onClick={handleOpenModal}>Delete</button>
            <h1>Product Page</h1>
            <ul>
              {products?.map((product: any) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  setProducts={setProducts}
                  setCheckedProducts={setCheckedProducts}
                  isCheckAll={isCheckAll}
                />
              ))}
            </ul>
            <div className="load-more">
              <button
                onClick={() => {
                  setPage(page + 1);
                  // setFilter({ ...filter, productPage: filter.productPage + 1 });
                  // console.log("filter : ", filter);
                  // setFilter((state: any) => ({
                  //   ...state,
                  //   productPage: state.productPage + 1,
                  // }));
                  // filterSearch();
                  // test();
                  router.query.page = page + 1;
                  router.push({
                    pathname: router.pathname,
                    query: router.query,
                  });
                }}
              >
                Load More
              </button>
            </div>
          </div>
        }

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
      /* height: 90vh; */
      > ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-auto-rows: minmax(20rem, auto);
        /* grid-template-rows: repeat(2, minmax(20rem, 1fr)); */
        gap: 1rem;
      }
      .load-more {
        /* border: 2px solid; */
        text-align: center;
        padding: 3rem;
        button {
          padding: 1.5rem;
        }
      }
    }
  }
`;
